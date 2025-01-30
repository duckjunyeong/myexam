import styled from "@emotion/styled";

export const CalendarBody = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const CalendarWeek = styled.tr``;

export const CalendarDay = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.isLastday ? "#f2f2f2" : "white")};
  height: 30px;

  &:hover {
    background-color: ${(props) => (props.isLastday ? "#f2f2f2" : "#f5f5f5")};
  }
`;

export const CalendarDayLabel = styled.span`
  font-size: 1rem;
`;
