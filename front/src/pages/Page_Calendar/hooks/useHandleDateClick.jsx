const useHandleDateClick = (callback) => {
  const handleDateClick = (year, month, day) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let mode = "isWatchMode";
    if (date.getTime() === today.getTime()) {
      mode = "isEditMode";
    }

    if (callback) {
      callback(date, mode);
    }
  };

  return handleDateClick;
};

export default useHandleDateClick;
