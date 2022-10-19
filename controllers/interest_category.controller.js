const models = require("../models");
const { interest_category,interest_value } = models;
const isEmpty = require("lodash/isEmpty");
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");
const include = [
	{ model: interest_value,attributes: ["value"]},
];

const addCategory = (req, res, next) => {
    const { body: { category } } = req;
    interest_category.create({
        category
    }).then((data) => {
        res.json(successData("success", data))
    }).catch(next)
}

const getAllCategories = (req, res, next) => {
    interest_category.findAll({include})
        .then((data) => {
            res.json(successData("success", data));
        })
        .catch(next);
};

const getCategoryById = (req, res, next) => {
    const { params: { id } } = req;
    interest_category.findOne({ where: { id } })
        .then((data) => {
            if (isEmpty(data)) {
                throw createHttpError(`interest_category ${id} not found`);
            }
            res.json(successData("success", data));
        })
        .catch(next);
};

const updateCategory = (req, res, next) => {
    const { body: { category }, params: { id } } = req;
    interest_category.update(
        { category },
        { where: { id } }
    ).then((data) => {
        if (data[0] == 0) {
            throw createHttpError(`interest_category ${id} not found`);
        }
        res.json(successData("updated succesfully", data));
    }).catch(next);
};

const deleteCategory = (req, res, next) => {
    const { params:{id} } = req;
    interest_category.destroy({
        where: { id },
    }).then((data) => {
        if (!data) {
            throw createHttpError(`interest_category ${id} not found`);
        }
        res.json(successData("deleted successfully", data));
    }).catch(next);
};


module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
