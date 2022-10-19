const models = require("../models");
const { event_type } = models;
const catchAsync = require("../utils/catchAsync");
const isEmpty = require("lodash/isEmpty");
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");
const { uploadToS3 } = require("../helpers/s3Upload")
const { S3_EVENTS_FOLDER,MULTER_UPLOAD_COUNT } = require("../helpers/constant")
const multer = require("multer");

const storage = multer.memoryStorage()
const upload = multer({ storage });
const uploadBanner = upload.array("banner_url",MULTER_UPLOAD_COUNT);

const addEventType = catchAsync(async (req, res, next) => {
  const { body: { name }, files } = req;
  const { key } = await uploadToS3(files[0], S3_EVENTS_FOLDER);
  const banner_url = key.split('/')[1];

  const data = await event_type.create({
    name,
    banner_url
  })
  res.json(successData("success", data));
});

const getAllEventType = (req, res, next) => {
  event_type.findAll()
    .then((data) => {
      res.json(successData("success", data));
    })
    .catch(next);
};

const getEventTypeById = (req, res, next) => {
  const { params: { id } } = req;
  event_type.findOne({
    where: { id },
  }).then((data) => {
    if (isEmpty(data)) {
      throw createHttpError(`event_type ${id} not found`);
    }
    res.json(successData("success", data));
  }).catch(next);
};

const updateEventType = catchAsync(async (req, res, next) => {
  const { body: { name }, files, params: { id } } = req;
  const { key } = await uploadToS3(files[0], S3_EVENTS_FOLDER);
  const banner_url = key.split('/')[1];

  event_type.update(
    {
      name,
      banner_url
    },
    { where: { id } }
  ).then((data) => {
    if (data[0] === 0) {
      throw createHttpError(`event_type ${id} not found`);
    }
    res.json(successData("updated successfully", data));
  }).catch(next);
});

const deleteEventType = (req, res, next) => {
  const { params: { id } } = req;
  event_type.destroy({
    where: { id },
  }).then((data) => {
    if (!data) {
      throw createHttpError(`event_type ${id} not found`);
    }
    res.json(successData("deleted successfully", data));
  }).catch(next);
};

module.exports = {
  addEventType,
  getAllEventType,
  getEventTypeById,
  updateEventType,
  deleteEventType,
  uploadBanner,
};
