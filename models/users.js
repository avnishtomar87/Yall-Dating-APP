module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users",{
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      mobile_number: {
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      user_type: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
      login_type:{
        type: DataTypes.STRING,
      },
      is_otp_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: "false",
      },
      full_name: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATEONLY,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.STRING,
      },
      job_title: {
        type: DataTypes.STRING,
      },
      about_me: {
        type: DataTypes.STRING(500),
      },
      privacy_accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: "false",
      },
      is_insta_linked: {
        type: DataTypes.BOOLEAN,
        defaultValue: "false",
      },
      insta_userid: {
        type: DataTypes.STRING,
      },
      is_gmail_login: {
        type: DataTypes.BOOLEAN,
        defaultValue: "false",
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
  Users.associate = models => {
    Users.hasMany(models.user_interests, {
      foreignKey: { name: "user_id", allowNull: false },
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    models.user_interests.belongsTo(Users, {
      foreignKey: { name: "user_id", allowNull: false },
      targetKey: "id",
    });
    Users.hasOne(models.dating_preferences, {
      foreignKey: { name: "user_id", allowNull: false },
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    models.dating_preferences.belongsTo(Users, {
      foreignKey: { name: "user_id", allowNull: false },
      targetKey: "id",
    });
    Users.hasOne(models.user_documents, {
      foreignKey: { name: "user_id", allowNull: false },
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    models.user_documents.belongsTo(Users, {
      foreignKey: { name: "user_id", allowNull: false },
      targetKey: "id",
    });
    Users.hasMany(models.user_prompts, {
      foreignKey: { name: "user_id", allowNull: false },
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    models.user_prompts.belongsTo(Users, {
      foreignKey: { name: "user_id", allowNull: false },
      targetKey: "id",
    });
  };
  return Users;
};
