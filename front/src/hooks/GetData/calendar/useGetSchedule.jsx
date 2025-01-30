import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useGetSchedule = (date, userDataId) => {
  console.log("useGetSchedule 호출!!");
  const { data, error, mutate } = useSWR(
    date && userDataId ? `/api/timeTable/${date}/${userDataId}` : null,
    fetcher
  );
  return { data, error, mutate };
};

export default useGetSchedule;
