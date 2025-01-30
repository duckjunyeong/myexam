import { useCallback, useParams } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useInput from "./useInput";

const useAddNewPaperList = () => {
  const navigate = useNavigate();
  const { examTypeId } = useParams();

  const [newExamPaperName, onChangeNewExamPaperName, setNewExamPaperName] =
    useInput("");

  const onSumbitNewExamPaperName = useCallback(
    async (e) => {
      try {
        const examPaperList = await axios.post(
          `/api/examPaperList/${examTypeId}/create`,
          {
            newExamPaperName,
          }
        );
        navigate(`/main/examPaper/${examPaperList.data.id}/modify`);
      } catch (error) {
        toast.error(error.response.data);
        console.error(error);
        setNewExamPaperName("");
      }
    },
    [newExamPaperName, examTypeId]
  );

  return [newExamPaperName, onChangeNewExamPaperName, onSumbitNewExamPaperName];
};

export default useAddNewPaperList;
