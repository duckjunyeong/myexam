import styled from "@emotion/styled";

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow-y: auto; // 스크롤 기능 추가
  max-height: 500px; // 최대 높이 설정
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #ccc;
`;

export const TableHeader = styled.div`
  display: flex;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
  justify-content: center;
`;

export const TableHeaderCell = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
  font-weight: bold;

  &:last-child {
    border-right: none;
  }
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.div`
  padding: 5px;
  text-align: center;
  border-right: 1px solid #ccc;
  font-size: 12px;
  background-color: ${(props) => props.color || "transparent"};
  cursor: pointer;
  flex-grow: 1; // 셀의 가로 길이 늘림

  &:last-child {
    border-right: none;
  }
`;

export const TimeLabel = styled.span`
  font-size: 10px;
  color: #666;
`;

export const ActionButton = styled.div`
  text-decoration: none;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 5px; // 버튼 간 간격 추가

  /* 마우스 hover 효과 추가 */
  &:hover {
    background-color: #f0f0f0; // 연한 회색으로 변경
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2); // 그림자 강조
  }
`;
