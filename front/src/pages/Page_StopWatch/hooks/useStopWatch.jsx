import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";

const useStopWatch = (timeTypeId) => {
  const { date } = useParams();
  const { data: userData } = useGetUserInfo();
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    return time;
  };

  const createCell = useCallback(
    async (endTime) => {
      try {
        await axios.post(`api/${date}/stopWatch/create`, {
          userId: userData.id,
          timeTypeId,
          timeRange: [startTime, endTime],
        });
        toast.success("시간이 기록되었습니다.");
      } catch (error) {
        console.error(error);
        toast.error("시간 기록을 실패하였였습니다.");
      }
    },
    [userData, timeTypeId, startTime, endTime]
  );

  const onClickStart = useCallback(() => {
    const time = getCurrentTime();

    setIsRunning(true);
    setStartTime(time);
  }, [setStartTime]);

  const onClickPause = useCallback(async () => {
    const endTime = getCurrentTime();

    createCell(endTime);
    setIsRunning(false);
    setEndTime(endTime);
  }, [setEndTime, startTime, endTime]);

  const onClickReset = useCallback(() => {
    setIsRunning(false);
    setSecondsRemaining(0); // 초기값으로 재설정
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        if (isRunning) {
          onClickPause();
        } else {
          onClickStart();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, startTime, endTime]); // isRunning, start, pause를 의존성 배열에 추가

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  return {
    hours,
    minutes,
    seconds,
    isRunning,
    onClickStart,
    onClickPause,
    onClickReset,
  };
};

export default useStopWatch;
