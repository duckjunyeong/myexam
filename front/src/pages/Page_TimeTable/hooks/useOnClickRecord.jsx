import axios from "axios";
import isTimeAhead from "@utils/isTimeAhead";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import useGetSchedule from "@hooks/GetData/calendar/useGetSchedule";

const useOnClickRecord = () => {
  const { date } = useParams();
  const { data: userData } = useGetUserInfo();
  const { data: scheduleData, mutate: scheduleMutate } = useGetSchedule();
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const { selectedType } = useSelector((state) => state.timeTable);

  const isVaild = useCallback(() => {
    const [startHour, stratMinute] = startTime.split(":");
    const [endtHour, endMinute] = endTime.split(":");

    if (isTimeAhead(startTime) || isTimeAhead(endTime)) {
      setStartTime("");
      setEndTime("");
      return false;
    }

    if (parseInt(startHour) > parseInt(endtHour)) {
      setStartTime("");
      setEndTime("");
      return false;
    }
    if (
      parseInt(startHour) === parseInt(endtHour) &&
      parseInt(stratMinute) > parseInt(endMinute)
    ) {
      setStartTime("");
      setEndTime("");
      return false;
    }
    return true;
  }, [startTime, endTime]);

  const onChangeStartTime = (event) => {
    setStartTime(event.target.value);
  };

  const onChangeEndTime = (event) => {
    setEndTime(event.target.value);
  };

  const onClickRecord = useCallback(async () => {
    if (!isVaild(startTime, endTime)) {
      return toast.error("시간을 다시 설정해주세요.");
    }

    await axios.post(`/api/${date}/stopWatch/create`, {
      userId: userData.id,
      timeTypeId: selectedType.id,
      timeRange: [startTime, endTime],
    });

    scheduleMutate();
    setStartTime("00:00");
    setEndTime("00:00");
    console.log("scheduleData");
    console.log(scheduleData);
    toast.success("기록되었습니다. ");
  }, [userData, selectedType, startTime, endTime, scheduleData]);

  return {
    startTime,
    onChangeStartTime,
    endTime,
    onChangeEndTime,
    onClickRecord,
  };
};

export default useOnClickRecord;
