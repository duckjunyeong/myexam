import { AppContainer } from "@pages/Page_ExamPaper/styles";

import React from "react";
import { useParams } from "react-router";

import "react-toastify/dist/ReactToastify.css";

import Problem from "@pages/Page_ExamPaper/components/Body";
import ExamPaperHeader from "./components/Header";
import ProblemInfo from "./components/LeftSide";
import useUserAnswer from "@pages/Page_ExamPaper/hooks/useUserAnswer";

const Page_ExamPaper = () => {
  const { examPaperListId } = useParams();
  const [userAnswer, onClickProblem] = useUserAnswer();

  // <ProblemInfo /> 뺏음
  return (
    <>
      <ExamPaperHeader userAnswer={userAnswer} />
      <AppContainer>
        <ProblemInfo />
        <Problem
          examPaperListId={examPaperListId}
          onClickProblem={onClickProblem}
          userAnswer={userAnswer}
        />
      </AppContainer>
    </>
  );
};

export default Page_ExamPaper;
