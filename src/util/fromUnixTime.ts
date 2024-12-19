export default function fromUnixTime(unixTime: number) {
  const date = new Date(unixTime * 1000);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
}
