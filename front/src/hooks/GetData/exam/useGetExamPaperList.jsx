import fetcher from "@utils/fetcher";
import useSWR from "swr";

const useGetExamPaperList = (examTypeId) => {
  const { data, error, mutate } = useSWR(
    `api/examPaperList/${examTypeId}`,
    fetcher
  );
  return { data, error, mutate };
};

export default useGetExamPaperList;
