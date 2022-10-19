module.exports = (sequelize, DataTypes) => {
    const Dating_Preferences = sequelize.define("dating_preferences", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        current_city: {
            type: DataTypes.STRING,
        },
        current_geog: {
            type: DataTypes.GEOGRAPHY,
        },
        interested_in: {
            type: DataTypes.STRING,
          },
        show_initial_name: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false",
        },
        show_email: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false",
        },
        show_job_title: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false",
        },
        show_age: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false",
        },
        show_contact: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false",
        },
        show_on_yall: {
            type: DataTypes.BOOLEAN,
            defaultValue: "false",
        },
        age_range_min: {
            type: DataTypes.INTEGER,
        },
        age_range_max: {
            type: DataTypes.INTEGER,
        },
        distance_range: {
            type: DataTypes.INTEGER,
        },
        distance_type: {
            type: DataTypes.ENUM("km", "mi")
        },
        profile_percentage: {
            type: DataTypes.INTEGER,
        },
    },
        {
            freezeTableName: true,
            timestamps: true,
            paranoid: true,
        }
    );
    return Dating_Preferences;
};
