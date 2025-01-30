import { useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useExamSubmit = (examPaperListId, userAnswer) => {
  const navigate = useNavigate();

  const submitUserAnswer = useCallback(async () => {
    const result = await axios.post(
      `/api/examPaper/${examPaperListId}/examResult`,
      { userAnswer }
    );

    return result;
  }, [examPaperListId, userAnswer]);

  const handleExamSubmitSuccess = useCallback(() => {
    toast.success("채점이 완료되었습니다.");
    navigate(`/examPaper/${examPaperListId}/examResult`);
  }, [examPaperListId, navigate]);

  const handleExamSubmitError = useCallback((error) => {
    toast.error(error);
    console.error(error);
  }, []);

  const onClickExamSubmit = useCallback(async () => {
    try {
      await submitUserAnswer();
      handleExamSubmitSuccess();
    } catch (error) {
      handleExamSubmitError(error);
    }
  }, [submitUserAnswer, handleExamSubmitSuccess, handleExamSubmitError]);

  return { onClickExamSubmit };
};

export default useExamSubmit;
