const TimeUtililty = () => {
  const updateTime = (utcTime) => {
    let currentTime = new Date(utcTime); // The input UTC time

    // Convert UTC to IST by adding 5 hours and 30 minutes
    currentTime.setHours(currentTime.getHours() + 5);
    currentTime.setMinutes(currentTime.getMinutes() + 30);

    return currentTime.toLocaleString();
  };

  return {
    updateTime,
  };
};
export default TimeUtililty;
