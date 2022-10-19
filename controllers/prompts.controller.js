const models = require("../models");
const { prompts } = models;
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");
const isEmpty = require("lodash/isEmpty");

const addPrompt = (req, res, next) => {
    const { body: { question } } = req;
    prompts.create({
        question,
    }).then((data) => {
        res.json(successData("success", data))
    }).catch(next)
}

const getAllPrompts = (req, res, next) => {
    prompts.findAll().then((data) => {
        res.json(successData("success", data));
    }).catch(next);
}

const getPromptById = (req, res, next) => {
    const { params: { id } } = req;
    prompts.findOne({ where: { id } })
        .then((data) => {
            if (isEmpty(data)) {
                throw createHttpError(`prompt ${id} not found`);
            }
            res.json(successData("success", data));
        }).catch(next);
};

const updatePrompt = (req, res, next) => {
    const {
        body: { question },
        params: { id }
    } = req;
    prompts.update({ question },
        { where: { id } }
    ).then((data) => {
        if (data[0] == 0) {
            throw createHttpError(`prompt ${id} not found`);
        }
        res.json(successData("updated succesfully", data));
    }).catch(next);
};

const deletePrompt = (req, res, next) => {
    const { params: { id } } = req;
    prompts.destroy({
        where: { id },
    }).then((data) => {
        if (!data) {
            throw createHttpError(`prompt ${id} not found`);
        }
        res.json(successData("deleted successfully", data));
    }).catch(next);
};

module.exports = {
    addPrompt,
    getAllPrompts,
    getPromptById,
    updatePrompt,
    deletePrompt
};