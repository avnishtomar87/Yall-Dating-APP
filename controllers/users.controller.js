const models = require("../models");
const { users } = models;
const bcrypt = require("bcrypt");
const { createJwtToken, getErrorMessage } = require("../utils/token");
const axios = require("axios");
const isEmpty = require("lodash/isEmpty");
const validate = require("validate.js");
const { OAuth2Client } = require("google-auth-library");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");
const { LOGIN_TYPE, CLIENT_ID, FB_URL, APPROVED } = require("../helpers/constant")
const { sendingOtp, verifyOtp } = require("../helpers/sendOtp")

//for admin login 
const adminLogin = async (req, res,) => {
  const { body } = req;
  const { email, password } = body;
  const errors = validate(body, {
    email: { email: true, presence: true },
    password: { presence: true },
  });

  const message = getErrorMessage(errors);
  if (!isEmpty(message)) {
    res.status(400).send({ message });
    return;
  }
  const payload = { email, password };
  const user = await users.findOne({
    where: {
      email: payload.email.toLowerCase(),
      user_type: "admin"
    },
  });
  if (isEmpty(user))
    return res.json(successData("User does not exist. Please Enter valid email !!"));
  if (!isEmpty(user)) {
    const password_valid = await bcrypt.compare(
      payload.password,
      user.password
    );
    if (password_valid) {
      const data = await users.findOne({
        where: {
          email: payload.email.toLowerCase(),
          user_type: "admin"
        },
        attributes: { exclude: ["password"] }
      })
      const token = createJwtToken(user.id);
      res.json({ message: "Login successfully", token, data });
    } else {
      res.json(successData("Password Incorrect"));
    }
  } else {
    res.json(successData("User does not exist"));
  }
}

// update users data
const updateUser = (req, res, next) => {
  const { body: {
    full_name,
    job_title,
    about_me,
    email,
    dob,
    age,
    gender,
    is_insta_linked,
    privacy_accepted,
    insta_userid,
    is_gmail_login,
    is_deactive,
    is_otp_verified, },
    params: { id }
  } = req;
  users.update(
    {
      full_name,
      job_title,
      about_me,
      email,
      dob,
      age,
      gender,
      is_insta_linked,
      privacy_accepted,
      insta_userid,
      is_gmail_login,
      is_deactive,
      is_otp_verified,
    },
    { where: { id } }
  ).then((data) => {
    if (data[0] == 0) {
      throw createHttpError(`users ${id} not found`);
    }
    res.json(successData("updated successfully", data));
  }).catch(next);
};

// get all users data
const getAllUsers = (req, res, next) => {
  users.findAll({ attributes: { exclude: ["password"] } })
    .then((data) => {
      if (isEmpty(data)) {
        throw createHttpError(`No users data found in the database`);
      }
      res.json(successData("success", data));
    })
    .catch(next);
};

//get specific user data by id
const getUserById = (req, res, next) => {
  const { params: { id } } = req;
  users.findOne({ where: { id }, attributes: { exclude: ["password"] } })
    .then((data) => {
      if (isEmpty(data)) {
        throw createHttpError(`user ${id} not found`);
      }
      res.json(successData("success", data));
    })
    .catch(next);
};

// delete a user
const deleteUserById = (req, res, next) => {
  const { params: { id } } = req;
  users.destroy({ where: { id } })
    .then((data) => {
      if (!data) {
        throw createHttpError(`users ${id} not found`);
      }
      res.json(successData("deleted successfully", data));
    })
    .catch(next);
};

// change users password
const changePassword = catchAsync(async (req, res) => {
  const { body: { current_password, new_password }, params: { id } } = req;
  const salt = await bcrypt.genSalt(10);
  const user = await users.findByPk(id);
  if (!user) {
    return res.json(successData("user not exist"));
  }
  const isValid = await bcrypt.compare(current_password, user.password);
  if (!isValid) {
    return res.json(successData("current pasword wrong"));
  }
  const hashPassword = await bcrypt.hash(new_password, salt);
  const data = await user.update({
    password: hashPassword,
  });
  res.json(successData("password updated successfully"));
});

// Google login
const googleLogin = catchAsync(async (req, res, next) => {
  const { body: { idToken } } = req;
  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });
  const { email, ...rest } = ticket.getPayload();
  const user = await users.findOne({ where: { email }, raw: true });
  if (!isEmpty(user)) {
    const token = createJwtToken(user.id);
    res.json({ ...user, token: token });
  } else {
    const payload = { email, full_name: rest.given_name };
    await users.create(payload);
    const data = await users.findOne({ where: { email }, attributes: { exclude: ["password"] } });
    const token = createJwtToken(data.id);
    res.json({ data, token: token });
  }
});

