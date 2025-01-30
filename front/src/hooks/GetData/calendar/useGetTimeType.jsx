import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useGetTimeType = (categoryId) => {
  const { data, error, mutate } = useSWR(
    categoryId ? `/api/timeType/${categoryId}` : null,
    fetcher
  );

  return { data, error, mutate };
};

export default useGetTimeType;
