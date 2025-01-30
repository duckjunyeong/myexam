import React, { useMemo } from "react";
import {
  TimeTableContainer,
  TimeRatioTitle,
  TimeRatioContainer,
} from "./styles";

import { useParams } from "react-router";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useGetSchedule from "@hooks/GetData/calendar/useGetSchedule";
import transformScheduleData from "@pages/Page_TimeTable/utils/transformScheduleData";
import AnalysisChart from "@components/AnalysisChart";
import EditTimeTableHeader from "./Header";
import EditTimeTableChart from "./Body";

const EditTimeTable = () => {
  const { date } = useParams();
  const { data: userData } = useSWR("/api/user", fetcher);

  const { data: schedule } = useGetSchedule(
    date ? date : null,
    userData ? userData.id : null
  );

  const formattedData = useMemo(() => {
    if (!schedule || (schedule && schedule.length === 0)) {
      return [];
    }
    return transformScheduleData(schedule);
  }, [schedule]);

  return (
    <div>
      <ToastContainer autoClose={1000} />

      <TimeTableContainer>
        <EditTimeTableHeader />
        <EditTimeTableChart />

        <TimeRatioContainer>
          <TimeRatioTitle>Time Ratio</TimeRatioTitle>
          <AnalysisChart chartData={formattedData} />
        </TimeRatioContainer>
      </TimeTableContainer>
    </div>
  );
};

export default EditTimeTable;
