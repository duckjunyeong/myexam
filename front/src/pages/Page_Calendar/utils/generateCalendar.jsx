const generateCalendar = (currentYear, currentMonth) => {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const weeks = Math.ceil((firstDay + daysInMonth) / 7);

  let day = 1;
  let calendar = [];

  for (let i = 0; i < weeks; i++) {
    let week = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day++);
      }
    }
    calendar.push(week);
  }

  return calendar;
};

export default generateCalendar;
