import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; // 컴포넌트 사이 간격
  margin-top: 20px;
`;

export const ListInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 120px; // 너비 조정
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: 1rem;
  color: #333;
`;

export const ListInput = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  appearance: none;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #999;
  }

  background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 8px 10px;
`;

export const Option = styled.option`
  font-size: 1rem;
  padding: 10px;
  background-color: #fff;
  color: #333;

  &:checked {
    background-color: #eee;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: "black"; // 녹색 계열
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049; // 더 어두운 녹색
  }
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
