const Sequelize = require("sequelize");

const examTypeList = require("./exam/examTypeList");
const examPaperList = require("./exam/examPaperList");
const examPaper = require("./exam/examPaper");
const examResult = require("./exam/examResult");

const schedules = require("./calendar/schedules");
const timeTypes = require("./calendar/timeTypes");
const timeTypeCategory = require("./calendar/timeTypeCategory");
const userDailyTimeTypes = require("./calendar/UserDailyTimeTypes");

const user = require("./user");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.ExamTypeList = examTypeList;
db.ExamPaperList = examPaperList;
db.ExamPaper = examPaper;
db.ExamResult = examResult;
db.Schedules = schedules;
db.TimeTypes = timeTypes;
db.TimeTypeCategory = timeTypeCategory;
db.UserDailyTimeTypes = userDailyTimeTypes;
db.User = user;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
