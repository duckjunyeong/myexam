// constants.js
export const ROUTE_LOGIN = "/login";
export const ROUTE_SIGNUP = "/signup";
export const ROUTE_MAIN = "/main";
export const ROUTE_EXAM_TYPE_LIST = "examTypeList";
export const ROUTE_CALENDAR = "calendar";
export const ROUTE_TIMETABLE = "calendar/timeTable/:date/:mode";
export const ROUTE_STOPWATCH = "calendar/stopWatch/:date";
export const ROUTE_CREATE_PAPER_LIST = "examPaperList/:examTypeId/create";
export const ROUTE_EXAM_PAPER = "examPaper/:id"; // or "examPaper/:examPaperListId/exam"
export const ROUTE_MODIFY_EXAM_PAPER = "examPaper/:examPaperListId/modify";
export const ROUTE_EXAM_PAPER_RESULT = "examPaper/:examPaperListId/examResult";
