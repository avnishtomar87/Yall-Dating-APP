"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("event_booking", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      event_id: {
        type: Sequelize.INTEGER,
      },
      payment_card_id: {
        type: Sequelize.INTEGER,
      },
      seat_number: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      payment_method: {
        type: Sequelize.ENUM("debit","credit","netbanking","upi","wallet"),
      },
      payment_id: {
        type: Sequelize.STRING,
      },
      payment_status: {
        type: Sequelize.ENUM("pending","success","failed"),
      },
      booking_status: {
        type: Sequelize.ENUM("initiated","confirmed","failed","cancelled"),
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
    await queryInterface.dropTable("event_booking");
  },
};
