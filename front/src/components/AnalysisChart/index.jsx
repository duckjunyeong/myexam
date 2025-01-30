import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  DataList,
  DataItem,
} from "@components/AnalysisChart/styles";

const AnalysisChart = ({ chartData }) => {
  return (
    <ChartContainer>
      <div style={{ height: "300px", width: "500px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percentage }) => `${name} (${percentage}%)`}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <DataList>
        {chartData?.map((entry) => (
          <DataItem key={entry.name} color={entry.color}>
            <span>{entry.name}: </span> {Math.floor(entry.value / 60)}시간{" "}
            {entry.value % 60}분
          </DataItem>
        ))}
      </DataList>
    </ChartContainer>
  );
};

export default AnalysisChart;
