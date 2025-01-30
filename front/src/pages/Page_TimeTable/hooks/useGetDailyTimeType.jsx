import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";
import fetcher from "@utils/fetcher";
import { useParams } from "react-router";
import useSWR from "swr";

const useGetDailyTimeType = () => {
  const { date } = useParams();
  const { data: userData } = useGetUserInfo();
  const { data, error, mutate } = useSWR(
    userData ? `/api/userDailyTimeType/${date}/${userData.id}` : null,
    fetcher
  );

  return { data, error, mutate };
};

export default useGetDailyTimeType;
