import { useCallback } from "react";
import axios from "axios";
import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";

const useLogout = () => {
  const { mutate } = useGetUserInfo();

  const handleLogoutSuccess = useCallback(() => {
    console.log("로그아웃");
    mutate(false);
  }, [mutate]);

  const handleLogoutError = useCallback(() => {
    console.log("로그아웃 실패");
  }, []);

  const onClickLogout = useCallback(async () => {
    try {
      await axios.post("/api/user/logout");
      handleLogoutSuccess();
    } catch {
      handleLogoutError();
    }
  }, []);

  return onClickLogout;
};

export default useLogout;
