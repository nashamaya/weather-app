export const getLocalTime = (timezoneOffset) => {
  const utcDate = new Date();
  const utcTime = utcDate.getTime() + utcDate.getTimezoneOffset() * 60000; // Get UTC time in milliseconds
  const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust with the offset provided by the API

  // Format the time correctly considering Daylight Saving Time and the correct timezone
  return localTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
