const models = require("../models");
const { user_documents } = models;
const catchAsync = require("../utils/catchAsync");
const isEmpty = require("lodash/isEmpty");
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");
const { uploadToS3 } = require("../helpers/s3Upload")
const { S3_DOCUMENT_FOLDER, MULTER_UPLOAD_COUNT } = require("../helpers/constant")
const multer = require("multer");

const storage = multer.memoryStorage()
const upload = multer({ storage });
const uploadPhoto = upload.array("images", MULTER_UPLOAD_COUNT);

const addDocuments = catchAsync(async (req, res, next) => {
  const { body: { user_id, file_type, sequence_number }, files } = req;
  let bulkData = [];
  for (const i in files) {
     const { key } = await uploadToS3(files[i], S3_DOCUMENT_FOLDER);
     const { mimetype } = files[i];
     bulkData.push({
      media_url: key.split('/')[1],
      sequence_number,
      file_extension:mimetype.split("/")[1],
      file_type,
      user_id,
    });
  }
const data = await user_documents.bulkCreate(bulkData)
  res.json(successData("success", data));
});

const getAllDocuments = (req, res, next) => {
  user_documents.findAll()
    .then((data) => {
      res.json(successData("success", data));
    })
    .catch(next);
};

const getDocumentsById = (req, res, next) => {
  const { params: { id } } = req;
  user_documents.findOne({
    where: { id },
  }).then((data) => {
    if (isEmpty(data)) {
      throw createHttpError(`user_documents${id} not found`);
    }
    res.json(successData("success", data));
  }).catch(next);
};

const updateDocuments = catchAsync(async (req, res, next) => {
  const { body: { user_id, file_type, sequence_number }, files, params: { id } } = req;
  const { mimetype } = files[0];
  const file_extension = mimetype.split("/")[1];

  const { key } = await uploadToS3(files[0], S3_DOCUMENT_FOLDER);
  const media_url = key.split('/')[1];

  user_documents.update(
    {
      user_id,
      file_type,
      file_extension,
      media_url,
      sequence_number,
    },
    { where: { id } }
  ).then((data) => {
    if (data[0] === 0) {
      throw createHttpError(`user_Documents ${id} not found`);
    }
    res.json(successData("updated successfully", data));
  }).catch(next);
});

const deleteDocuments = (req, res, next) => {
  const { params: { id } } = req;
  user_documents.destroy({
    where: { id },
  }).then((data) => {
    if (!data) {
      throw createHttpError(`user_Document ${id} not found`);
    }
    res.json(successData("deleted successfully", data));
  }).catch(next);
};

module.exports = {
  addDocuments,
  getAllDocuments,
  getDocumentsById,
  updateDocuments,
  deleteDocuments,
  uploadPhoto,
};
