const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },

        nickname: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },

        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        modelName: "User",
        tableName: "User",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
        indexes: [
          {
            unique: true,
            fields: ["email", "deletedAt"],
            name: "unique_user_deleteAt",
          },
        ],
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.ExamTypeList, {
      as: "ExamTypeLists",
      foreignKey: "UserId",
    });

    db.User.hasMany(db.TimeTypeCategory, { foreignKey: "UserId" });
    db.User.hasMany(db.TimeTypes, { foreignKey: "UserId" });
  }
};
