import React, { useState, useCallback } from "react";

const useUserAnswer = () => {
  const [userAnswer, setUserAnswer] = useState({});

  const onClickProblem = useCallback(
    (problemId, index) => {
      setUserAnswer((preAnswer) => ({
        ...preAnswer,
        [problemId]: index + 1,
      }));
    },
    [setUserAnswer]
  );

  return [userAnswer, onClickProblem];
};

export default useUserAnswer;
