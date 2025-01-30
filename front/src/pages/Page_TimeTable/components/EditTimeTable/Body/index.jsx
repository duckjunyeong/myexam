import TableChart from "./Chart";
import TypeSelector from "./TypeSelector";
import { ChartContainer, ChartTitle } from "../styles";

import TimeRange from "./TimeRange";
import TypeAdder from "./TypeAdder";
const EditTimeTableChart = () => {
  return (
    <ChartContainer>
      <ChartTitle>Today Time Record</ChartTitle>

      <TypeAdder />
      <TypeSelector />

      <TimeRange />
      <TableChart />
    </ChartContainer>
  );
};

export default EditTimeTableChart;
