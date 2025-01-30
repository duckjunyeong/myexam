import { Container, AddPostButton, AddPostIcon, AddPostText } from "./styles";

import React, { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import CreateProblemModal from "./components/Modal/CreateProblemModal";
import ModifyExamProblemModal from "./components/Modal/ModifyExamProblemModal";

import useModal from "@hooks/useModal";
import useGetExamPaper from "@hooks/GetData/exam/useGetExamProblemAll";

import ModifyExamPaperHeader from "./components/header";
import ModifyExamPaperBody from "./components/body";

const Page_ModifyExamPaper = () => {
  const { examPaperListId } = useParams();

  const { data: examPaper, mutate: examPaperMutate } =
    useGetExamPaper(examPaperListId);

  const [curSelectedProblem, setCurSelectedProblem] = useState(null);

  const {
    isModalOpen: isCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const {
    isModalOpen: isEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const onClickEditExamProblem = useCallback((index) => {
    openEditModal();
    setCurSelectedProblem(index);
  }, []);

  const onClickDeleteProblem = useCallback(
    async (id) => {
      try {
        await axios
          .delete(`/api/examProblem/${id}/delete`)
          .then(() => examPaperMutate());
      } catch (error) {
        console.error("Error deleting problem:", error);
      }
    },
    [examPaperMutate]
  );

  return (
    <Container>
      <ModifyExamPaperHeader />
      <AddPostButton>
        <AddPostIcon>+</AddPostIcon>
        <AddPostText onClick={openCreateModal}>Add a new post</AddPostText>
      </AddPostButton>

      <ModifyExamPaperBody
        examPaperListId={examPaperListId}
        onClickEditExamProblem={onClickEditExamProblem}
        onClickDeleteProblem={onClickDeleteProblem}
      />

      {isCreateModal && (
        <CreateProblemModal
          closeCreateModal={closeCreateModal}
          examPaperListId={examPaperListId}
        />
      )}

      {isEditModal && (
        <ModifyExamProblemModal
          closeEditModalOn={closeEditModal}
          problem={examPaper[curSelectedProblem]}
          examPaperListId={examPaperListId}
        />
      )}
    </Container>
  );
};

export default Page_ModifyExamPaper;
