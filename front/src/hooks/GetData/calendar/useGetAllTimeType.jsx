import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useGetAllTimeType = (userId) => {
  const { data, error, mutate } = useSWR(
    userId ? `/api/allTimeType/${userId}` : null,
    fetcher
  );

  return { data, error, mutate };
};

export default useGetAllTimeType;
