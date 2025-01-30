const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Schedules extends Model {
  static init(sequelize) {
    return super.init(
      {
        date: {
          type: DataTypes.STRING(50),
          allowNull: false,
          // unique: true,  // 이 부분은 제거하거나 주석 처리
        },
        time: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
      },
      {
        modelName: "Schedules",
        tableName: "Schedules",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Schedules.belongsTo(db.TimeTypes, { foreignKey: "TimeTypeId" });
    db.Schedules.belongsTo(db.User, { foreignKey: "UserId" });
  }
};
