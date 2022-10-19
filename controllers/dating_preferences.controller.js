const models = require("../models");
const { dating_preferences, users, user_documents } = models;
const Sequelize = require('sequelize');
const { Op } = require("sequelize")
const isEmpty = require("lodash/isEmpty");
const createHttpError = require("http-errors");
const { getAddress } = require("../helpers/service");
const { successData } = require("../helpers/response");
const catchAsync = require("../utils/catchAsync");

const addPreferences = catchAsync(async (req, res, next) => {
    const { body: {
        user_id,
        show_initial_name,
        show_email,
        show_job_title,
        show_age,
        show_contact,
        show_on_yall,
        age_range_min,
        age_range_max,
        distance_range,
        distance_type,
        profile_percentage,
        interested_in,
        lat,
        long }
    } = req;
    const current_geog = Sequelize.fn("ST_MakePoint", lat, long)
    const current_city = await getAddress(lat, long)
    dating_preferences.create({
        user_id,
        current_city,
        show_initial_name,
        show_email,
        show_job_title,
        show_age,
        show_contact,
        show_on_yall,
        age_range_min,
        age_range_max,
        distance_range,
        distance_type,
        profile_percentage,
        interested_in,
        current_geog
    }).then((data) => {
        res.json(successData("success", data));
    }).catch(next);
})

const getAllPreferences = (req, res, next) => {
    dating_preferences.findAll()
        .then((data) => {
            res.json(successData("success", data));
        }).catch(next);
};

const getPreferencesById = (req, res, next) => {
    const { params: { id } } = req;
    dating_preferences.findOne({
        where: { id },
    }).then((data) => {
        if (isEmpty(data)) {
            throw createHttpError(`user_preferences${id} not found`);
        }
        res.json(successData("success", data));
    }).catch(next);
};

const updatePreferences = async (req, res, next) => {
    const { body: {
        user_id,
        show_initial_name,
        show_email,
        show_job_title,
        show_age,
        show_contact,
        show_on_yall,
        age_range_min,
        age_range_max,
        distance_range,
        distance_type,
        profile_percentage,
        interested_in,
        lat,
        long },
        params: { id }
    } = req;

    const current_geog = Sequelize.fn("ST_MakePoint", lat, long)
    const current_city = await getAddress(lat, long)
    dating_preferences.update(
        {
            user_id,
            current_city,
            show_initial_name,
            show_email,
            show_job_title,
            show_age,
            show_contact,
            show_on_yall,
            age_range_min,
            age_range_max,
            distance_range,
            distance_type,
            profile_percentage,
            interested_in,
            current_geog
        },
        { where: { id } }
    ).then((data) => {
        if (data[0] === 0) {
            throw createHttpError(`user_Preferences ${id} not found`);
        }
        res.json(successData("updated succesfully", data));
    }).catch(next);
};

const deletePreferences = (req, res, next) => {
    const { params: { id } } = req;
    dating_preferences.destroy({
        where: { id },
    }).then((data) => {
        if (!data) {
            throw createHttpError(`user_preferences ${id} not found`);
        }
        res.json(successData("deleted successfully", data));
    }).catch(next);
};

const getSetPreferences = catchAsync(async (req, res, next) => {
    const {
        query: {
            lat,
            long,
            distance_range,
            distance_type,
            age_range_max,
            age_range_min,
            interested_in }
    } = req;
    let where = {
        where: Sequelize.where(
            Sequelize.fn('ST_DWithin',
                Sequelize.col('current_geog'),
                Sequelize.fn('ST_MakePoint', lat, long),
                distance_range * 1000
            ),
            true)
    };
    if (age_range_max && age_range_min) {
        where.age_range_max = { [Op.lte]: parseInt(age_range_max) };
        where.age_range_min = { [Op.gte]: parseInt(age_range_min) };
    }
    if (interested_in) {
        where.interested_in = interested_in;
    }
    const include = [
        {
            model: user_documents,
            attributes: [
                "id",
                "file_type",
                "sequence_number",
                "media_url"
            ],
            where: { file_type: "gallery" }, required: false
        },
        {
            model: dating_preferences,
            attributes: [
                "id",
                "current_geog",
                "interested_in",
                "distance_type",
                "show_on_yall",
                "current_city"
            ], where
        }
    ]

    const attributes = ["id", "full_name", "age", "job_title", "gender"]
    const data = await users.findAll({
        attributes,
        include
    })
    res.json(successData("success", data));
})

module.exports = {
    addPreferences,
    getAllPreferences,
    getPreferencesById,
    updatePreferences,
    deletePreferences,
    getSetPreferences,
};