// Facebook login
const fbLogin = catchAsync(async (req, res) => {
  const { body: { accessToken } } = req;
  const { data } = await axios(`${FB_URL}=${accessToken}`);
  const { email, name } = data;

  if (!email)
    return res.json(successData("Email is not associated to facebook. Please try to login another way"));
  const user = await users.findOne({ where: { email }, raw: true });

  if (!isEmpty(user)) {
    const token = createJwtToken(user.id);
    res.json({ ...user, token: token });
  } else {
    const payload = { email, full_name: name };
    await users.create(payload);
    const newUser = await users.findOne({ where: { email }, attributes: { exclude: ["password"] } });
    const token = createJwtToken(newUser.id);
    res.json({ newUser, token: token });
  }
});

//Apple login
const appleLogin = catchAsync(async (req, res) => {
  const { body: { email, fullName, identityToken, ...rest } } = req;

  const user = await users.findOne({
    where: { apple_token: identityToken },
    raw: true,
  });
  if (!isEmpty(user)) {
    const token = createJwtToken(user.id);
    res.json({ ...user, token: token });
  } else {
    rest.fullName = fullName;
    const payload = {
      email,
      full_name: rest.fullName,
      apple_token: identityToken,
    };
    await users.create(payload);
    const data = await users.findOne({
      where: { apple_token: identityToken },
      raw: true,
    });
    const token = createJwtToken(data.id);
    res.json({ ...data, token: token });
  }
});

const deviceToken = catchAsync(async (req, res) => {
  const { body: { user_id, device_token, device_type } } = req;
  const entry = await device_token.findOne({
    where: {
      [Sequelize.Op.or]: [
        {
          device_token: {
            [Sequelize.Op.eq]: device_token,
          },
        },
        {
          user_id: {
            [Sequelize.Op.eq]: user_id,
          },
        },
      ],
    },
  });
  if (isEmpty(entry)) {
    await device_token.create({
      device_token,
      user_id,
      device_type,
    });
  } else {
    if (entry.device_token !== device_token && entry.user_id === user_id) {
      if (entry.device_type !== device_type) {
        await device_token.create({
          user_id,
          device_token,
          device_type,
        });
      } else {
        await entry.destroy();
        await device_token.create({
          user_id,
          device_token,
          device_type,
        });
      }
    }
    if (entry.user_id !== user_id && entry.device_token === device_token) {
      await entry.update({
        user_id,
        device_token,
        device_type,
      });
    }
  }
  res.json(successData("Data added successfully"));
});

const sendOtp = catchAsync(async (req, res, next) => {
  const { body } = req;
  const { mobile_number } = body;
  const errors = validate(body, {
    mobile_number: { presence: true },
  });
  const message = getErrorMessage(errors);
  if (!isEmpty(message)) {
    res.send({ message });
    return;
  }
  const data = await sendingOtp(mobile_number)
  if (isEmpty(data)) {
    return next(new AppError("something went wrong"));
  }
  res.json(successData("Verification code is sent!", data));
}
);

const otpVerify = catchAsync(async (req, res,) => {
  const { body } = req;
  const { mobile_number, code } = body;
  const errors = validate(body, {
    mobile_number: { presence: true },
    code: { presence: true },
  });
  const message = getErrorMessage(errors);
  if (!isEmpty(message)) {
    res.send({ message });
    return;
  }
  const result = await verifyOtp(mobile_number, code)
  if (result.status === APPROVED) {
    const data = await users.findOne({
      where: { mobile_number },
      attributes: { exclude: ["password"] }
    });
    if (data) {
      const token = createJwtToken(data.id);
      res.json({ message: "Verified user logged in successfully", token, data });
    }
    else {
      const user = await users.create({
        mobile_number,
        is_otp_verified: true,
        login_type: LOGIN_TYPE
      })
      const token = createJwtToken(user.id);
      res.json({ message: "Signup successfully", token, user });
    }
  } else {
    res.json(successData("Wrong mobile number or code!", result));
  }
})

module.exports = {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  changePassword,
  googleLogin,
  fbLogin,
  appleLogin,
  deviceToken,
  sendOtp,
  otpVerify,
  adminLogin,
};
