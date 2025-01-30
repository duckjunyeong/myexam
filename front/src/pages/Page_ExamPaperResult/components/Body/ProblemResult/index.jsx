import React, { useMemo } from "react";
import {
  ProblemContent,
  ProblemTitle,
  ChoiceWrapper,
  ChoiceButton,
  ChoiceText,
} from "./styles";
import getChoiceButtonProps from "@utils/getChoiceButtonProps";
import LoadingIndicator from "@components/LoadingIndicator";

const ProblemResult = ({ examResult }) => {
  const userAnswer = useMemo(
    () =>
      examResult && examResult.length > 0
        ? JSON.parse(examResult.title).answer
        : [],
    [examResult]
  );

  const problemData = useMemo(
    () =>
      examResult && examResult.length > 0
        ? JSON.parse(examResult.examPaper)
        : [],
    [examResult]
  );

  if (!problemData || !examResult) {
    return <LoadingIndicator />;
  }

  return problemData ? (
    problemData.map((problem) => {
      const parsedChoice = JSON.parse(problem.choice);
      return (
        <ProblemContent
          correct={parseInt(problem.correct) === userAnswer[problem.id]}
        >
          <ProblemTitle>{problem.title}</ProblemTitle>
          {parsedChoice.map((choice, index) => {
            return (
              <ChoiceWrapper key={index}>
                <ChoiceButton
                  {...getChoiceButtonProps(problem, index, userAnswer, true)}
                />
                <ChoiceText>
                  {index + 1}. {choice}
                </ChoiceText>
              </ChoiceWrapper>
            );
          })}
        </ProblemContent>
      );
    })
  ) : (
    <div>no data</div>
  );
};

export default React.memo(ProblemResult);
