// Add commas to number
export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Make date string more readable
export const formatDateString = (
  date: string,
  monthType: "short" | "long" = "long"
) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: monthType });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
};
