export const dateFormatter = (date: string) => {
  const lastNumber = date;
  if (lastNumber === "1") {
    return `${date}st`;
  } else if (lastNumber === "2") {
    return `${date}nd`;
  } else if (lastNumber === "3") {
    return `${date}rd`;
  } else {
    return `${date}th`;
  }
};
