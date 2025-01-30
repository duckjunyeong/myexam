import { Container, SideLeft, SideRight, Body } from "./styles";

import React, { useMemo, useState } from "react";
import { useParams } from "react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProblemResult from "@pages/Page_ExamPaperResult/components/Body/ProblemResult";
import ExamResultHeader from "./components/Header";
import ExamInfo from "./components/LeftSide/ExamInfo";
import ExamScore from "./components/RightSide";
import ExamResultInfo from "./components/LeftSide/ExamResultList";
import LoadingIndicator from "@components/LoadingIndicator";

import useGetExamResult from "@hooks/GetData/exam/useGetExamResult";
import getScore from "@pages/Page_ExamPaperResult/utils/getScore";

const Page_ExamPaperResult = () => {
  const { examPaperListId } = useParams();
  const { data: resultData } = useGetExamResult(examPaperListId);
  const [curExamResult, setCurExamResult] = useState(0);

  const score = useMemo(() => {
    return getScore(resultData?.[curExamResult]);
  }, [resultData, curExamResult]);

  if (!resultData) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <ToastContainer autoClose={1000} />
      <ExamResultHeader />

      <Container>
        <SideLeft>
          <ExamInfo examPaperListId={examPaperListId} />
          <ExamResultInfo
            examPaperListId={examPaperListId}
            curExamResult={curExamResult}
            setCurExamResult={setCurExamResult}
          />
        </SideLeft>

        <Body>
          <ProblemResult
            examResult={resultData.length > 0 ? resultData[curExamResult] : []}
          />
        </Body>

        <SideRight>
          <ExamScore score={score} examPaperListId={examPaperListId} />
        </SideRight>
      </Container>
    </>
  );
};

export default Page_ExamPaperResult;
