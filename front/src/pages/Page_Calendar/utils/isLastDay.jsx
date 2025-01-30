const isLastDay = (day, currentYear, currentMonth) => {
  if (!day) {
    return false;
  }

  const curDate = new Date();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth();
  const curDay = curDate.getDate();

  if (curYear > currentYear) {
    return true;
  } else if (currentYear < currentYear) {
    return false;
  }

  if (curMonth > currentMonth) {
    return true;
  } else if (curMonth < currentMonth) {
    return false;
  }

  if (curDay > day) {
    return true;
  }
  return false;
};

export default isLastDay;
