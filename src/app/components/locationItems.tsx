import { FaCircleArrowDown } from "react-icons/fa6";
import fromUnixTime from "@/util/fromUnixTime";
import formatStartTime from "@/util/formatStartTime";
import formatTravelTime from "@/util/formatTravelTime";

export default function LocationItems({
  locationItems,
}: {
  locationItems: any;
}) {
  return (
    <div className="space-y-5">
      {locationItems?.map((locationItem: any) => {
        const dateTime = fromUnixTime(locationItem.unixTime);

        return (
          <div
            key={locationItem.id}
            className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md"
          >
            <h2 className="font-semibold text-lg text-gray-700">
              {dateTime.year}년 {dateTime.month}월 {dateTime.day}일
            </h2>
            <p className="text-gray-700">
              {formatStartTime(dateTime.hour, dateTime.minute)}
            </p>
            <p className="text-sm text-gray-500">{locationItem.place}</p>
            <p className="text-sm text-gray-500">{locationItem.address}</p>

            <div className="flex gap-2 justify-center items-center">
              <FaCircleArrowDown className="text-3xl text-green-500" />
              <p className="text-orange-700">
                {formatTravelTime(locationItem.travelTime)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
