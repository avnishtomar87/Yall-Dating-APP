const models = require("../models");
const { interest_value ,interest_category,user_interests} = models;
const isEmpty = require("lodash/isEmpty");
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");



const addValue = (req, res, next) => {
    const { body: { interest_category_id,value } } = req;
    interest_value.create({
        interest_category_id,value
    }).then((data) => {
        res.json(successData("success", data))
    }).catch(next)
}

const getAllValues = (req, res, next) => {
    const include = [
        { model: interest_category,attributes: ["category"]},
    ];
    interest_value.findAll({include}).then((data) => {
        res.json(successData("success", data));
    }).catch(next);
};

const getAllValuesById = (req, res, next) => {
    const { params: { id } } = req;
    interest_value.findAll({
        where: { interest_category_id:id },
    }).then((data) => {
        if (isEmpty(data)) {
            throw createHttpError(`interest_value ${id} not found`);
        }
        res.json(successData("success", data));
    }).catch(next);
};

const updateValue = (req, res, next) => {
    const { body: { interest_category_id,value },params: { id } } = req;
    interest_value.update(
        {
            interest_category_id,value
        },
        { where: { id } }
    ).then((data) => {
        if (data[0] == 0) {
            throw createHttpError(`interest_value ${id} not found`);
        }
        res.json(successData("updated succesfully", data));
    }).catch(next);
};

const deleteValue = (req, res, next) => {
    const { params:{id} } = req;
    interest_value.destroy({
        where: { id },
    }).then((data) => {
        if (!data) {
            throw createHttpError(`interest_value ${id} not found`);
        }
        res.json(successData("deleted successfully", data));
    }).catch(next);
};

module.exports = {
    addValue,
    getAllValues,
    getAllValuesById,
    updateValue,
    deleteValue
};
