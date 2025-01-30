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
  border-right: 1px solid #ccc;

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

export const TypeSelector = styled.div`
  margin-bottom: 20px;
`;

export const TypeButton = styled.button`
  margin: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const TypeInput = styled.input`
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SelectedTypeIndicator = styled.div`
  margin-top: 10px;
  font-size: 14px;

  & > span {
    font-weight: bold;
    color: ${(props) => props.color};
  }
`;

export const TimeTableContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  font-family: sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const Buttons = styled.div``;

export const Button = styled.button`
  background-color: #fff;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ChartContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

export const ChartTitle = styled.h3`
  margin: 0 0 10px 0;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const StatLabel = styled.div`
  font-size: 14px;
`;

export const TimeRatioContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  display: flex;
`;

export const TimeRatioTitle = styled.h3`
  margin: 0 0 10px 0;
`;
export const PopularityLabel = styled.div`
  display: flex;
  margin-bottom: 15px;
  font-size: 10px;
  span {
    margin-right: 5px;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #ffdddd;

  &:hover {
    background-color: #ffaaaa;
  }
`;

export const EditButton = styled(Button)`
  background-color: #ddddff;

  &:hover {
    background-color: #aaaaff;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // 컴포넌트 사이 간격
  margin-top: 20px;
`;

export const RecordButton = styled.button`
  padding: 5px 10px; // 패딩을 줄여서 크기 조정
  border: none;
  border-radius: 5px;
  background-color: black; // 배경색 검정색으로 변경
  color: white;
  font-size: 0.9rem; // 폰트 크기 조정
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: -21px;

  &:hover {
    background-color: #333; // 호버 시 약간 밝은 검정색
  }
`;

export const Tilde = styled.span`
  font-size: 1.2rem; // "~" 텍스트 크기 조정
  font-weight: bold;
  margin-top: -21px;
`;
