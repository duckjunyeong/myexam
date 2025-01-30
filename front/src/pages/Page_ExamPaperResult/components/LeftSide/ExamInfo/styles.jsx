import styled from "@emotion/styled";

export const ProblemSetItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ProblemSetTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #212529;
`;

export const ProblemSetInfo = styled.p`
  font-size: 14px;
  color: #495057;
  margin-bottom: 0;
`;
