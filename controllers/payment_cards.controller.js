const models = require("../models");
const { payment_cards } = models;
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");
const isEmpty = require("lodash/isEmpty");

const addPaymentCard = (req, res, next) => {
    const { body: {
        bank_name,
        user_id,
        card_number,
        card_type,
        card_expiry,
        cvv, }
    } = req;
    const title = `${bank_name} ${card_type}`
    payment_cards.create({
        bank_name,
        title,
        user_id,
        card_number,
        card_type,
        card_expiry,
        cvv,
    }).then((data) => {
        res.json(successData("success", data))
    }).catch(next)
}

const getAllPaymentCards = (req, res, next) => {
    payment_cards.findAll().then((data) => {
        res.json(successData("success", data));
    }).catch(next);
}

const getPaymentCardById = (req, res, next) => {
    const { params: { id } } = req;
    payment_cards.findOne({ where: { id } })
        .then((data) => {
            if (isEmpty(data)) {
                throw createHttpError(`payment_card ${id} not found`);
            }
            res.json(successData("success", data));
        }).catch(next);
};

const updatePaymentCard = (req, res, next) => {
    const {
        body: {
            bank_name,
            card_number,
            card_type,
            card_expiry,
            cvv, },
        params: { id }
    } = req;
    const title = `${bank_name} ${card_type}`
    payment_cards.update(
        {
            bank_name,
            title,
            card_number,
            card_type,
            card_expiry,
            cvv
        },
        { where: { user_id: id } }
    ).then((data) => {
        if (data[0] == 0) {
            throw createHttpError(`payment_card ${id} not found`);
        }
        res.json(successData("updated succesfully", data));
    }).catch(next);
};

const deletePaymentCard = (req, res, next) => {
    const { params: { id } } = req;
    payment_cards.destroy({
        where: { id },
    }).then((data) => {
        if (!data) {
            throw createHttpError(`payment_card ${id} not found`);
        }
        res.json(successData("deleted successfully", data));
    }).catch(next);
};

module.exports = {
    addPaymentCard,
    getAllPaymentCards,
    getPaymentCardById,
    updatePaymentCard,
    deletePaymentCard
};