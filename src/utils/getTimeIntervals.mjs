import { format, addMinutes, parse, isWeekend, addDays } from "date-fns";

// Function to generate time slots from 8:00 AM to 11:00 PM with 30-minute intervals
const generateTimeSlots = (timezone, dateString) => {
  const date = parse(dateString, "yyyy-MM-dd", new Date());
  const startTime = new Date(date);
  startTime.setHours(8, 0, 0); // Set start time to 8:00 AM
  const endTime = new Date(date);
  endTime.setHours(23, 0, 0); // Set end time to 11:00 PM

  // Generate time slots with 30-minute intervals
  const timeSlots = [];
  let currentTime = startTime;
  while (currentTime <= endTime) {
    if (!isWeekend(currentTime)) {
      const formattedTime = format(currentTime, "h:mm aa", {
        timeZone: timezone,
      });
      timeSlots.push(formattedTime);
    } else {
      timeSlots.push("Weekend");
      currentTime = addDays(currentTime, 1);
    }
    currentTime = addMinutes(currentTime, 30); // Add 30 minutes
  }

  return timeSlots;
};

export default generateTimeSlots;
