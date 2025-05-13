interface UnixTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export default function toUnixTime(time: UnixTime) {
  const { year, month, day, hour, minute } = time;
  const date = new Date(year, month - 1, day, hour, minute);
  return Math.floor(date.getTime() / 1000);
}
