const jsonwebtoken = require("jsonwebtoken");
const {SECRET_KEY} = require("../helpers/constant")
const models = require("../models");
const { users } = models;
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).send({ message: "Unauthorized access." });
  jsonwebtoken.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ message: "Access forbidden." });
    req.user = user;
    next();
  });
}

const ProtectedRoutes = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.")
    );
  }
  const decoded = await promisify(jsonwebtoken.verify)(
    token,
    SECRET_KEY
  );
  const currentUser = await users.findOne({ where: { id: decoded.user.id } });
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist."
      )
    );
  }
  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action")
      );
    }
    next();
  };
};

module.exports = { ProtectedRoutes, restrictTo, verifyToken };
