import React, { useEffect } from "react";

import { Container, Content } from "@pages/Main/styles";

import { Outlet, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";
import SideBar from "./LeftSide";

const Main = () => {
  const { data: userData } = useGetUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      console.log("UserData가 존재하지 않습니다.");
      navigate("/login");
    }
  }, [userData]);

  if (!userData) {
    return null;
  }

  return (
    <Container>
      <ToastContainer autoClose={1000} />

      <SideBar />

      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};
export default Main;
