import { useCallback } from "react";
import useGetUserInfo from "../../../hooks/GetData/exam/useGetUserInfo";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useInput from "../../../hooks/useInput";

const useAddNewType = () => {
  const { data: userData, mutate: userMutate } = useGetUserInfo();
  const [newTypeName, onChangeNewTypeName, setNewTypeName] = useInput("");

  const handleSubmitSuccess = useCallback(() => {
    toast.info("시험지 유형이 추가되었습니다.");
    userMutate();
    setNewTypeName("");
  }, []);

  const handleSubmitError = useCallback((error) => {
    toast.error(error.response.data);
    console.error(error.response);
    setNewTypeName("");
  }, []);

  const onSubmitNewType = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios.post("/api/main/createExamType", { newTypeName });
        handleSubmitSuccess();
      } catch (error) {
        handleSubmitError(error);
      }
    },
    [newTypeName, userData]
  );

  return [newTypeName, onChangeNewTypeName, onSubmitNewType];
};

export default useAddNewType;
