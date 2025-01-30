import React, { useState, useCallback, memo } from "react";
import {
  Section,
  SectionTitle,
  SectionContent,
} from "@pages/Page_ExamTypeList/components/ExamTypeList/styles";

import ExamPaperListModal from "../Modal/ExamPaperListModal";
import useModal from "@hooks/useModal";

const ExamTypeList = ({ examTypeList }) => {
  const {
    isModalOpen: isExamPaperModal,
    openModal: onOpenExamPaperModal,
    closeModal: onCloseExamPaperModal,
  } = useModal();

  const [curExamTypeId, setCurExamTypeId] = useState(null);

  const onClickExamType = useCallback(
    (index) => {
      onOpenExamPaperModal();
      setCurExamTypeId(index);
    },
    [setCurExamTypeId]
  );

  return examTypeList.map((data, index) => {
    return (
      <>
        <Section
          className="personal"
          key={data.id}
          onClick={() => {
            onClickExamType(index);
          }}
        >
          <SectionTitle>
            <span></span>
            <span>computer science</span>
            <span>{new Date(data.createdAt).toLocaleDateString("ko-KR")}</span>
          </SectionTitle>
          <SectionContent>
            <p>{data.title}</p>
          </SectionContent>
        </Section>

        {isExamPaperModal && (
          <ExamPaperListModal
            closeModal={onCloseExamPaperModal}
            examType={examTypeList[curExamTypeId]}
          />
        )}
      </>
    );
  });
};

export default ExamTypeList;
