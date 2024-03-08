// Function to create a Date object according to a specific timezone
const createDateInTimezone = (timezone) => {
  const now = new Date();
  const options = { timeZone: timezone };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const dateString = formatter.format(now);
  return new Date(dateString);
};

export default createDateInTimezone;
