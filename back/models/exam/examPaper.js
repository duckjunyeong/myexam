const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ExamPaper extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(20),
          allowNull: false,
          // unique: true,  // 이 부분은 제거하거나 주석 처리
        },
        choice: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        correct: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0, // 또는 순서를 나타내는 다른 필드
        },
      },
      {
        modelName: "ExamPaper",
        tableName: "ExamPaper",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
        indexes: [
          {
            unique: true,
            fields: ["title", "deletedAt"], // title과 deleted_at 조합에 대한 고유 인덱스
            name: "unique_title_deletedAt", // (선택) 인덱스 이름 지정
          },
        ],
      }
    );
  }

  static associate(db) {
    db.ExamPaper.belongsTo(db.ExamPaperList, { foreignKey: "ExamPaperListId" });
  }
};
