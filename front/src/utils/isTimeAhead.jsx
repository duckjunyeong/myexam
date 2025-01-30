const isTimeAhead = (time) => {
  const splitedTime = time.split(":");
  const hour = parseInt(splitedTime[0]);
  const minute = parseInt(splitedTime[1]);

  const date = new Date();
  const currentHour = date.getHours();
  const currentMinutes = date.getMinutes();

  if (
    hour > currentHour ||
    (hour === currentHour && minute >= currentMinutes)
  ) {
    return true;
  }
  return false;
};

export default isTimeAhead;
