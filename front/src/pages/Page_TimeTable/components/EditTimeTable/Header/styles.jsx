import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black; /* 또는 원하는 기본 색상 */

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: inherit; /* 또는 원하는 기본 색상 */
  }
`;
