"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ParamsId } from "@/types/post";
import { WriteUpdateType } from "@/types/board";
import usePost from "@/hooks/usePost";
import useUpdatePost from "@/hooks/useUpdatePost";
import PlaceSearch from "@/app/components/PlaceSearch";
import LoadingSpinner from "@/app/components/Loading";
import ErrorShow from "@/app/components/Error";
import QuillEditor from "@/app/components/Quill";
import { Button } from "@nextui-org/react";
import PostModal from "@/app/components/PostModal";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import fromUnixTime from "@/util/fromUnixTime";
import { FaCircleArrowDown } from "react-icons/fa6";
import formatTravelTime from "@/util/formatTravelTime";
import formatStartTime from "@/util/formatStartTime";
import useGetPlanner from "@/hooks/calender/useGetPlanner";

type SetLocalData = {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setFormattedAddress: React.Dispatch<React.SetStateAction<string>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
};

type LocationInfo = {
  id: number;
  place: string;
  address: string;
  transportation: string;
  transportationNote: string;
  phoneNumber: string;
  memo: string;
  unixTime: number;
  travelTime: number;
};

const Update = ({ params }: { params: ParamsId }) => {
  const router = useRouter();
  const { id } = params;
  const { data, isLoading, isError, error } = usePost(id);
  const [location, setLocation] = useState<string>(data?.locationName || "");
  const [formattedAddress, setFormattedAddress] = useState<string>(
    data?.formattedAddress || ""
  );
  const [latitude, setLatitude] = useState<number>(data?.latitude || 0);
  const [longitude, setLongitude] = useState<number>(data?.longitude || 0);
  const updateMutation = useUpdatePost(id);
  const [html, setHtml] = useState<string>(data?.body || "");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [plannerId, setPlannerId] = useState<string>("");
  const { data: plannerData } = useGetPlanner(plannerId, !!plannerId);
  const [calendarView, setCalendarView] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { defaultValues },
  } = useForm<WriteUpdateType>({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    if (data?.planner) {
      setPlannerId(data.planner);
    }
  }, [data?.planner]);

  useEffect(() => {
    if (data?.body) {
      setHtml(data.body);
    }

    reset({
      title: data?.title,
      body: data?.body,
    });
  }, [data, reset]);

  const setLocalData: SetLocalData = {
    setLocation,
    setFormattedAddress,
    setLatitude,
    setLongitude,
  };

  const onSubmitForm = (formData: WriteUpdateType) => {
    if (
      formData.title === defaultValues?.title &&
      html === defaultValues?.body &&
      data.locationName === location &&
      data.planner === plannerId
    ) {
      Swal.fire({
        icon: "warning",
        title: "게시글에 변경사항이 없습니다",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    const postData = {
      title: formData.title,
      body: html,
      locationName: location,
      formattedAddress,
      latitude,
      longitude,
      plannerId: Number(plannerId),
    };
    console.log(postData);
    updateMutation.mutate(postData);
  };

  const handleCancel = () => router.back();

  const btnStyle =
    "p-1 px-3 sm:px-6 sm:p-2 border text-gray-900 rounded-lg text-sm sm:text-base";
  return (
    <div className="min-h-[1100px] sm:mt-10 p-2 text-gray-900">
      {isError ||
        (updateMutation?.isError && (
          <ErrorShow error={updateMutation?.error?.message} />
        ))}
      {isLoading ? (
        <LoadingSpinner size={15} mt={400} isLoading={true} />
      ) : (
        <form
          className="flex flex-col max-w-[800px] gap-8 mx-auto mt-24 p-3"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
              게시글 수정하기
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="local-search" className="text-sm sm:text-medium">
              지역
            </label>
            <PlaceSearch setLocalData={setLocalData} updateData={data} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm sm:text-medium">
              제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              className="p-2 border rounded-md text-sm sm:text-medium"
              {...register("title")}
            />
          </div>

          {plannerId || !isLoading ? (
            <div className="border p-2 rounded-md">
              {" "}
              <div className="space-y-2 mb-3">
                <h1 className="text-xl font-semibold text-gray-800">
                  {plannerData?.title}
                </h1>
                <h2 className="text-lg text-gray-500">
                  {plannerData?.subTitle}
                </h2>
                <p className="text-green-500">{plannerData?.personnel}명</p>
              </div>
              {plannerData?.locationCount !== 0 ? (
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="text-blue-500 font-semibold">
                      {plannerData?.locationCount}
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
                  {plannerData?.location?.map(
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
            <QuillEditor
              html={html}
              setHtml={setHtml}
              defaultBody={data?.body}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="p-1 px-3 sm:px-6 sm:p-2 border text-gray-900 hover:bg-gray-100 rounded-lg text-sm sm:text-base"
              type="button"
              onClick={handleCancel}
            >
              취소
            </button>
            <Button
              className="p-1 px-3 sm:px-6 sm:p-2 text-white bg-[#6EB4FB] hover:bg-blue-500 rounded-lg text-sm sm:text-base"
              type="submit"
              isLoading={updateMutation.isPending}
            >
              수정
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Update;
