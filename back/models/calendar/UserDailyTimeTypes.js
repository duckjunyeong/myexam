const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserDaliyTimeTypes extends Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.STRING(10),
          allowNull: false,
          // unique: true,  // 이 부분은 제거하거나 주석 처리
        },
        date: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        modelName: "UserDaliyTimeTypes",
        tableName: "UserDaliyTimeTypes",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.UserDailyTimeTypes.belongsTo(db.TimeTypes, {
      foreignKey: "TimeTypeId",
    });
  }
};
