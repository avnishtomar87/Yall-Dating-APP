module.exports = (sequelize, DataTypes) => {
    const Prompts = sequelize.define("prompts", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      question: {
        type: DataTypes.STRING,
      },
    },
      {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
      }
    );
    Prompts.associate = models => {
    Prompts.hasMany(models.user_prompts, {
      foreignKey: { name: "prompt_id", allowNull: false },
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    models.user_prompts.belongsTo(Prompts, {
      foreignKey: { name: "prompt_id", allowNull: false },
      targetKey: "id",
    });
  }
    return Prompts;
  };
  