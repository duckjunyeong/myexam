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

// 페이지네이션 컨테이너
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const PaginationDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#337ab7" : "#ddd")};
  margin: 0 5px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;
