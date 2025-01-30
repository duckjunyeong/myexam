import fetcher from "@utils/fetcher";
import useSWR from "swr";

const useGetUserInfo = (examTypeListId) => {
  const { data, error, mutate } = useSWR(`/api/user`, fetcher);

  return { data, error, mutate };
};

export default useGetUserInfo;
