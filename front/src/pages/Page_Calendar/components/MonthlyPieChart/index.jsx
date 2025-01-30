import AnalysisChart from "@components/AnalysisChart";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useGetMonthlyData from "@hooks/GetData/calendar/useGetMonthlyData";

const MonthlyPieChart = () => {
  const { year, month } = useSelector((state) => state.curDate);
  const { data: monthlyData } = useGetMonthlyData(year, month);

  const transformData = useMemo(() => {
    const result = { value: 0, data: {} };

    monthlyData?.map((item) => {
      result.value += 10;
      if (item && item.TimeType) {
        const timeTypeName = item.TimeType.name;
        const timeTypeColor = item.TimeType.color;
        const categoryName = item.TimeType.TimeTypeCategory?.name;
        const categoryColor = item.TimeType.TimeTypeCategory?.color;

        if (!result.data[categoryName]) {
          result.data[categoryName] = {
            value: 0,
            color: categoryColor,
            timeType: {},
          };
        }
        result.data[categoryName].value += 10;

        if (categoryName) {
          if (!result.data[categoryName].timeType[timeTypeName]) {
            result.data[categoryName].timeType[timeTypeName] = {
              value: 0,
              color: timeTypeColor,
            };
          }
          result.data[categoryName].timeType[timeTypeName].value += 10;
        }
      }
    });

    const chartResult = [];
    Object.keys(result.data).forEach((key, idx) => {
      const percentage =
        result.value > 0
          ? ((result.data[key].value / result.value) * 100).toFixed(1)
          : 0;

      const data = { name: key, percentage: percentage, ...result.data[key] };
      chartResult.push(data);
    });

    return chartResult;
  }, [monthlyData]);
  return <AnalysisChart chartData={transformData} />;
};

export default MonthlyPieChart;
