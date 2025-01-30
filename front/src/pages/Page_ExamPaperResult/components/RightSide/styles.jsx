import styled from "@emotion/styled";

export const ProblemSideItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e9ecef;
  }
`;

export const ScoreDisplay = styled.div`
  padding: 10px 20px;
  margin-bottom: 20px; // ExamProblem과의 간격
  border: 1px solid #007bff; // 파란색 테두리
  border-radius: 4px;
  background-color: #f0f8ff; // 옅은 파란색 배경
  font-size: 18px;
  font-weight: bold;
  color: #007bff; // 파란색 텍스트
  text-align: center; // 텍스트 중앙 정렬
`;
