import {
  CalendarHeader,
  PrevButton,
  CalendarTitle,
  NextButton,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  goToNextMonth,
  goToPreviousMonth,
} from "../../../../../store/useCurDate";

const CalendarNav = () => {
  const { year, month } = useSelector((state) => state.curDate);
  const dispatch = useDispatch();

  return (
    <CalendarHeader>
      <PrevButton
        onClick={() => {
          dispatch(goToPreviousMonth());
        }}
      >
        이전 달
      </PrevButton>
      <CalendarTitle>
        {year}년 {month + 1}월
      </CalendarTitle>
      <NextButton
        onClick={() => {
          dispatch(goToNextMonth());
        }}
      >
        다음 달
      </NextButton>
    </CalendarHeader>
  );
};

export default CalendarNav;
