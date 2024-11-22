import { addMinutes, format } from "date-fns";

export default function getCurrentTimePlus30Minutes(date) {
  return format(addMinutes(date, 30), "HH:mm"); // 24-hour format
}
