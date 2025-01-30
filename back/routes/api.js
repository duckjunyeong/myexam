const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const handleApiError = (
  res,
  error,
  statusCode = 500,
  message = "서버 오류가 발생했습니다."
) => {
  console.error(error);
  return res.status(statusCode).send(message);
};

const {
  sequelize,
  Sequelize,
  TimeTypeCategory,
  UserDailyTimeTypes,
} = require("../models");
const { Op } = Sequelize;
const ExamTypeList = require("../models/exam/examTypeList");
const { needLoggedIn, needNotLoggedIn } = require("./middlerware");
const User = require("../models/user");
const ExamPaper = require("../models/exam/examPaper");
const ExamPaperList = require("../models/exam/examPaperList");
const ExamResult = require("../models/exam/examResult");
const { TimeTypes, Schedules } = require("../models");
const { where, Transaction } = require("sequelize");
const router = express.Router();

router.post("/signup", needNotLoggedIn, async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;

    const exUser = await User.findOne({ where: { email: email } });

    if (exUser) {
      return res.status(403).send("이미 사용중인 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    return res.status(201).json(user);
  } catch (error) {
    handleApiError(res, error, 500, "회원 가입 중 오류가 발생했습니다.");
  }
});

router.post("/login", needNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).json(
        await User.findOne({
          where: { id: user.id },
          attributes: ["id", "nickname", "email"],
        })
      );
    });
  })(req, res, next);
});

router.post("/main/createExamType", needLoggedIn, async (req, res, next) => {
  try {
    const { newTypeName } = req.body;
    const examType = await ExamTypeList.findOne({
      where: { title: newTypeName },
    });

    if (examType) {
      console.log("이미 존재하는 examType입니다.");
      return res.status(500).json("이미 존재하는 ExamType 입니다.");
    }

    const newExamType = await ExamTypeList.create({
      title: newTypeName,
      UserId: req.user.id,
    });

    return res.status(201).json(newExamType);
  } catch (error) {
    handleApiError(res, error, 500, "시험 유형 생성 중 오류가 발생했습니다.");
  }
});

router.get(
  "/examPaperList/:examTypeListId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examTypeListId } = req.params;
      const examPaper = await ExamPaperList.findAll({
        where: { ExamTypeListId: examTypeListId },
      });
      return res.status(201).json(examPaper);
    } catch (error) {
      handleApiError(
        res,
        error,
        500,
        "시험지 목록을 가져오는 중 오류가 발생했습니다."
      );
    }
  }
);

router.post(
  "/examPaperList/:examTypeListId/create",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examTypeListId } = req.params;
      const { newExamPaperName } = req.body;

      const examPaperList = await ExamPaperList.findOne({
        where: { title: newExamPaperName },
      });

      if (examPaperList) {
        return res.status(500).json("이미 존재하는 시험지 유형입니다.");
      }

      const newExamPaperList = await ExamPaperList.create({
        title: newExamPaperName,
        ExamTypeListId: examTypeListId,
      });
      return res.status(201).json(newExamPaperList);
    } catch (error) {
      handleApiError(res, error, 400, "시험지를 생성하지 못 하였습니다.");
    }
  }
);

router.get(
  "/examTypeList/:examTypeListId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examTypeListId } = req.params;
      const examType = await ExamTypeList.findByPk(examTypeListId);
      if (!examType) {
        return res.status(404).send("시험 유형을 찾을 수 없습니다.");
      }
      return res.status(200).json(examType);
    } catch (error) {
      handleApiError(res, error, 500, "데이터를 가져오지 못 하였습니다.");
    }
  }
);

router.get(
  "/examPaper/:examPaperListId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examPaperListId } = req.params;
      const examPaper = await ExamPaper.findAll({
        where: { ExamPaperListId: examPaperListId },
        order: [["order", "ASC"]],
      });
      return res.status(200).json(examPaper);
    } catch (error) {
      handleApiError(res, error, 500, "데이터를 조회할 수 없습니다.");
    }
  }
);

