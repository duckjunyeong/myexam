const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TimeTypeCategory extends Model {
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
        modelName: "TimeTypeCategory",
        tableName: "TimeTypeCategory",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }

  static associate(db) {
    db.TimeTypeCategory.hasMany(db.TimeTypes, {
      foreignKey: "TimeTypeCategoryId",
    });
    db.TimeTypeCategory.belongsTo(db.User, { foreignKey: "UserId" });
  }
};
