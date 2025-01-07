"use client";

import useWritePost from "@/hooks/useWritePost";
import { WriteUpdateType } from "@/types/board";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PlaceSearch from "../components/PlaceSearch";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/Loading";
import ErrorShow from "../components/Error";
import "react-quill/dist/quill.snow.css";
import QuillEditor from "../components/Quill";
import Swal from "sweetalert2";
import { SetLocalData } from "@/types/write";
import { Button } from "@nextui-org/react";
import useGetPlanner from "@/hooks/calender/useGetPlanner";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import fromUnixTime from "@/util/fromUnixTime";
import formatTravelTime from "@/util/formatTravelTime";
import formatStartTime from "@/util/formatStartTime";
import { FaCircleArrowDown } from "react-icons/fa6";
import PostModal from "../components/PostModal";

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

const Write = () => {
  const { register, handleSubmit } = useForm<WriteUpdateType>();
  const writeMutation = useWritePost();
  const [location, setLocation] = useState<string>("");
  const [formattedAddress, setFormattedAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [html, setHtml] = useState<string>("");
  const router = useRouter();
  const localStoragePlannerId =
    typeof window !== "undefined" ? localStorage.getItem("plannerId") : null;
  const [plannerId, setPlannerId] = useState<string>("");
  const { data, isLoading } = useGetPlanner(plannerId, !!plannerId);
  const [calendarView, setCalendarView] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 모달 켜졌을 때 배경 스크롤 막기
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.touchAction = "auto";
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  useEffect(() => {
    if (localStoragePlannerId) {
      setPlannerId(localStoragePlannerId);
    }

    return () => {
      localStorage.removeItem("plannerId");
    };
  }, []);

  const setLocalData: SetLocalData = {
    setLocation,
    setFormattedAddress,
    setLatitude,
    setLongitude,
  };

  const onSubmitForm = (title: WriteUpdateType) => {
    if (title.title === "" || html === "" || formattedAddress === "") {
      Swal.fire({
        icon: "error",
        title: "제목/본문을 입력하고, 지역을 선택해주세요.",
      });
      return;
    }
    const locationData = {
      title: title.title,
      body: html,
      locationName: location,
      formattedAddress,
      latitude,
      longitude,
      plannerId: data?.id,
    };
    writeMutation.mutate(locationData);
  };

  const handleCancel = () => router.back();

  const btnStyle =
    "p-1 px-3 sm:p-2 sm:px-6 border text-gray-900 hover:bg-gray-100 rounded-lg text-sm sm:text-base";
  return (
    <>
      <div className="min-h-[1100px] sm:my-12 p-2 text-gray-900">
        {writeMutation.isError && (
          <ErrorShow error={writeMutation.error.message} />
        )}
        <form
          className="flex flex-col max-w-[800px] gap-8 mx-auto mt-24 p-3"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
              당신의 <span className="text-[#3D6592]">여정</span>을 기록해보세요
            </h1>
            <p className="text-xs sm:text-medium ml-1 text-gray-400">
              <span className="text-[#3D6592]">여정</span>과 함께 소중한 여행의
              기록들을 나눠보는건 어떨까요?
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="local-search" className="text-sm sm:text-medium">
              지역
            </label>
            <PlaceSearch setLocalData={setLocalData} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm sm:text-medium">
              제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              className="p-1.5 sm:p-2 border rounded-md text-sm md:text-base"
              {...register("title")}
            />
          </div>

          {plannerId || data ? (
            <div className="border p-2 rounded-md">
              {" "}
              <div className="space-y-2 mb-3">
                <h1 className="text-xl font-semibold text-gray-800">
                  {data?.title}
                </h1>
                <h2 className="text-lg text-gray-500">{data?.subTitle}</h2>
                <p className="text-green-500">{data?.personnel}명</p>
              </div>
              {data?.locationCount !== 0 ? (
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="text-blue-500 font-semibold">
                      {data?.locationCount}
                    </span>
                    개의 장소가 있습니다.
                  </p>
                  <button
                    onClick={() => setCalendarView((prev) => !prev)}
                    type="button"
                  >
                    {calendarView ? (
                      <div className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
                        <span className="text-sm">장소 접기</span>
                        <FaAngleDoubleUp className="text-lg" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
                        <span className="text-sm">장소 펼쳐보기</span>
                        <FaAngleDoubleDown className="text-lg" />
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <p className="text-sm text-gray-500">
                    등록된 장소가 없습니다.
                  </p>
                </div>
              )}
              {calendarView && (
                <div className="space-y-5">
                  {data?.location.map(
                    (location: LocationInfo, index: number) => {
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
                              {dateTime.year}년 {dateTime.month}월{" "}
                              {dateTime.day}일
                            </h2>
                            <p className="text-gray-700">
                              {formatStartTime(dateTime.hour, dateTime.minute)}
                              부터
                            </p>
                            <div className="flex gap-1 text-sm">
                              <p>도착지 주소:</p>
                              <p className="text-gray-500">{location.place},</p>
                              <p className="text-gray-500">
                                {location.address}
                              </p>
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
                                메모:{" "}
                                <span className="text-gray-500">
                                  {location.memo}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          ) : isLoading ? (
            <LoadingSpinner isLoading={isLoading} size={15} />
          ) : null}

          <div className="flex justify-end">
            <button
              className={`${btnStyle} bg-green-500 text-white hover:bg-green-600`}
              type="button"
              onClick={() => setShowModal(true)}
            >
              플래너 목록에서 선택
            </button>
          </div>
          {showModal && (
            <PostModal
              setShowModal={setShowModal}
              setPlannerId={setPlannerId}
            />
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="text-sm sm:text-medium">
              본문
            </label>
            <QuillEditor html={html} setHtml={setHtml} />
          </div>
          <div className="flex justify-end gap-3">
            <button
              className={`${btnStyle} text-gray-900 hover:bg-gray-100`}
              type="button"
              onClick={handleCancel}
            >
              취소
            </button>
            <Button
              className={`${btnStyle} bg-[#6EB4FB] hover:bg-blue-500 text-white`}
              type="submit"
              isLoading={writeMutation.isPending}
            >
              등록
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Write;
