import {
  TableWrapper,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TimeLabel,
  ActionButton,
} from "./styles";
import useGetSchedule from "@hooks/GetData/calendar/useGetSchedule";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";

import isTimeAhead from "@utils/isTimeAhead";
import useHandleCellClick from "@pages/Page_TimeTable/hooks/useHandleCellClick";
import getTimeSlices from "@pages/Page_TimeTable/utils/getTimeSlices";
import { useCallback, useState } from "react";
import useLoadBackUpData from "@pages/Page_TimeTable/hooks/useloadBackUpData";
import useModal from "@hooks/useModal";
import BackUpModal from "../../Modal/BackUpModal";

const TableChart = () => {
  const { date } = useParams();
  const { data: userData } = useSWR("/api/user", fetcher);
  const { data: schedule } = useGetSchedule(
    date ? date : null,
    userData ? userData.id : null
  );
  const { isModalOpen, openModal, closeModal } = useModal();
  const [willDeleteSchedule, setWillDeleteSchedule] = useState(null);

  const handleCellClick = useHandleCellClick();
  const timeSlices = getTimeSlices();

  const loadBackUpData = useLoadBackUpData();

  const onClickBackUp = useCallback(async () => {
    openModal();
    const backupData = await loadBackUpData();
    setWillDeleteSchedule(backupData.data);
  }, [userData, date]);

  console.log("TableChart update");
  return (
    <>
      {isModalOpen && (
        <BackUpModal
          willDeleteSchedule={willDeleteSchedule}
          onClose={closeModal}
        />
      )}
      <TableWrapper>
        <TableContainer>
          <TableHeader>
            <TableHeaderCell>시간</TableHeaderCell> {/* 시간 헤더 셀 추가 */}
            <ActionButton onClick={onClickBackUp}>Back Up</ActionButton>
          </TableHeader>
          <TableBody>
            {timeSlices?.map((time) => (
              <TableRow key={time}>
                <TableCell
                  color={isTimeAhead(time) && "rgba(128, 128, 128, 0.1)"}
                >
                  <TimeLabel>{time}</TimeLabel>
                </TableCell>
                <TableCell
                  key={time}
                  color={
                    isTimeAhead(time)
                      ? "rgba(128, 128, 128, 0.1)"
                      : schedule?.[time]?.color
                  }
                  onClick={() => handleCellClick(time)}
                />
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </TableWrapper>
    </>
  );
};

export default TableChart;
