const models = require("../models");
const { event_booking } = models;
const catchAsync = require("../utils/catchAsync");
const isEmpty = require("lodash/isEmpty");
const createHttpError = require("http-errors");
const { successData } = require("../helpers/response");

const addEventBooking = async (req, res, next) => {
  const { body: {
    user_id,
    event_id,
    payment_card_id,
    seat_number,
    amount,
    payment_method,
    payment_id,
    payment_status,
    booking_status }
  } = req;
  event_booking.create({
    user_id,
    event_id,
    payment_card_id,
    seat_number,
    amount,
    payment_method,
    payment_id,
    payment_status,
    booking_status
  }).then((data) => {
    res.json(successData("success", data))
  }).catch(next)
};

const getAllEventBooking = (req, res, next) => {
  event_booking.findAll().then((data) => {
      res.json(successData("success", data));
    }).catch(next);
};

const getEventBookingById = (req, res, next) => {
  const { params: { id } } = req;
  event_booking.findOne({
    where: { id },
  }).then((data) => {
    if (isEmpty(data)) {
      throw createHttpError(`event_booking ${id} not found`);
    }
    res.json(successData("success", data));
  }).catch(next);
};

const updateEventBooking = async (req, res, next) => {
  const { body: {
    payment_method,
  }, params: { id }
  } = req;
  event_booking.update(
    { payment_method },
    { where: { user_id: id } }
  ).then((data) => {
    if (data[0] == 0) {
      throw createHttpError(`event_booking ${id} not found`);
    }
    res.json(successData("updated succesfully", data));
  }).catch(next);
};

const deleteEventBooking = (req, res, next) => {
  const { params: { id } } = req;
  event_booking.destroy({
    where: { id },
  }).then((data) => {
    if (!data) {
      throw createHttpError(`event_booking ${id} not found`);
    }
    res.json(successData("deleted successfully", data));
  }).catch(next);
};

module.exports = {
  addEventBooking,
  getAllEventBooking,
  getEventBookingById,
  updateEventBooking,
  deleteEventBooking,
};
