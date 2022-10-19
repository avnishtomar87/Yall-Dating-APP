module.exports = (sequelize, DataTypes) => {
  const Interest_Value = sequelize.define("interest_value", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    interest_category_id: {
      type: DataTypes.INTEGER,
    },
    value: {
      type: DataTypes.STRING,
    },
  },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
  Interest_Value.associate = models => {
    Interest_Value.hasMany(models.user_interests, {
      foreignKey: { name: "interest_value_id", allowNull: false },
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    models.user_interests.belongsTo(Interest_Value, {
      foreignKey: { name: "interest_value_id", allowNull: false },
      targetKey: "id",
    });
  };
  return Interest_Value;
};
