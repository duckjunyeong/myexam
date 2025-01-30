import styled from "@emotion/styled";

export const ListInputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const ListInput = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  appearance: none;
  background-color: #fff;
  cursor: pointer;
  width: 90px;

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
  margin-left: 15px;
  /* 마우스 hover 효과 추가 */
  &:hover {
    background-color: #f0f0f0; // 연한 회색으로 변경
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2); // 그림자 강조
  }
`;
