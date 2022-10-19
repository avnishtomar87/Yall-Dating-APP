const {ACCOUNT_SID, AUTH_TOKEN,SERVICE_ID, APPROVED} = require("../helpers/constant")
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);
const { successData } = require("../helpers/response");
const AppError = require("../utils/appError");
const isEmpty = require("lodash/isEmpty");

const sendingOtp = async(mobile_number)=>{
    const result = await client.verify.services(SERVICE_ID)
    .verifications.create({
      to: `+${mobile_number}`,
      channel: "sms",
    });
  if (isEmpty(result)) {
    return next(new AppError("something went wrong"));
  }
  return result
}

const verifyOtp = async(mobile_number,code)=>{
    const result = await client.verify.services(SERVICE_ID)
    .verificationChecks.create({
      to: `+${mobile_number}`,
      code: code,
    });
    return result
}
module.exports = {sendingOtp,verifyOtp};