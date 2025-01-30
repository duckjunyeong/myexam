import { ProblemSideItem, ScoreDisplay } from "./styles";
import useGetExamResult from "@hooks/GetData/exam/useGetExamResult";

const ExamScore = ({ score, examPaperListId }) => {
  const { data: resultData } = useGetExamResult(examPaperListId);

  return (
    <ProblemSideItem>
      <ScoreDisplay>점수: {`${score} / ${resultData.length}`}</ScoreDisplay>
    </ProblemSideItem>
  );
};

export default ExamScore;
