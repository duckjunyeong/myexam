import CalendarDate from "./CalendarDate";
import CalendarNav from "./CalendarNav";
import { CalendarContainer } from "../../styles";

const Calendar = () => {
  return (
    <CalendarContainer>
      <CalendarNav />
      <CalendarDate />
    </CalendarContainer>
  );
};

export default Calendar;
