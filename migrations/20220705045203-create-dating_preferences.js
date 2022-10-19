"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("dating_preferences", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      current_city: {
        type: Sequelize.STRING,
      },
      current_geog: {
        type: Sequelize.GEOGRAPHY,
      },
      interested_in: {
        type: Sequelize.STRING,
      },
      show_initial_name: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      show_email: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      show_job_title: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      show_age: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      show_contact: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      show_on_yall: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false",
      },
      age_range_min: {
        type: Sequelize.INTEGER,
      },
      age_range_max: {
        type: Sequelize.INTEGER,
      },
      distance_range: {
        type: Sequelize.INTEGER,
      },
      distance_type: {
        type: Sequelize.ENUM("km", "mi")
      },
      profile_percentage: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("dating_preferences");
  },
};
