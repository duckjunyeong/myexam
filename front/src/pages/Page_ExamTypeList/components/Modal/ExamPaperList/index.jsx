import useGetExamPaperList from "@hooks/GetData/exam/useGetExamPaperList";
import { useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import {
  AppGrid,
  AppName,
  AppBox,
  AppIcon,
  ActionContainer,
  ActionButton,
} from "./styles";
const ExamPaperList = ({ examType }) => {
  const { data: examPaperList, mutate } = useGetExamPaperList(
    examType ? examType.id : null
  );

  const onClickDeleteExamPaper = useCallback(
    async (id) => {
      try {
        await axios.delete(`/api/examPaper/${id}/delete`);
        toast.success("시험지가 삭제되었습니다.");
        mutate(); // Refresh the exam paper list
      } catch (error) {
        console.error(error);
        toast.error("시험지 삭제에 실패했습니다.");
      }
    },
    [mutate]
  );
  return (
    <>
      {examPaperList && examPaperList.length > 0 ? (
        examPaperList.map((examPaperList) => {
          return (
            <AppGrid>
              <AppBox>
                <AppIcon color="#e67e22">
                  <span>rs</span>
                </AppIcon>
                <AppName>{examPaperList.title}</AppName>
                <ActionContainer>
                  <ActionButton
                    as={Link}
                    to={`/main/examPaper/${examPaperList.id}/exam`}
                  >
                    시험
                  </ActionButton>
                  <ActionButton
                    as={Link}
                    to={`/main/examPaper/${examPaperList.id}/examResult`}
                  >
                    결과
                  </ActionButton>
                  <ActionButton
                    as={Link}
                    to={`/main/examPaper/${examPaperList.id}/modify`}
                  >
                    수정
                  </ActionButton>
                  <ActionButton
                    as="button"
                    onClick={() => {
                      onClickDeleteExamPaper(examPaperList.id);
                    }}
                  >
                    삭제
                  </ActionButton>
                </ActionContainer>
              </AppBox>
            </AppGrid>
          );
        })
      ) : (
        <div>아직 시험지가 존재하지 않습니다.</div>
      )}
    </>
  );
};

export default ExamPaperList;