router.post(
  "/examPaper/:examPaperListId/create",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examPaperListId } = req.params;
      const { title, answer, choices } = req.body;
      const parsedChoices = JSON.stringify(choices);

      const examPaperList = await ExamPaperList.findByPk(examPaperListId);

      if (!examPaperList) {
        return res.status(400).json("해당 문제지는 존재하지 않습니다.");
      }

      const orderIdx = await ExamPaper.max("order", {
        where: { ExamPaperListId: examPaperListId },
      });

      const examProblem = await ExamPaper.create({
        title,
        correct: answer,
        choice: parsedChoices,
        ExamPaperListId: examPaperListId,
        order: orderIdx === 0 ? 0 : orderIdx + 1,
      });
      return res.status(201).json(examProblem);
    } catch (error) {
      handleApiError(res, error, 400, "문제를 생성하지 못 하였습니다.");
    }
  }
);

router.patch(
  "/main/examPaper/:examPaperListId/update",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examPaperListId } = req.params;
      const { newOrder } = req.body;
      const examPaperList = await ExamPaperList.findByPk(examPaperListId);

      if (!examPaperList) {
        return res.status(400).json("해당 문제지는 존재하지 않습니다.");
      }

      await ExamPaper.sequelize.transaction(async (t) => {
        for (let i = 0; i < newOrder.length; i++) {
          const examPaperId = newOrder[i].id;
          await ExamPaper.update(
            { order: i },
            {
              where: { id: examPaperId, ExamPaperListId: examPaperListId },
              transaction: t,
            }
          );
        }
      });
      const examPaper = await ExamPaper.findAll({
        where: { ExamPaperListId: examPaperListId },
        order: [["order", "ASC"]],
      });
      console.log("업데이트가 되었습니다.");
      console.log(examPaper);
    } catch (error) {
      handleApiError(
        res,
        error,
        400,
        "문제의 순서를 업데이트 하지 못 하였습니다."
      );
    }
  }
);

router.put("/examProblem/:problemId", needLoggedIn, async (req, res, next) => {
  try {
    const { problemId } = req.params;
    const { title, answer, choices } = req.body;
    const parsedChoices = JSON.stringify(choices);

    const examProblem = await ExamPaper.update(
      {
        title,
        correct: answer,
        choice: parsedChoices,
      },
      {
        where: {
          id: problemId,
        },
      }
    );
    return res.status(200).json(examProblem);
  } catch (error) {
    handleApiError(res, error, 400, "문제를 수정하지 못 하였습니다.");
  }
});

router.delete(
  "/examProblem/:problemId/delete",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { problemId } = req.params;
      await ExamPaper.destroy({ where: { id: problemId } });
      return res.status(204).send("데이터가 삭제되었습니다.");
    } catch (error) {
      handleApiError(res, error, 500, "시험문제가 삭제되지 못 하였습니다.");
    }
  }
);

router.delete(
  "/examPaper/:examPaperId/delete",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examPaperId } = req.params;
      await ExamResult.destroy({ where: { ExamPaperListId: examPaperId } });
      await ExamPaper.destroy({ where: { ExamPaperListId: examPaperId } });
      await ExamPaperList.destroy({ where: { id: examPaperId } });
      return res.status(204).send("데이터가 삭제되었습니다.");
    } catch (error) {
      handleApiError(res, error, 500, "시험지가 삭제되지 못 하였습니다.");
    }
  }
);

router.get("/user", (req, res, next) => {
  return res.status(200).json(req.user || false);
});

router.get(
  "/examPaper/:examPaperListId/info",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examPaperListId } = req.params;
      const examPaperList = await ExamPaperList.findByPk(examPaperListId, {
        include: [
          {
            model: ExamTypeList, // as 옵션 생략
          },
        ],
      });
      console.log(examPaperList);
      return res.status(201).json(examPaperList);
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "데이터를 가져오는데 실패하였습니다.");
    }
  }
);

router.post(
  "/examPaper/:examPaperListId/examResult",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { userAnswer } = req.body;
      const { examPaperListId } = req.params;
      // 시험지를 가져와서
      const examPaper = await ExamPaper.findAll({
        attributes: ["id", "title", "correct", "choice"], // 가져올 컬럼 지정
        where: { ExamPaperListId: examPaperListId },
        order: [["order", "ASC"]], // order 컬럼을 기준으로 오름차순 정렬
      });

      const result = {
        score: 0,
        answer: userAnswer,
      };

      examPaper.map((exam, index) => {
        console.log(exam.dataValues.correct);
        if (parseInt(exam.dataValues.correct) === userAnswer[exam.id]) {
          result.score += 1;
        }
      });
      const JSON_result = JSON.stringify(result);
      const JSON_examPaper = JSON.stringify(examPaper);

      await ExamResult.create({
        title: JSON_result,
        examPaper: JSON_examPaper,
        ExamPaperListId: examPaperListId,
      });
      return res.status(201).json(JSON_result);
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "채점에 실패했습니다.");
    }
  }
);

