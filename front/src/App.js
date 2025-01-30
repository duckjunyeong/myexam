import React from "react";
import { Route, Routes, Navigate } from "react-router";

import Page_Login from "@pages/Page_Login";
import Page_SignUp from "@pages/Page_SignUp";
import Main from "@pages/Main";
import Page_CreatePaperList from "@pages/Page_CreatePaperList";
import Page_ExamPaper from "@pages/Page_ExamPaper";
import Page_Calendar from "@pages/Page_Calendar";
import Page_StopWatch from "@pages/Page_StopWatch";
import Page_TimeTable from "@pages/Page_TimeTable";
import Page_ExamTypeList from "@pages/Page_ExamTypeList";
import Page_ModifyExamPaper from "@pages/Page_ModifyExamPaper";
import Page_ExamPaperResult from "@pages/Page_ExamPaperResult";
import { AuthRoutes } from "routes/authRoutes";
import { MainRoutes } from "routes/mainRoutes";
import { ExamPaperRoutes } from "routes/examPaperRoutes";

function App() {
  return (
    <Routes>
      {AuthRoutes()}
      {MainRoutes()}
      {ExamPaperRoutes()}
    </Routes>
  );
}

export default App;
