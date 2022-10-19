module.exports = (sequelize, DataTypes) => {
    const Event_Type = sequelize.define("event_type", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
          },
          banner_url: {
            type: DataTypes.STRING(500),
          },
    },
        {
            freezeTableName: true,
            timestamps: true,
            paranoid: true,
        }
    );
    Event_Type.associate = models => {
        Event_Type.hasMany(models.events, {
          foreignKey: { name: "event_type_id", allowNull: false },
          sourceKey: "id",
          onDelete: "CASCADE",
        });
        models.events.belongsTo(Event_Type, {
          foreignKey: { name: "event_type_id", allowNull: false },
          targetKey: "id",
        });
      };
    return Event_Type;
};
