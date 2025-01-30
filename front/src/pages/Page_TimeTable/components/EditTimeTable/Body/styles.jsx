import styled from "@emotion/styled";

export const ChartContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

export const ChartTitle = styled.h3`
  margin: 0 0 10px 0;
`;

export const SelectedTypeIndicator = styled.div`
  margin-top: 10px;
  font-size: 14px;

  & > span {
    font-weight: bold;
    color: ${(props) => props.color};
  }
`;
