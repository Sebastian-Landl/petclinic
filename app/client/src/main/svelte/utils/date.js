/**
 * Formats the given number object.
 * Returns a string with leading zero.
 *
 * @param {Number} n
 * @returns number string
 */
export function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}

/**
 * Formats the given date objects.
 * Returns a string with format "YYYY-mm-dd".
 *
 * @param {Date} date
 * @returns date string
 */
export function formatDate(date) {
  return (
    date.getFullYear() +
    "-" +
    appendLeadingZeroes(date.getMonth() + 1) +
    "-" +
    appendLeadingZeroes(date.getDate())
  );
}

/**
 * Formats the given date objects.
 * Returns a string with format "HH:mm".
 *
 * @param {Date} date
 * @returns time string
 */
export function formatTime(date) {
  return (
    appendLeadingZeroes(date.getHours()) +
    ":" +
    appendLeadingZeroes(date.getMinutes())
  );
}

/**
 * Formats the given date objects.
 * Returns the short form.
 *
 * @param {Date} date
 * @returns weekday string
 */
export function formatWeekday(date) {
  switch (date.getDay()) {
    case 0:
      return "SO";
    case 1:
      return "MO";
    case 2:
      return "DI";
    case 3:
      return "MI";
    case 4:
      return "DO";
    case 5:
      return "FR";
    case 6:
      return "SA";
  }
  throw new Error("unkown weekday");
}

/**
 * Ensures a time string is in the format "HH:mm" without seconds in 24-hour format.
 * If the input has seconds (HH:mm:ss), they will be removed.
 * If the input is in 12-hour format (with AM/PM), it will be converted to 24-hour format.
 *
 * @param {string} timeString - Time string to format
 * @returns {string} Time string in HH:mm 24-hour format
 */
export function formatTimeString(timeString) {
  if (!timeString) return "";

  // If the time string contains seconds (HH:mm:ss), remove them
  if (timeString.split(":").length > 2) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  }

  // If the time string contains AM/PM, convert to 24-hour format
  if (timeString.toLowerCase().includes("am") || timeString.toLowerCase().includes("pm")) {
    const [timePart, period] = timeString.split(/\s+/);
    let [hours, minutes] = timePart.split(":");
    hours = parseInt(hours, 10);

    if (period.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  return timeString;
}

/**
 * Calculates the duration between two time strings in the format "HH:MM".
 * Returns a string with format "Xh Ym" or "Ym" if hours is 0.
 *
 * @param {string} startTime - Start time in format "HH:MM"
 * @param {string} endTime - End time in format "HH:MM"
 * @returns {string} Duration string
 */
export function calculateDuration(startTime, endTime) {
  if (!startTime || !endTime) return "";

  // Ensure times are in HH:mm format
  startTime = formatTimeString(startTime);
  endTime = formatTimeString(endTime);

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  let durationMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

  // Handle case where end time is on the next day
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60;
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
}
