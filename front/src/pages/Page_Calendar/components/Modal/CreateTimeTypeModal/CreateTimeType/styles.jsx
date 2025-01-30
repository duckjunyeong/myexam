import styled from "@emotion/styled";

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ColorPicker = styled.input`
  border: none;
  padding: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const TimeTypeItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // 추가: 양쪽 끝 정렬 및 간격 조정
  margin-bottom: 10px;
`;

export const TimeTypeName = styled.span`
  margin-right: 10px;
`;

export const TimeTypeColorBox = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: ${(props) => props.color};
  border: 1px solid #ccc;
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
`;

export const StyledTimeTypeList = styled.ul`
  list-style: none;
  padding: 0;
`;
