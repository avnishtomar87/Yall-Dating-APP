module.exports = (sequelize, DataTypes) => {
    const Payment_Cards = sequelize.define("payment_cards", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
          },
          title: {
            type: DataTypes.STRING,
          },
          bank_name: {
            type: DataTypes.STRING,
          },
          card_number: {
            type: DataTypes.BIGINT,
          },
          card_type: {
            type: DataTypes.ENUM("credit","debit"),
          },
          card_expiry: {
            type: DataTypes.DATEONLY,
          },
          cvv: {
            type: DataTypes.INTEGER,
          },
    },
        {
            freezeTableName: true,
            timestamps: true,
            paranoid: true,
        }
    );
    return Payment_Cards;
};
