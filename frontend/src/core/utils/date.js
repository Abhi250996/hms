// src/core/utils/date.js
import dayjs from "dayjs";

export const formatDate = (date, format = "DD MMM YYYY") => {
  if (!date) return "-";
  return dayjs(date).format(format);
};

export const formatDateTime = (date, format = "DD MMM YYYY, hh:mm A") => {
  if (!date) return "-";
  return dayjs(date).format(format);
};

export const today = () => {
  return dayjs().format("YYYY-MM-DD");
};

export const daysBetween = (start, end) => {
  if (!start || !end) return 0;
  return dayjs(end).diff(dayjs(start), "day");
};