router.get(
  "/examPaper/:examPaperListId/examResult",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { examPaperListId } = req.params;
      const result = await ExamResult.findAll({
        where: { ExamPaperListId: examPaperListId },
        order: [["createdAt", "DESC"]],
      });

      console.log(`시험지 결과:  ${result}`);

      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      handleApiError(
        res,
        error,
        500,
        "시험지 결과를 가져오는데 실패하였습니다."
      );
    }
  }
);

router.post("/user/logout", needLoggedIn, (req, res, next) => {
  req.logout(() => {
    res.send("logout");
  });
});

// ----------------------------------------------------------------------------------

router.post(
  "/timeType/create/:UserId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { categoryId, timeTypeName, timeTypeColor } = req.body;
      const { UserId } = req.params;
      // 1. timType이 존재하는지 확인한다.
      const exTImeType = await TimeTypes.findOne({
        where: { name: timeTypeName },
      });

      if (exTImeType) {
        return res.status(401).json("이미 존재하는 timeType입니다.");
      }

      const response = await TimeTypes.create({
        name: timeTypeName,
        color: timeTypeColor,
        TimeTypeCategoryId: categoryId,
        UserId,
      });
      return res.status(201).json(response);
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "timeType을 생성하지 못 하였습니다.");
    }
  }
);

router.get("/allTimeType/:UserId", needLoggedIn, async (req, res, next) => {
  try {
    const { UserId } = req.params;
    const timeTypes = await TimeTypes.findAll({
      where: { UserId },
    });
    return res.status(201).json(timeTypes);
  } catch (error) {
    console.log(error);
    handleApiError(res, error, 500, "timeType을 가져오지 못 하였습니다.");
  }
});

router.post("/timeTable/create", needLoggedIn, async (req, res, next) => {
  try {
    const { date, time, timeTypeId, userId } = req.body;
    // 중복인경우
    const isExistTimeCell = await Schedules.findOne({
      where: { userId, date, time },
    });

    if (isExistTimeCell) {
      await Schedules.update(
        { TimeTypeId: timeTypeId }, // 첫 번째 인자: 업데이트할 데이터
        { where: { userId, date, time } }
      )
        .then(() => res.status(201).json("업데이트 되었습니다."))
        .catch((error) => res.status(500).json(error));
    } else {
      await Schedules.create({
        date,
        time,
        UserId: userId,
        TimeTypeId: timeTypeId,
      })
        .then((response) => res.status(201).json(response))
        .catch((error) => res.status(500).json(error));
    }
  } catch (error) {
    console.error(error);
    handleApiError(res, error, 500, "timeTable을 저장하지 못 하였습니다.");
  }
});

router.get("/timeTable/:date/:userId", needLoggedIn, async (req, res, next) => {
  try {
    const { date, userId } = req.params;

    const schedules = await Schedules.findAll({
      where: { date, UserId: userId },
      include: [
        {
          model: TimeTypes,
          where: { UserId: userId },
          attributes: ["name", "color"],
          required: false,
        },
      ],
    });
    const formattedSchedules = {};
    schedules.forEach((schedule) => {
      if (schedule.TimeType) {
        formattedSchedules[schedule.time] = {
          name: schedule.TimeType.name,
          color: schedule.TimeType.color,
        };
      }
    });
    return res.status(200).json(formattedSchedules);
  } catch (error) {
    console.error(error);
    handleApiError(res, error, 500, "timeTable을 가져오지 못 하였습니다.");
  }
});

router.delete("/timeTable/delete", needLoggedIn, async (req, res, next) => {
  try {
    const { date, userId, time } = req.body;
    await Schedules.destroy({ where: { date, time, UserId: userId } });
    return res.status(200).json("삭제되었습니다.");
  } catch (error) {
    console.error(error);
    handleApiError(res, error, 500, "timeTable을 삭제하지 못 하였습니다.");
  }
});

