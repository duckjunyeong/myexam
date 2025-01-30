import styled from "@emotion/styled";

export const SearchBar = styled.div`
  display: flex;
  margin-bottom: 20px;

  input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #bdc3c7;
    border-radius: 5px;
    font-size: 16px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .notifications {
    width: 24px;
    height: 24px;
    background-color: #e74c3c;
    border-radius: 50%;
    margin-right: 15px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 4px;
      right: 4px;
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
    }
  }

  .user-name {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const AddFeatureButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2980b9;
  }

  svg {
    margin-right: 8px;
  }
`;
