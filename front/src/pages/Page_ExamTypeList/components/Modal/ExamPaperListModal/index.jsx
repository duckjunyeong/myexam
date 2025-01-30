import React from "react";
import {
  ModalContainer,
  ModalWindow,
  CompanyLogo,
  WelcomeMessage,
  StyledLink,
} from "./styles";
import "react-toastify/dist/ReactToastify.css";
import ExamPaperList from "../ExamPaperList";

const ExamPaperListModal = ({ closeModal, examType }) => {
  return (
    <ModalContainer onClick={closeModal}>
      <ModalWindow onClick={(event) => event.stopPropagation()}>
        <CompanyLogo>
          <span>articulate 360</span>
          <div>
            <StyledLink to={`/main/examPaperList/${examType.id}/create`}>
              Create ExamPaper
            </StyledLink>
          </div>
        </CompanyLogo>
        <ExamPaperList examType={examType} />
        <WelcomeMessage>{examType.title}</WelcomeMessage>
      </ModalWindow>
    </ModalContainer>
  );
};

export default ExamPaperListModal;
