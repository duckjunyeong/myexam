import fetcher from "@utils/fetcher";
import useSWR from "swr";

const useGetExamPaperList = (examTypeListId) => {
  const { data, error, mutate } = useSWR(
    `/api/examPaperList/${examTypeListId}`,
    fetcher
  );

  return { data, error, mutate };
};

export default useGetExamPaperList;
