import { useParams } from "react-router";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const useGetPaperName = () => {
  const { examPaperListId } = useParams();
  const {
    data: paperName,
    error,
    mutate,
  } = useSWR(
    examPaperListId ? `/api/examPaper/${examPaperListId}/info` : null,
    fetcher
  );

  if (!paperName || !paperName.ExamTypeList || !paperName.ExamTypeList.title)
    return { paperName: null, headName: null, subName: null };

  const headName = paperName?.ExamTypeList?.title ?? null;
  const subName = paperName?.title ?? null;

  return { paperName, headName, subName };
};

export default useGetPaperName;
