import {
  CalendarBody,
  CalendarDay,
  CalendarDayLabel,
  CalendarWeek,
} from "./styels";
import generateCalendar from "@pages/Page_Calendar/utils/generateCalendar";
import isLastDay from "@pages/Page_Calendar/utils/isLastDay";
import useHandleDateClick from "@pages/Page_Calendar/hooks/useHandleDateClick";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CalendarDate = () => {
  const navigate = useNavigate();
  const { year, month } = useSelector((state) => state.curDate);
  const calendar = generateCalendar(year, month);
  const handleDateClick = useHandleDateClick((date, mode) => {
    navigate(`/main/calendar/timeTable/${date}/${mode}`);
  });

  return (
    <CalendarBody>
      <CalendarWeek>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <CalendarDay key={day}>
            <CalendarDayLabel>{day}</CalendarDayLabel>
          </CalendarDay>
        ))}
      </CalendarWeek>
      {calendar.map((week, index) => (
        <CalendarWeek key={index}>
          {week.map((day, index) => (
            <CalendarDay
              key={index}
              onClick={() => day && handleDateClick(year, month, day)}
              isLastday={isLastDay(day, year, month)}
            >
              {day && <CalendarDayLabel>{day}</CalendarDayLabel>}
            </CalendarDay>
          ))}
        </CalendarWeek>
      ))}
    </CalendarBody>
  );
};

export default CalendarDate;
