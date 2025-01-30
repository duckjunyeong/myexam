import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";
import axios from "axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const useLoadBackUpData = () => {
  const { data: userData } = useGetUserInfo();
  const { date } = useParams();

  const loadBackUpData = async () => {
    try {
      const backUpData = await axios.get(
        `/api/${date}/schedules/${userData.id}/backup/`
      );
      return backUpData;
    } catch (error) {
      console.error(error);
      toast.error("백업데이터를 가져오는데 실패하였습니다.");
      return [];
    }
  };

  return loadBackUpData;
};

export default useLoadBackUpData;
