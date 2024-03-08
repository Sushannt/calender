import { parse, compareAsc } from "date-fns";

// Function to compare times in "h:mm aa" format
const compareTimes = (time1, time2) => {
  const parsedTime1 = parse(time1, "h:mm aa", new Date());
  const parsedTime2 = parse(time2, "h:mm aa", new Date());

  return compareAsc(parsedTime1, parsedTime2);
};

// // Example usage
// const time1 = "10:00 AM";
// const time2 = "11:30 AM";

// console.log(compareTimes(time1, time2));

export default compareTimes;
