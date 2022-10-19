const models = require("../models");
const { events, event_type } = models;
const Sequelize = require('sequelize');
const catchAsync = require("../utils/catchAsync");
const isEmpty = require("lodash/isEmpty");
const createHttpError = require("http-errors");
const { getAddress } = require("../helpers/service");
const { successData } = require("../helpers/response");
const { uploadToS3 } = require("../helpers/s3Upload")
const { S3_EVENTS_FOLDER } = require("../helpers/constant")
const multer = require("multer");

const storage = multer.memoryStorage()
const upload = multer({ storage });

const uploadBanners = upload.fields([
    { name: "front_banner_url" },
    { name: "cover_banner_url" }
]);

const addEvent = catchAsync(async (req, res, next) => {
    const { body: {
        event_type_id,
        title,
        slug_url,
        event_on,
        cost,
        currency,
        short_desc,
        long_desc,
        lat,
        long },
        files: {
            front_banner_url,
            cover_banner_url }
    } = req;
    const geog = Sequelize.fn("ST_MakePoint", lat, long)
    const location = await getAddress(lat, long)
    let payload = {
        event_type_id,
        title,
        slug_url,
        event_on,
        cost,
        currency,
        short_desc,
        long_desc,
        geog,
        location
    };
    if (front_banner_url) {
        const frontBannerRes = await uploadToS3(front_banner_url[0], S3_EVENTS_FOLDER);
        const frontBannerUrl = frontBannerRes.key.split("/")[1];
        payload = {
            ...payload,
            front_banner_url: frontBannerUrl,
        }
    }
    if (cover_banner_url) {
        const coverBannerRes = await uploadToS3(cover_banner_url[0], S3_EVENTS_FOLDER);
        const coverBannerUrl = coverBannerRes.key.split("/")[1];
        payload = {
            ...payload,
            cover_banner_url: coverBannerUrl,
        }
    }
    const data = await events.create({ ...payload })
    res.json(successData("success", data))
})

const getAllEvents = (req, res, next) => {
    const include = [
        { model: event_type, attributes: ["id", "name", "banner_url"] }
    ]
    events.findAll({ include }).then((data) => {
        res.json(successData("success", data));
    }).catch(next);
};

const getEventById = (req, res, next) => {
    const { query: { slug_url } } = req;
    events.findOne({
        where: { slug_url },
    }).then((data) => {
        if (isEmpty(data)) {
            throw createHttpError(`event ${id} not found`);
        }
        res.json(successData("success", data));
    }).catch(next);
};

const updateEvent = catchAsync(async (req, res, next) => {
    const { params: { id },
        body: {
            event_type_id,
            title,
            slug_url,
            event_on,
            cost,
            currency,
            short_desc,
            long_desc,
            lat,
            long },
        files: {
            front_banner_url,
            cover_banner_url }
    } = req;
    const geog = Sequelize.fn("ST_MakePoint", lat, long)
    const location = await getAddress(lat, long)
    let payload = {
        event_type_id,
        title,
        slug_url,
        event_on,
        cost,
        currency,
        short_desc,
        long_desc,
        geog,
        location
    };
    if (front_banner_url) {
        const frontBannerRes = await uploadToS3(front_banner_url[0], S3_EVENTS_FOLDER);
        const frontBannerUrl = frontBannerRes.key.split("/")[1];
        payload = {
            ...payload,
            front_banner_url: frontBannerUrl,
        }
    }
    if (cover_banner_url) {
        const frontBannerRes = await uploadToS3(cover_banner_url[0], S3_EVENTS_FOLDER);
        const frontBannerUrl = frontBannerRes.key.split("/")[1];
        payload = {
            ...payload,
            cover_banner_url: frontBannerUrl,
        }
    }
    const data = await events.update(
        { ...payload },
        { where: { id } }
    )
    if (data[0] == 0) {
        throw createHttpError(`event ${id} not found`);
    }
    res.json(successData("updated succesfully", data));
});

const deleteEvent = (req, res, next) => {
    const { params: { id } } = req;
    events.destroy({
        where: { id },
    }).then((data) => {
        if (!data) {
            throw createHttpError(`event ${id} not found`);
        }
        res.json(successData("deleted successfully", data));
    }).catch(next);
};


module.exports = {
    addEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    uploadBanners
};
