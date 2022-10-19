module.exports = (sequelize, DataTypes) => {
  const User_Interests = sequelize.define("user_interests", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    interest_value_id: {
      type: DataTypes.INTEGER,
    },
  },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
  return User_Interests;
};
