module.exports = (sequelize, DataTypes) => {
    const Event_Booking = sequelize.define("event_booking", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
          },
          event_id: {
            type: DataTypes.INTEGER,
          },
          payment_card_id: {
            type: DataTypes.INTEGER,
          },
          seat_number: {
            type: DataTypes.STRING,
          },
          amount: {
            type: DataTypes.FLOAT,
          },
          payment_method: {
            type: DataTypes.ENUM("debit","credit","netbanking","upi","wallet"),
          },
          payment_id: {
            type: DataTypes.STRING,
          },
          payment_status: {
            type: DataTypes.ENUM("pending","success","failed"),
          },
          booking_status: {
            type: DataTypes.ENUM("initiated","confirmed","failed","cancelled"),
          },
    },
        {
            freezeTableName: true,
            timestamps: true,
            paranoid: true,
        }
    );
    return Event_Booking;
};
