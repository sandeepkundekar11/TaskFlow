const TimeUtililty = () => {
  const updateTime = (time) => {
    let newTime = new Date(time).getTime(); // Convert input time to UTC timestamp (ms)
    let currentTime = new Date().getTime(); // Get current UTC timestamp (ms)
    let diff = Math.floor((currentTime - newTime) / 60000); // Difference in minutes

    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;

    let hours = Math.floor(diff / 60);
    if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;

    let days = Math.floor(hours / 24);
    if (days < 7) return days === 1 ? "1 day ago" : `${days} days ago`;

    let weeks = Math.floor(days / 7);
    if (weeks < 4) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;

    let newDate = new Date(time);
    let currentDate = new Date();

    let monthsDiff = (currentDate.getUTCFullYear() - newDate.getUTCFullYear()) * 12 +
      (currentDate.getUTCMonth() - newDate.getUTCMonth());
    if (monthsDiff < 12) return monthsDiff === 1 ? "1 month ago" : `${monthsDiff} months ago`;

    let yearsDiff = currentDate.getUTCFullYear() - newDate.getUTCFullYear();
    return yearsDiff === 1 ? "1 year ago" : `${yearsDiff} years ago`;
  };


  return {
    updateTime,
  };
};
export default TimeUtililty;
