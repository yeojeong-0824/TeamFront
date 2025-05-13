export default function formatStartTime(hour: number, minute: number) {
  const hourString = hour < 10 ? `0${hour}` : `${hour}`;
  const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
  return `${hourString}:${minuteString}`;
}
