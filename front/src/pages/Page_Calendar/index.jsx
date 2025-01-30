import React from "react";

import Calendar from "./components/Calendar";
import MonthlyPieChart from "./components/MonthlyPieChart";
import { Section, ChartTitle } from "./styles";

const Page_Calendar = () => {
  return (
    <div>
      <Section>
        <ChartTitle> Calendar </ChartTitle>
        <Calendar />
      </Section>

      <Section>
        <ChartTitle> MonthlyChart </ChartTitle>
        <MonthlyPieChart />
      </Section>
    </div>
  );
};

export default Page_Calendar;
