import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const slideIn = keyframes`
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 200px; /* Input 창의 최종 너비 */
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    width: 200px; /* Input 창의 최종 너비 */
    opacity: 1;
  }
  to {
    width: 0;
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const AddButton = styled.button`
  background-color: #ffaaaa; /* 연한 빨간색 */
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  width: 10%; /* 가로 길이를 절반으로 설정 */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ff7f7f; /* 마우스 오버 시 약간 더 진한 빨간색 */
  }
  svg {
    margin-right: 8px;
  }
`;

export const StyledInput = styled.input`
  width: 200px;
  opacity: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  animation: ${(props) => (props.show ? slideIn : slideOut)} 0.3s ease-out
    forwards;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden; /* 애니메이션 중 내용 숨김 */
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 버튼과의 간격 */
`;

export const SubmitButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  animation: ${(props) => (props.show ? fadeIn : fadeOut)} 0.3s ease-out
    forwards;
  &:hover {
    background-color: #27ae60;
  }
`;
