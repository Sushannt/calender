import { startOfWeek, endOfWeek, format, eachDayOfInterval } from "date-fns";

const getCurrentWeek = (currentDate) => {
  // Get the start and end of the current week
  const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 1 }); // Sunday

  // Get all the dates from start to end of the week
  const weekDates = eachDayOfInterval({
    start: startOfWeekDate,
    end: endOfWeekDate,
  });

  // Format the dates
  const formattedWeekDates = weekDates.map((date) =>
    format(date, "yyyy-MM-dd")
  );

  return formattedWeekDates;
};

export default getCurrentWeek;
