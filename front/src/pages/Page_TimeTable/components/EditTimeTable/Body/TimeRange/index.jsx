import useOnClickRecord from "@pages/Page_TimeTable/hooks/useOnClickRecord";
import {
  ListInputContainer,
  Label,
  ListInput,
  Option,
  Container,
  RecordButton,
  Tilde,
} from "./styles";
import { useState } from "react";
import getTimeSlices from "@pages/Page_TimeTable/utils/getTimeSlices";

const TimeRangeRecord = () => {
  const {
    startTime,
    onChangeStartTime,
    endTime,
    onChangeEndTime,
    onClickRecord,
  } = useOnClickRecord();

  const timeSlices = getTimeSlices();

  return (
    <Container>
      <ListInputContainer>
        <ListInput value={startTime} onChange={onChangeStartTime}>
          {timeSlices.map((option, index) => (
            <Option key={index} value={option}>
              {option}
            </Option>
          ))}
        </ListInput>
      </ListInputContainer>
      <Tilde>~</Tilde>

      <ListInputContainer>
        <ListInput value={endTime} onChange={onChangeEndTime}>
          {timeSlices.map((option, index) => (
            <Option key={index} value={option}>
              {option}
            </Option>
          ))}
        </ListInput>
      </ListInputContainer>
      <RecordButton onClick={onClickRecord}>기록</RecordButton>
    </Container>
  );
};

export default TimeRangeRecord;
