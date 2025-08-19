import dayjs from "dayjs";

export default function formatDate(dateString, format = "DD MMMM YYYY") {
  if (!dateString) return "";
  const date = dayjs(dateString);
  if (!date.isValid()) return dateString;
  return date.format(format);
}
