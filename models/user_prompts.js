module.exports = (sequelize, DataTypes) => {
    const User_Prompts = sequelize.define("user_prompts", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      prompt_id: {
        type: DataTypes.INTEGER,
      },
      prompt_answer: {
        type: DataTypes.STRING(500),
      },
      sequence_number: {
        type: DataTypes.INTEGER,
      },
    },
      {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
      }
    );
    return User_Prompts;
  };
  