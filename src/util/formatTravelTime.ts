export default function formatTravelTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes}분`;
  }
  return `${hours}시간 ${minutes}분`;
}