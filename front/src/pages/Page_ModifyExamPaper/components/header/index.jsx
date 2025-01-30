import React from "react";
import { Header, BackButton, BackIcon, ChangelogTitle } from "./styles";
import { useNavigate, useParams } from "react-router";
import LoadingIndicator from "@components/LoadingIndicator";
import useGetPaperName from "@hooks/GetData/exam/useGetPaperName";

const ModifyExamPaperHeader = () => {
  const navigate = useNavigate();
  const { examPaperListId } = useParams();
  const { paperName, headName, subName } = useGetPaperName();

  if (!headName || !subName) {
    return <LoadingIndicator />;
  }

  return (
    <Header>
      <BackButton onClick={() => navigate(-1)}>
        <BackIcon />
      </BackButton>
      <ChangelogTitle>
        {paperName ? headName + " - " + subName : <div>no data</div>}
      </ChangelogTitle>
      <button onClick={() => navigate("/main/examTypeList")}>
        메인으로 이동
      </button>
      <button onClick={() => navigate(`/examPaper/${examPaperListId}/exam`)}>
        시험치기
      </button>
    </Header>
  );
};

export default ModifyExamPaperHeader;
