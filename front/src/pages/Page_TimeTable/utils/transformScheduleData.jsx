const transformScheduleData = (schedule) => {
  console.log(schedule);
  let totalValue = 0;
  const result = {};
  Object.values(schedule).forEach((data) => {
    if (!result[data.name]) {
      result[data.name] = {
        name: data.name,
        color: data.color,
        value: 0,
      };
    }
    result[data.name].value += 10;
    totalValue += 10;
  });

  const chartData = [];
  Object.keys(result).forEach((key) => {
    const percentage =
      totalValue > 0 ? ((result[key].value / totalValue) * 100).toFixed(1) : 0;
    const data = { percentage: percentage, ...result[key] };
    chartData.push(data);
  });

  return chartData;
};

export default transformScheduleData;
