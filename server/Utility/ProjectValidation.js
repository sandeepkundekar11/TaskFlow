export function isValidProjectDuration(startTime, endTime, days) {
    // Convert startTime and endTime to Date objects
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // Calculate the time difference in milliseconds
    const timeDifference = endDate - startDate;

    // Convert the time difference to days
    const differenceInDays = timeDifference / (1000 * 60 * 60 * 24);

    // Check if the difference is at least 10 days
    return differenceInDays >= days;
}
