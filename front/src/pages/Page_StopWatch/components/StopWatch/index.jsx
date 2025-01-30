import React from "react";
import { Title, TimeDisplay, Label, Button, ButtonContainer } from "./styles";
import useStopWatch from "@pages/Page_StopWatch/hooks/useStopWatch";

const StopWatch = ({ timeTypeId }) => {
  const {
    hours,
    minutes,
    seconds,
    isRunning,
    onClickStart,
    onClickPause,
    onClickReset,
  } = useStopWatch(timeTypeId);

  return (
    <>
      <Title>Timer</Title>
      <TimeDisplay>
        <Label>Hours</Label>
        <Label>Minutes</Label>
        <Label>Seconds</Label>
        <br />
        <span>{hours.toString().padStart(2, "0")}:</span>
        <span>{minutes.toString().padStart(2, "0")}:</span>
        <span>{seconds.toString().padStart(2, "0")}</span>
      </TimeDisplay>
      <ButtonContainer>
        <Button onClick={isRunning ? onClickPause : onClickStart}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={onClickReset}>Reset</Button>
      </ButtonContainer>
    </>
  );
};

export default StopWatch;
