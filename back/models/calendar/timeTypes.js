const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TimeTypes extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
          // unique: true,  // 이 부분은 제거하거나 주석 처리
        },
        color: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        modelName: "TimeTypes",
        tableName: "TimeTypes",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.TimeTypes.hasMany(db.Schedules, { foreignKey: "TimeTypeId" });
    db.TimeTypes.belongsTo(db.TimeTypeCategory, {
      foreignKey: "TimeTypeCategoryId",
    });
    db.TimeTypes.belongsTo(db.User, {
      foreignKey: "UserId",
    });

    db.TimeTypes.hasMany(db.UserDailyTimeTypes, {
      foreignKey: "TimeTypeId",
    });
  }
};
