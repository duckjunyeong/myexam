import fetcher from "@utils/fetcher";
import useSWR from "swr";

const useGetExamProblemAll = (examPaperListId) => {
  const { data, error, mutate } = useSWR(
    `/api/examPaper/${examPaperListId}`,
    fetcher
  );

  return { data, error, mutate };
};

export default useGetExamProblemAll;
