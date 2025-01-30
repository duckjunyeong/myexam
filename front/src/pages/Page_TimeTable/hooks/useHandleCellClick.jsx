import isTimeAhead from "@utils/isTimeAhead";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import useGetSchedule from "@hooks/GetData/calendar/useGetSchedule";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const useHandleCellClick = () => {
  const { date } = useParams();
  const { data: userData } = useSWR("/api/user", fetcher);
  const { selectedType } = useSelector((state) => state.timeTable);

  const { data: schedule, mutate: scheduleMutate } = useGetSchedule(
    date ? date : null,
    userData ? userData.id : null
  );

  const createCell = useCallback(
    async (time) => {
      // time 인자 받도록 수정
      try {
        const updatedSchedule = {
          ...schedule,
          [time]: selectedType,
        };
        await axios.post("/api/timeTable/create", {
          date,
          time,
          timeTypeId: selectedType.id,
          userId: userData.id,
        });
        scheduleMutate(updatedSchedule, false); // mutate에 revalidate: false 추가
        toast.success("셀을 생성했습니다");
      } catch (error) {
        toast.error("셀 생성에 실패하였습니다.");
      }
    },
    [schedule, scheduleMutate, selectedType, date, userData]
  ); // 의존성 배열 수정

  const deleteCell = useCallback(
    async (time) => {
      // time 인자 받도록 수정
      try {
        const updatedSchedule = {
          ...schedule,
        };
        delete updatedSchedule[time];

        await axios.delete("/api/timeTable/delete", {
          data: {
            date,
            userId: userData.id,
            time,
          },
        });
        scheduleMutate(updatedSchedule, false); // mutate에 revalidate: false 추가
        toast.success("셀을 삭제했습니다");
      } catch (error) {
        toast.error("삭제에 실패하였습니다.");
      }
    },
    [scheduleMutate, date, userData, schedule]
  ); // 의존성 배열 수정

  const handleCellClick = useCallback(
    async (time) => {
      // time 인자 받도록 수정
      if (selectedType === null) {
        return toast.error("시간 타입을 선택해주세요");
      }

      if (isTimeAhead(time)) {
        return toast.error("미리 시간을 선택할 수 없습니다.");
      }

      if (schedule[time]?.color === selectedType.color) {
        deleteCell(time); // time 전달
      } else {
        createCell(time); // time 전달
      }
    },
    [selectedType, schedule, createCell, deleteCell]
  );

  return handleCellClick;
};

export default useHandleCellClick;
