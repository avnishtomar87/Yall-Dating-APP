"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      mobile_number: {
        type: Sequelize.BIGINT,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      user_type: {
        type: Sequelize.ENUM("user", "admin"),
        defaultValue: "user",
      },
      login_type:{
        type: Sequelize.STRING,
      },
      is_otp_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      is_mail_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      full_name: {
        type: Sequelize.STRING,
      },
      dob: {
        type: Sequelize.DATEONLY,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.STRING,
      },
      job_title: {
        type: Sequelize.STRING,
      },
      about_me: {
        type: Sequelize.STRING(500),
      },
      privacy_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      is_insta_linked: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      insta_userid: {
        type: Sequelize.STRING,
      },
      is_gmail_login: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
