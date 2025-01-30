const getTimeSlices = () => {
  const hours = 24;
  const minutesPerSlice = 10;
  const slicesPerHour = 60 / minutesPerSlice;

  const slices = [];
  for (let i = 0; i < hours * slicesPerHour; i++) {
    const hour = Math.floor(i / slicesPerHour);
    const minute = (i % slicesPerHour) * minutesPerSlice;
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    slices.push(formattedTime);
  }
  return slices;
};

export default getTimeSlices;
