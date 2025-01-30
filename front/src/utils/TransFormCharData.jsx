const typeTimeSummary = ({ schedule }) => {
  const minutesPerSlice = 10;

  if (schedule && Object.keys(schedule).length > 0) {
    const summary = {};
    const totalTime = Object.values(schedule).reduce(
      (sum, type) => sum + (type ? minutesPerSlice : 0),
      0
    );

    Object.values(schedule).forEach((type) => {
      if (type) {
        if (!summary[type.name] || typeof summary[type.name] === "number") {
          summary[type.name] = {
            value: 0, // minutesPerSlice를 더하는것은 유지
            color: type.color,
          };
        }
        summary[type.name].value += minutesPerSlice;
      }
    });

    const data = Object.keys(summary).map((name) => ({
      name,
      value: summary[name].value,
      percentage:
        totalTime > 0
          ? ((summary[name].value / totalTime) * 100).toFixed(1)
          : 0,
      color: summary[name].color,
    }));

    return { summary, data };
  }
  return null;
};

export default typeTimeSummary;