router.post("/:date/stopWatch/create", needLoggedIn, async (req, res, next) => {
  const { date } = req.params;
  const { userId, timeTypeId, timeRange } = req.body;
  const startTime = timeRange[0].split(":");
  const endTime = timeRange[1].split(":");

  let startHour = parseInt(startTime[0]);
  let startMinute = parseInt(startTime[1]);
  let endHour = parseInt(endTime[0]);
  let endMinute = parseInt(endTime[1]);

  if (startMinute % 10 < 5) {
    startMinute = startMinute - (startMinute % 10);
  } else {
    startMinute = startMinute + 10 - (startMinute % 10);
    if (startMinute === 60) {
      startMinute = 0;
      startHour += 1;
    }
  }

  if (endMinute % 10 < 5) {
    endMinute = endMinute - (endMinute % 10);
  } else {
    endMinute = endMinute + 10 - (endMinute % 10);
    if (endMinute === 60) {
      endMinute = 0;
      endHour += 1;
    }
  }
  const t = await sequelize.transaction();

  try {
    while (startHour <= endHour) {
      while (
        startMinute <= 50 &&
        !(startHour === endHour && startMinute >= endMinute)
      ) {
        const formattedHour = startHour.toString().padStart(2, "0");
        const formattedMinute = startMinute.toString().padStart(2, "0");
        const time = `${formattedHour}:${formattedMinute}`;
        await Schedules.create(
          {
            UserId: userId,
            TimeTypeId: timeTypeId,
            time,
            date,
          },
          {
            transaction: t,
          }
        );
        startMinute += 10;
      }
      startHour++;
      startMinute = 0;
    }

    await t.commit();
    res.status(201).json("성공");
  } catch (error) {
    console.error(error);
    handleApiError(res, error, 500, "시간기록을 실패하였습니다.");
  }
});

router.get(
  "/:date/schedules/:userId/backup",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { date, userId } = req.params;
      const latestRecord = await Schedules.findOne({
        attributes: ["updatedAt"],
        order: [["updatedAt", "DESC"]],
        where: { date, UserId: userId },
      });

      console.log(latestRecord.updatedAt);
      console.log(userId);
      if (!latestRecord) {
        return res.status(201).json("백업할 데이터가 존재하지 않습니다."); // 테이블에 데이터가 없는 경우 빈 배열 반환
      }

      const deleteTargetSchedules = await Schedules.findAll({
        where: {
          date,
          UserId: userId,
          updatedAt: latestRecord.updatedAt,
        },
        include: [
          {
            model: TimeTypes,
            where: { UserId: userId },
            attributes: ["name", "color"],
            required: false,
          },
        ],
      });

      res.status(201).json(deleteTargetSchedules);
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "백업데이터를 추출하지 못 하였습니다.");
    }
  }
);

router.delete(
  "/schedules/backup/delete",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { data } = req.body;

      const t = await sequelize.transaction();
      console.log(data);
      data.map(async (data) => {
        await Schedules.destroy({ where: { id: data.id } }, { transaction: t });
      });
      t.commit();
      res.status(201).json("삭제되었습니다.");
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "Schedules을 되돌리는데 실패하였습니다.");
    }
  }
);

router.get(
  "/schedules/monthly/:year/:month/:UserId",
  needLoggedIn,
  async (req, res, next) => {
    const { year, month, UserId } = req.params;

    const schedules = await Schedules.findAll({
      where: {
        UserId,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("Schedules.updatedAt")),
            Op.eq,
            year
          ),
          Sequelize.where(
            Sequelize.fn("MONTH", Sequelize.col("Schedules.updatedAt")),
            Op.eq,
            parseInt(month) + 1
          ),
        ],
      },
      attributes: ["id"],
      include: [
        {
          model: TimeTypes,
          where: { UserId },
          attributes: ["name", "color"],
          required: false,
          include: [
            {
              model: TimeTypeCategory,
              attributes: ["name", "color"],
            },
          ],
        },
      ],
    });
    return res.status(200).json(schedules);
    console.log(schedules[0].TimeType);
    const formattedSchedules = {};
    schedules.forEach((schedule) => {
      if (schedule.TimeType) {
        formattedSchedules[schedule.time] = {
          name: schedule.TimeType.name,
          color: schedule.TimeType.color,
        };
      }
    });
    return res.status(200).json(formattedSchedules);
  }
);

