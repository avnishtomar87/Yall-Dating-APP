"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      event_type_id: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      slug_url: {
        type: Sequelize.STRING(500),
      },
      event_on: {
        type: Sequelize.DATE,
      },
      location: {
        type: Sequelize.STRING,
      },
      geog: {
        type: Sequelize.GEOGRAPHY,
      },
      cost: {
        type: Sequelize.FLOAT,
      },
      currency: {
        type: Sequelize.STRING,
      },
      short_desc: {
        type: Sequelize.STRING(500),
      },
      long_desc: {
        type: Sequelize.STRING(500),
      },
      front_banner_url: {
        type: Sequelize.STRING(500),
      },
      cover_banner_url: {
        type: Sequelize.STRING(500),
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("events");
  },
};
