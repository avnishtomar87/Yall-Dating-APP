module.exports = (sequelize, DataTypes) => {
    const Events = sequelize.define("events", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        event_type_id: {
            type:DataTypes.INTEGER,
          },
          title: {
            type:DataTypes.STRING,
          },
          slug_url: {
            type:DataTypes.STRING(500),
          },
          event_on: {
            type:DataTypes.DATE,
          },
          location: {
            type:DataTypes.STRING,
          },
          geog: {
            type:DataTypes.GEOGRAPHY,
          },
          cost: {
            type:DataTypes.FLOAT,
          },
          currency: {
            type:DataTypes.STRING,
          },
          short_desc: {
            type:DataTypes.STRING(500),
          },
          long_desc: {
            type:DataTypes.STRING(500),
          },
          front_banner_url: {
            type:DataTypes.STRING(500),
          },
          cover_banner_url: {
            type:DataTypes.STRING(500),
          },
    },
        {
            freezeTableName: true,
            timestamps: true,
            paranoid: true,
        }
    );
    return Events;
};
