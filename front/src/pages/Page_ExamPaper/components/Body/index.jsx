import React, { memo, useCallback } from "react";
import {
  ChoiceWrapper,
  ChoiceText,
  ChoiceButton,
  ProblemContent,
  ProblemsContainer,
  ProblemTitle,
} from "./styles";

import useGetExamProblemAll from "@hooks/GetData/exam/useGetExamProblemAll";
import LoadingIndicator from "@components/LoadingIndicator";

const ANSWER_INDEX_OFFSET = 1;

const Problem = memo(({ examPaperListId, onClickProblem, userAnswer }) => {
  const { data: problemData } = useGetExamProblemAll(examPaperListId);

  const getChoiceButtonProps = useCallback(
    (problemId, choiceIdx) => {
      const props = {
        id: `problem-${problemId}-choice-${choiceIdx}`,
        name: `problem-${problemId}`,
        isSelected: userAnswer[problemId] === choiceIdx + ANSWER_INDEX_OFFSET,
        onClick: () => onClickProblem(problemId, choiceIdx),
      };
      return props;
    },
    [userAnswer, examPaperListId, onClickProblem]
  );

  if (!problemData) {
    return <LoadingIndicator />;
  }

  return (
    <ProblemsContainer>
      {problemData ? (
        problemData.map((problem) => {
          const parsedChoice = JSON.parse(problem.choice);
          return (
            <ProblemContent>
              <ProblemTitle>{problem.title}</ProblemTitle>
              {parsedChoice.map((choice, index) => {
                return (
                  <ChoiceWrapper key={index}>
                    <ChoiceButton
                      {...getChoiceButtonProps(problem.id, index)}
                    />
                    <ChoiceText
                      htmlFor={`problem-${problem.id}-choice-${index}`}
                    >
                      {index + ANSWER_INDEX_OFFSET}. {choice}
                    </ChoiceText>
                  </ChoiceWrapper>
                );
              })}
            </ProblemContent>
          );
        })
      ) : (
        <div>no data</div>
      )}
    </ProblemsContainer>
  );
});

export default Problem;
