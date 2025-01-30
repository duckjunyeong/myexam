import React from "react";
import { ProblemSetItem, ProblemSetTitle, ProblemSetInfo } from "./styles";
import useGetPaperName from "@hooks/GetData/exam/useGetPaperName";
import LoadingIndicator from "@components/LoadingIndicator";

const ExamInfo = () => {
  const { paperName, headName, subName } = useGetPaperName();

  if (!headName || !subName) {
    <LoadingIndicator />;
  }

  return (
    <ProblemSetItem>
      <ProblemSetTitle>
        {paperName ? headName + " - " + subName : <div>no data</div>}
      </ProblemSetTitle>

      <ProblemSetInfo>content</ProblemSetInfo>
    </ProblemSetItem>
  );
};

export default ExamInfo;
