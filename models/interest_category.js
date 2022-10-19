module.exports = (sequelize, DataTypes) => {
    const Interest_Category = sequelize.define("interest_category", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        category: {
            type: DataTypes.STRING,
        },
    },
        {
            freezeTableName: true,
            timestamps: true,
            paranoid: true,
        }
    );
    Interest_Category.associate = models => {
        Interest_Category.hasMany(models.interest_value, {
          foreignKey: { name: "interest_category_id", allowNull: false },
          sourceKey: "id",
          onDelete: "CASCADE",
        });
        models.interest_value.belongsTo(Interest_Category, {
          foreignKey: { name: "interest_category_id", allowNull: false },
          targetKey: "id",
        });
      };
    return Interest_Category;
};
