import { FaCircleArrowDown } from "react-icons/fa6";

export default function LocationItems({
  locationItems,
}: {
  locationItems: any;
}) {
  const startTimeFormat = (hour: number, minute: number) => {
    const hourString = hour < 10 ? `0${hour}` : `${hour}`;
    const minuteString = minute < 10 ? `0${minute}` : `${minute}`;
    return `${hourString}:${minuteString}`;
  };

  const travelTimeFormat = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) {
      return `${minutes}분`;
    }
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <div className="space-y-5">
      {locationItems?.map((locationItem: any) => (
        <>
          <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
            <h2 className="font-semibold text-lg"></h2>
            <p className="text-gray-700">
              {locationItem.year}-{locationItem.month}-{locationItem.day}
            </p>
            <p className="text-gray-700">
              {startTimeFormat(locationItem.hour, locationItem.minute)}
            </p>
            <p className="text-sm text-gray-500">{locationItem.place}</p>
            <p className="text-sm text-gray-500">{locationItem.address}</p>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <FaCircleArrowDown className="text-3xl text-green-500" />
            <p className="text-orange-700">
              {travelTimeFormat(locationItem.travelTime)}
            </p>
          </div>
        </>
      ))}
    </div>
  );
}
