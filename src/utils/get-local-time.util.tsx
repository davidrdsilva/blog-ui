export const convertUTCToLocalTime = (utcDateTime: string): string => {
  const date = new Date(utcDateTime);
  return date.toLocaleString();
};
