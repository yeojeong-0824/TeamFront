import { FaCircleArrowDown } from "react-icons/fa6";
import fromUnixTime from "@/util/fromUnixTime";
import formatStartTime from "@/util/formatStartTime";
import formatTravelTime from "@/util/formatTravelTime";

interface LocationInfo {
  address: string;
  id: number;
  memo: string;
  place: string;
  plannerId: number;
  travelTime: number;
  unixTime: number;
  transportation: string;
  transportationNote: string;
  phoneNumber: string;
}

export default function LocationItems({
  locationItems,
}: {
  locationItems: any;
}) {
  return (
    <div className="space-y-5">
      {locationItems?.map((location: LocationInfo) => {
        const dateTime = fromUnixTime(location.unixTime);

        return (
          <div key={location.id}>
            <div className="flex gap-2 justify-center items-center mb-4">
              <FaCircleArrowDown className="text-3xl text-green-500" />
              <p className="text-orange-700">
                {formatTravelTime(location.travelTime)}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg space-y-2 shadow-md">
              <h2 className="font-semibold text-lg text-gray-700">
                {dateTime.year}년 {dateTime.month}월 {dateTime.day}일
              </h2>
              <p className="text-gray-700">
                {formatStartTime(dateTime.hour, dateTime.minute)}부터
              </p>
              <div className="flex gap-1 text-sm">
                <p>도착지 주소:</p>
                <p className="text-gray-500">{location.place},</p>
                <p className="text-gray-500">{location.address}</p>
              </div>
              <div className="text-sm space-y-2 text-gray-900">
                <p>
                  교통수단:{" "}
                  <span className="text-gray-500">
                    {location.transportation}
                  </span>
                </p>
                <p>
                  교통수단 메모:{" "}
                  <span className="text-gray-500">
                    {location.transportationNote}
                  </span>
                </p>
                <p>{location.phoneNumber}</p>
                <p>
                  메모: <span className="text-gray-500">{location.memo}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
