import { memo, useCallback } from "react";
import { ResultList, ResultItem } from "./styles";
import useGetExamResult from "@hooks/GetData/exam/useGetExamResult";

const ExamResultInfo = memo(
  ({ examPaperListId, curExamResult, setCurExamResult }) => {
    const { data: resultData } = useGetExamResult(examPaperListId);

    const handleClickResult = useCallback((index) => {
      setCurExamResult(index);
    }, []);

    if (!resultData) {
      return <div> looading...</div>;
    }

    return (
      <ResultList>
        {resultData.map((result, index) => (
          <ResultItem
            key={index}
            onClick={() => handleClickResult(index)}
            isSelected={curExamResult === index}
          >
            제출 시간: {new Date(result.createdAt).toLocaleString()}
          </ResultItem>
        ))}
      </ResultList>
    );
  }
);

export default ExamResultInfo;
