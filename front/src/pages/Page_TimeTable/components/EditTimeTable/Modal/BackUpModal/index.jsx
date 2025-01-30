import React, { useCallback } from "react";
import {
  ModalBody,
  ModalOverlay,
  ModalContent,
  Icon,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalButton,
} from "./styles";
import {
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TimeLabel,
  TableWrapper,
} from "@pages/Page_TimeTable/components/EditTimeTable/styles";
import axios from "axios";
import { toast } from "react-toastify";
import useGetSchedule from "@hooks/GetData/calendar/useGetSchedule";
import { useParams } from "react-router";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import getTimeSlices from "@pages/Page_TimeTable/utils/getTimeSlices";

const BackUpModal = ({ onClose, willDeleteSchedule }) => {
  const { date } = useParams();
  const { data: userData } = useSWR("/api/user", fetcher);

  const { data: schedule, mutate: scheduleMutate } = useGetSchedule(
    date ? date : null,
    userData ? userData.id : null
  );

  const timeSlices = getTimeSlices();
  const onConfirm = useCallback(async () => {
    await axios
      .delete("/api/schedules/backup/delete", {
        data: {
          data: willDeleteSchedule,
        },
      })
      .then(() => {
        scheduleMutate();
        toast.success("백업되었습니다.");
        onClose();
      })
      .catch(() => toast.error("백업에 실패하였습니다."));
  }, [willDeleteSchedule]);

  const isTimeInWillDeleteSchedule = (time) => {
    return willDeleteSchedule?.some((item) => item.time === time);
  };

  console.log(willDeleteSchedule);
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <Icon>
            <i className="fas fa-triangle-exclamation"></i>
          </Icon>
          <ModalTitle>Preview</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <TableWrapper>
            <TableContainer>
              <TableHeader>
                <TableHeaderCell>시간</TableHeaderCell>{" "}
                {/* 시간 헤더 셀 추가 */}
              </TableHeader>
              <TableBody>
                {timeSlices?.map((time) => (
                  <TableRow key={time}>
                    <TableCell>
                      <TimeLabel>{time}</TimeLabel>
                    </TableCell>
                    <TableCell
                      key={time}
                      color={
                        isTimeInWillDeleteSchedule(time)
                          ? "#ffffff" // 흰색
                          : schedule[time]?.color
                      }
                    />
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </TableWrapper>
        </ModalBody>
        <ModalFooter>
          <ModalButton className="cancel" onClick={onClose}>
            Cancel
          </ModalButton>
          <ModalButton className="deactivate" onClick={onConfirm}>
            Deactivate
          </ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BackUpModal;
