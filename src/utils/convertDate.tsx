const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const convertDate = (day: string, date = new Date()) => {
  const dayOfWeek = daysOfTheWeek.indexOf(day);
  date.setDate(date.getDate() + ((dayOfWeek + 7 - date.getDay()) % 7));
  return date.toISOString();
};
