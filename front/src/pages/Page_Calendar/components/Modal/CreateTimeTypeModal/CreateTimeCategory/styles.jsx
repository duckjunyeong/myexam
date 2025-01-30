import styled from "@emotion/styled";

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

// 닫기 버튼
export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;

// 아이콘 컨테이너
export const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 30px;
  overflow: auto; // 내용이 넘칠 경우 스크롤바 생성
`;

// 개별 아이콘
export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0; // IconWrapper가 축소되지 않도록 설정
  width: 100px; // 너비 고정 (필요에 따라 조정 가능)
  margin-bottom: 20px; // 하단 마진 추가
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px); // 호버 시 위로 살짝 이동
  }
`;

// 원형 배경
export const IconCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: ${({ isSelected }) => (isSelected ? "#ddd" : "#e8f0fe")};
`;

// 아이콘 이미지 (여기서는 임시 이미지 사용 - 실제 아이콘 이미지로 교체 필요)
export const IconText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #337ab7;
`;

// 설명 텍스트
export const Description = styled.p`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  line-height: 1.6;
`;

// 페이지네이션 컨테이너
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

// 페이지네이션 점
export const PaginationDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#337ab7" : "#ddd")};
  margin: 0 5px;
  cursor: pointer;
`;

// "CHECK" 버튼
export const CheckButton = styled.button`
  display: block;
  width: 200px;
  margin: 0 auto;
  padding: 15px 20px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #286090;
  }
`;