router.post(
  "/timeTypeCategory/create",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { name, color, UserId } = req.body;

      const existCategory = await TimeTypeCategory.findOne({
        where: {
          UserId,
          [Op.or]: [{ name }, { color }],
        },
      });
      if (existCategory) {
        return res.status(400).json("이미 존재하는 카테고리입니다.");
      }

      const category = await TimeTypeCategory.create({ UserId, name, color });
      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      handleApiError(
        res,
        error,
        500,
        "timeTypeCategory를 생성하지 못 하엿습니다."
      );
    }
  }
);

router.get(
  "/allTimeTypeCategory/:UserId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { UserId } = req.params;
      const category = await TimeTypeCategory.findAll({ where: { UserId } });

      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "카테고리를 가져오지 못 하였습니다.");
    }
  }
);

router.get(
  "/timeTypeCategory/:categoryId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await TimeTypeCategory.findByPk(categoryId);
      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "카테고리를 가져오지 못 하였습니다.");
    }
  }
);

router.get(
  "/timeType/:timeTypeCategoryId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { timeTypeCategoryId } = req.params;
      const timeTypes = await TimeTypes.findAll({
        where: { TimeTypeCategoryId: timeTypeCategoryId },
      });
      return res.status(201).json(timeTypes);
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "timeType을 가져오지 못 하였습니다.");
    }
  }
);

router.delete(
  "/timeType/:timeTypeId/delete",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { timeTypeId } = req.params;
      const deleteCount = await TimeTypes.destroy({
        where: { id: timeTypeId },
      });
      console.log(deleteCount);

      if (!deleteCount) {
        return res.status(404).json("존재하지 않는 TimeType입니다.");
      }
      return res.status(200).json("삭제되었습니다.");
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "timeType을 삭제하지 못 하였습니다.");
    }
  }
);

router.delete(
  "/timeTypeCategory/:categoryId/delete",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const timeTypes = await TimeTypes.findAll({
        where: { TimeTypeCategoryId: categoryId },
      });
      timeTypes.map(async (timeType) => {
        await Schedules.destroy({ where: { TimeTypeId: timeType.id } });
        await TimeTypes.destroy({ where: { id: timeType.id } });
      });
      await TimeTypeCategory.destroy({ where: { id: categoryId } });
      return res.status(200).json("삭제되었습니다.");
    } catch (error) {
      handleApiError(res, error, 500, "데이터를 삭제하지 못 하였습니다.");
      console.error(error);
    }
  }
);

router.patch(
  "/timeTypeCategory/:categoryId/edit",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const { categoryName, categoryColor } = req.body;

      await TimeTypeCategory.update(
        { name: categoryName, color: categoryColor },
        { where: { id: categoryId } }
      );
      return res.status(200).json("업데이트 되었습니다.");
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "업데이트하지 못 하였습니다.");
    }
  }
);

// 사용자가 선택한 timeType들을 가져다 준다.

router.get(
  "/userDailyTimeType/:date/:userId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { date, userId } = req.params;

      const dailyTimeType = await UserDailyTimeTypes.findAll({
        where: { date, userId },
        include: {
          model: TimeTypes,
          attributes: ["name", "color"],
        },
      });

      return res.status(200).json(dailyTimeType);
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "업데이트하지 못 하였습니다.");
    }
  }
);

// 해당 date 와 userId, timeTypeid 값을 이용해서 데이터를 생성한다.
router.post(
  "/userDailyTimeType/add/:date/:userId",
  needLoggedIn,
  async (req, res, next) => {
    try {
      const { date, userId } = req.params;
      const { timeTypeId } = req.body;

      await UserDailyTimeTypes.create({
        date,
        userId,
        TimeTypeId: timeTypeId,
      });

      return res.status(201).json("추가되었습니다.");
    } catch (error) {
      console.error(error);
      handleApiError(res, error, 500, "업데이트하지 못 하였습니다.");
    }
  }
);
module.exports = router;
