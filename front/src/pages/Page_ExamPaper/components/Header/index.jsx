import { SubmitButton, Header } from "../../styles";

import React from "react";
import { ToastContainer } from "react-toastify";
import useExamSubmit from "@pages/Page_ExamPaper/hooks/useExamSubmit";
import { useParams } from "react-router";

const ExamPaperHeader = ({ userAnswer }) => {
  const { examPaperListId } = useParams();
  const { onClickExamSubmit } = useExamSubmit(examPaperListId, userAnswer);

  return (
    <Header>
      <ToastContainer autoClose={1000} />
      <h1>MY_EXAM</h1>
      <SubmitButton onClick={onClickExamSubmit}> 제출하기 </SubmitButton>
    </Header>
  );
};

export default ExamPaperHeader;
