import styled from "@emotion/styled";

export const AppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const AppBox = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  }
`;
// 앱 아이콘
export const AppIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  margin-bottom: 10px;
  span {
    font-size: 14px;
    font-weight: bold;
  }
`;
// 앱 이름
export const AppName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row; // 가로 정렬
  align-items: center; // 수직 중앙 정렬 (선택 사항)
  justify-content: center; // 수평 중앙 정렬 (선택 사항)
  width: 100%;
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
