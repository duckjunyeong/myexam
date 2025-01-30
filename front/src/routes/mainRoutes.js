import React from "react";
import { Route } from "react-router";
import Main from "@pages/Main";
import Page_ExamTypeList from "@pages/Page_ExamTypeList";
import Page_Calendar from "@pages/Page_Calendar";
import Page_StopWatch from "@pages/Page_StopWatch";
import Page_TimeTable from "@pages/Page_TimeTable";

export const MainRoutes = () => (
  <Route path="/main" element={<Main />}>
    <Route path="examTypeList" element={<Page_ExamTypeList />} />
    <Route exact path="calendar" element={<Page_Calendar />} />
    <Route path="calendar/timeTable/:date/:mode" element={<Page_TimeTable />} />
    <Route path="calendar/stopWatch/:date" element={<Page_StopWatch />} />
  </Route>
);
