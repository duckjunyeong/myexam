import styled from "@emotion/styled";
import { Link } from "react-router";

export const Sidebar = styled.aside`
  width: 250px;
  background-color: #34495e;
  padding: 20px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  span {
    font-size: 18px;
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

export const StyledLink = styled(Link)`
  text-decoration: none; // 밑줄 제거
  color: inherit; // 기본 색상 상속 (또는 원하는 색상 지정)

  &:hover {
    // hover 시 스타일 (선택 사항)
    text-decoration: none; // 밑줄 추가
    color: blue; // 파란색으로 변경
  }

  &:visited {
    // 방문한 링크 스타일 (선택 사항)
    color: white;
  }

  // 기타 필요한 스타일 추가
`;
