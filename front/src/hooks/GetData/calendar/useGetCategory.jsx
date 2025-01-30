import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useGetCategory = (categoryId) => {
  const { data, error, mutate } = useSWR(
    categoryId ? `/api/timeTypeCategory/${categoryId}` : null,
    fetcher
  );
  return { data, error, mutate };
};

export default useGetCategory;
