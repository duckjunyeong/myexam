import styled from "@emotion/styled";

export const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

export const ResultItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#f5f5f5" : "white")};

  &:hover {
    background-color: #f5f5f5;
  }
`;
