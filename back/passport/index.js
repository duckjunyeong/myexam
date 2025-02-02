const passport = require("passport");
const local = require("./local");
const User = require("../models/user");
const ExamTypeList = require("../models/exam/examTypeList");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 서버쪽에 [{ id: 1, cookie: 'clhxy' }]
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "nickname", "email"],
        include: [
          {
            model: ExamTypeList,
            as: "ExamTypeLists",
          },
        ],
      });
      console.log("User");
      console.log(User);
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
