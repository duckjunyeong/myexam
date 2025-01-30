const ANSWER_INDEX_OFFSET = 1;

const getChoiceButtonProps = (
  problem,
  choiceIdx,
  userAnswer,
  isResult,
  onClickProblem
) => {
  const baseProps = {
    id: `problem-${problem.id}-choice-${choiceIdx}`,
    name: `problem-${problem.id}`,
    isSelected: userAnswer[problem.id] === choiceIdx + ANSWER_INDEX_OFFSET,
  };

  if (isResult) {
    return {
      ...baseProps,
      correct:
        parseInt(problem.correct) === choiceIdx + ANSWER_INDEX_OFFSET &&
        parseInt(problem.correct) !== userAnswer[problem.id],
    };
  } else {
    return {
      ...baseProps,
      onClick: () => onClickProblem(problem.id, choiceIdx),
    };
  }
};

export default getChoiceButtonProps;
