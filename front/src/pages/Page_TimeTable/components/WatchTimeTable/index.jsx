import React, { useMemo } from "react";
import {
  TableWrapper,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TimeLabel,
  TableCell,
  TimeTableContainer,
  Header,
  Title,
  ChartContainer,
  ChartTitle,
  TimeRatioContainer,
  TimeRatioTitle,
} from "@pages/Page_TimeTable/components/EditTimeTable/styles";
import { useParams } from "react-router";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import "react-toastify/dist/ReactToastify.css";

import useGetSchedule from "@hooks/GetData/calendar/useGetSchedule";
import getTimeSlices from "@pages/Page_TimeTable/utils/getTimeSlices";
import AnalysisChart from "@components/AnalysisChart";
import transformScheduleData from "@pages/Page_TimeTable/utils/transformScheduleData";
import LoadingIndicator from "@components/LoadingIndicator";

const WatchTimeTable = () => {
  const { date } = useParams();
  const { data: userData } = useSWR("/api/user", fetcher);

  const { data: schedule } = useGetSchedule(
    date ? date : null,
    userData ? userData.id : null
  );

  const timeSlices = getTimeSlices();

  const formattedData = useMemo(() => {
    if (!schedule || (schedule && schedule.length === 0)) {
      return {};
    }
    return transformScheduleData(schedule);
  }, [schedule]);

  if (!userData || !schedule) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <TimeTableContainer>
        <Header>
          <Title>Time Table</Title>
        </Header>

        <ChartContainer>
          <ChartTitle>Time Record</ChartTitle>
          <TableWrapper>
            <TableContainer>
              <TableHeader>
                <TableHeaderCell>시간</TableHeaderCell>{" "}
              </TableHeader>
              <TableBody>
                {timeSlices?.map((time) => (
                  <TableRow key={time}>
                    <TableCell>
                      <TimeLabel>{time}</TimeLabel>
                    </TableCell>
                    <TableCell key={time} color={schedule[time]?.color} />
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </TableWrapper>
        </ChartContainer>

        <TimeRatioContainer>
          <TimeRatioTitle>Time Ratio</TimeRatioTitle>
          <AnalysisChart chartData={formattedData} />
        </TimeRatioContainer>
      </TimeTableContainer>
    </div>
  );
};

export default WatchTimeTable;
