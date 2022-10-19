const models = require("../models");
const { user_interests, interest_value, users } = models;
const isEmpty = require("lodash/isEmpty");
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");

const include = [
    { model: interest_value, attributes: ["value"] },
    { model: users, attributes: [] },
];

const addInterest = (req, res, next) => {
    const { body: { user_id, interest_value_id } } = req;
    user_interests.create({
        user_id, interest_value_id
    }).then((data) => {
        res.json(successData("success", data))
    }).catch(next)
}

const getAllInterests = (req, res, next) => {
    user_interests.findAll().then((data) => {
        res.json(successData("success", data));
    }).catch(next);
};

const getInterestById = (req, res, next) => {
    const { params: { id } } = req;
    user_interests.findAll({
        attributes: [],
        include,
        where: { user_id: id },
    }).then((data) => {
        if (isEmpty(data)) {
            throw createHttpError(`user_interests ${id} not found`);
        }
        res.json(successData("success", data));
    }).catch(next);
};

const updateInterest = (req, res, next) => {
    const { body: { user_id, interest_value_id }, params: { id } } = req;
    user_interests.update(
        {
            user_id, interest_value_id
        },
        { where: { id } }
    ).then((data) => {
        if (data[0] == 0) {
            throw createHttpError(`user_interests ${id} not found`);
        }
        res.json(successData("updated succesfully", data));
    }).catch(next);
};

const deleteInterest = (req, res, next) => {
    const { params: { id } } = req;
    user_interests.destroy({
        where: { id },
    }).then((data) => {
        if (!data) {
            throw createHttpError(`user_interests ${id} not found`);
        }
        res.json(successData("deleted successfully", data));
    }).catch(next);
};


module.exports = {
    addInterest,
    getAllInterests,
    getInterestById,
    updateInterest,
    deleteInterest
};
