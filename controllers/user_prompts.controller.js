const models = require("../models");
const { user_prompts, prompts } = models;
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");
const isEmpty = require("lodash/isEmpty");

const addUserPrompt = (req, res, next) => {
    const { body: {
        user_id,
        prompt_id,
        prompt_answer,
        sequence_number
    } } = req;
    user_prompts.create({
        user_id,
        prompt_id,
        prompt_answer,
        sequence_number
    }).then((data) => {
        res.json(successData("success", data))
    }).catch(next)
}

const getUserAllPromptsById = (req, res, next) => {
    const { params: { user_id } } = req;
    const include = [
        { model: prompts, attributes: ["id", "question"] },
    ];
    attributes = ["id", "prompt_answer", "sequence_number"],
        user_prompts.findAll({
            where: { user_id },
            attributes,
            include
        }).then((data) => {
            if (isEmpty(data)) {
                throw createHttpError(`user_prompt ${user_id} not found`);
            }
            res.json(successData("success", data));
        }).catch(next);
};

module.exports = {
    addUserPrompt,
    getUserAllPromptsById,
};