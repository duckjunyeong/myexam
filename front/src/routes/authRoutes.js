import React from "react";
import { Route, Navigate } from "react-router";
import Page_Login from "@pages/Page_Login";
import Page_SignUp from "@pages/Page_SignUp";

export const AuthRoutes = () => (
  <>
    <Route exact path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Page_Login />} />
    <Route path="/signup" element={<Page_SignUp />} />
  </>
);
