import React from "react";
import { Route } from "react-router";
import Page_CreatePaperList from "@pages/Page_CreatePaperList";
import Page_ExamPaper from "@pages/Page_ExamPaper";
import Page_ModifyExamPaper from "@pages/Page_ModifyExamPaper";
import Page_ExamPaperResult from "@pages/Page_ExamPaperResult";

export const ExamPaperRoutes = () => (
  <>
    <Route
      path="/main/examPaperList/:examTypeId/create"
      element={<Page_CreatePaperList />}
    />
    <Route path="/main/examPaper/:id" element={<Page_ExamPaper />} />
    <Route
      path="/main/examPaper/:examPaperListId/modify"
      element={<Page_ModifyExamPaper />}
    />
    <Route
      path="/main/examPaper/:examPaperListId/exam"
      element={<Page_ExamPaper />}
    />
    <Route
      path="/main/examPaper/:examPaperListId/examResult"
      element={<Page_ExamPaperResult />}
    />
  </>
);
