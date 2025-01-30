import useSWR from "swr";
import fetcher from "@utils/fetcher";
import useGetUserInfo from "../exam/useGetUserInfo";

const useGetMonthlyData = (currentYear, currentMonth) => {
  const { data: userData } = useGetUserInfo();

  const { data, error, mutate } = useSWR(
    userData
      ? `/api/schedules/monthly/${currentYear}/${currentMonth}/${userData.id}`
      : null,
    fetcher
  );
  return { data, error, mutate };
};

export default useGetMonthlyData;
