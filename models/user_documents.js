module.exports = (sequelize, DataTypes) => {
  const User_Documents = sequelize.define("user_documents", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    media_url: {
      type: DataTypes.STRING(500),
    },
    file_extension: {
      type: DataTypes.STRING,
    },
    file_type: {
      type: DataTypes.ENUM("uid", "dl", "selfie", "gallery"),
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
  return User_Documents;
};
