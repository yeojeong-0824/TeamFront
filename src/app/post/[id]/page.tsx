"use client";

import { ParamsId } from "@/types/post";
import usePost from "@/hooks/usePost";
import useDeletePost from "@/hooks/useDeletePost";
import Comment from "@/app/components/Comment";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/Loading";
import ErrorShow from "@/app/components/Error";
import { IoEyeOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { PiNotePencilThin } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import KakaoShare from "@/app/components/KakaoShare";
import { CiLink } from "react-icons/ci";
import { useQueryClient } from "@tanstack/react-query";
import useGetUserInfo from "@/hooks/userHooks/useGetUserInfo";
import formatDate from "@/util/formatDate";
import useGetPlanner from "@/hooks/calender/useGetPlanner";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import fromUnixTime from "@/util/fromUnixTime";
import formatTravelTime from "@/util/formatTravelTime";
import { FaCircleArrowDown } from "react-icons/fa6";
import formatStartTime from "@/util/formatStartTime";
import useRefetchComments from "@/hooks/useRefetchComments";
import Image from "next/image";
import PostBody from "@/app/components/PostBody";

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
  images: string[];
}

const Post = ({ params }: { params: ParamsId }) => {
  const { id } = params;
  const { data, isLoading, isError, error, isSuccess } = usePost(id);
  const { mutate: deletePostMutate } = useDeletePost();
  const router = useRouter();
  const [postOptionVisible, setPostOptionVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const { data: plannerData, isLoading: plannerIsLoading } = useGetPlanner(
    data?.planner,
    !!data?.planner
  );
  const { data: refetchComments } = useRefetchComments(id.toString());
  const [calendarView, setCalendarView] = useState<boolean>(false);

  const cacheData = queryClient.getQueryData(["accessCheck"]);
  const { data: userInfoData, isLoading: userInfoIsLoading } = useGetUserInfo();
  const userCheck = data?.member?.nickname === userInfoData?.nickname;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setPostOptionVisible(false);
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["post", id],
    });

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThreeDots = () => setPostOptionVisible((prev) => !prev);

  const handleUpdate = () => {
    queryClient.refetchQueries({ queryKey: ["accessCheck"] });
    if (!cacheData) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
      router.push(`/login`);
      return;
    }
    router.push(`/update/${id}`);
  };

  const handlePostDelete = () => {
    queryClient.refetchQueries({ queryKey: ["accessCheck"] });
    if (!cacheData) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
      router.push(`/login`);
      return;
    }
    deletePostMutate(id);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      text: "링크가 클립보드에 복사되었습니다",
      showConfirmButton: false,
      timer: 1000,
    });
    setPostOptionVisible(false);
  };

  return (
    <div className="min-h-[1300px] sm:my-12 p-1 sm:p-2">
      <LoadingSpinner size={15} mt={400} isLoading={isLoading} />
      {isError && <ErrorShow error={error?.message} />}
      {isSuccess && (
        <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto mt-24 p-3 text-gray-900">
          <h1 className="text-2xl sm:text-4xl leading-10">{data?.title}</h1>
          <div className="flex justify-end">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <p className="text-sm text-gray-400">
                {userInfoData?.nickname === data?.member?.nickname &&
                  "내가 작성한 글"}
              </p>
              <h3 className="font-medium">{data?.member?.nickname}</h3>
              <h3>{formatDate(data?.time?.createTime)}</h3>
              <h3 className="text-sm">
                <IoEyeOutline className="inline mr-[1.5px] mb-[1.5px] text-lg" />
                {data?.view}
              </h3>
              <div className="flex justify-end relative gap-1 text-sm">
                <button
                  ref={buttonRef}
                  onClick={handleThreeDots}
                  className="text-2xl"
                >
                  <BsThreeDots className="text-sm sm:text-2xl" />
                </button>
                {postOptionVisible && (
                  <div
                    className="flex flex-col absolute w-[90px] sm:w-[120px] gap-1 p-1 sm:p-3 top-6 border bg-white z-10 rounded-md shadow-md"
                    id="post-option-menu"
                    ref={menuRef}
                  >
                    <button
                      className={`flex items-center gap-1 p-1 hover:text-blue-300 text-xs sm:text-medium ${
                        userCheck ? "block" : "hidden"
                      }`}
                      onClick={handleUpdate}
                    >
                      <PiNotePencilThin className="inline text-lg sm:text-xl" />
                      수정하기
                    </button>
                    <button
                      className={`flex items-center gap-1 p-1 hover:text-red-300 text-xs sm:text-medium ${
                        userCheck ? "block" : "hidden"
                      }`}
                      onClick={handlePostDelete}
                    >
                      <CiTrash className="inline text-lg sm:text-xl" />
                      삭제하기
                    </button>
                    <button
                      className="flex items-center gap-1 p-1 text-xs sm:text-medium hover:text-gray-400"
                      onClick={handleShareLink}
                    >
                      <CiLink className="inline text-lg sm:text-xl" />
                      링크복사
                    </button>
                    <KakaoShare
                      postTitle={data?.title}
                      setPostOptionVisible={setPostOptionVisible}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="min-h-[600px] border-b-2">
            <h2 className="flex-grow mt-5 py-3 leading-relaxed">
              <div className="flex flex-col gap-3 mb-3">
                {data?.images?.map((image: string, index: number) => (
                  <div key={index} className="relative w-full min-h-[300px]">
                    <Image
                      src={
                        `${process.env.NEXT_PUBLIC_API_URL}files/${image}` as string
                      }
                      alt="image"
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              <PostBody content={data?.body} />
            </h2>
          </div>
          <h2
            className={`text-lg sm:text-xl font-semibold ${
              data?.planner ? "block" : "hidden"
            }`}
          >
            등록된 플랜
          </h2>
          {!plannerIsLoading ? (
            <div className={`border-b p-2 ${plannerData ? "block" : "hidden"}`}>
              {" "}
              <div className="space-y-2 mb-3">
                <h1 className="text-lg font-semibold text-gray-800">
                  {plannerData?.title}
                </h1>
                <h2 className="text-gray-500">{plannerData?.subTitle}</h2>
                <p className="text-sm text-green-500">
                  {plannerData?.personnel}명
                </p>
              </div>
              {plannerData?.locationCount !== 0 ? (
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="text-blue-500 font-semibold">
                      {plannerData?.locationCount}
                    </span>
                    개의 일정이 있습니다.
                  </p>
                  <button
                    onClick={() => setCalendarView((prev) => !prev)}
                    type="button"
                  >
                    {calendarView ? (
                      <div className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
                        <span className="text-sm">일정 접기</span>
                        <FaAngleDoubleUp className="text-lg" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
                        <span className="text-sm">일정 펼쳐보기</span>
                        <FaAngleDoubleDown className="text-lg" />
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <p className="text-sm text-gray-500">
                    등록된 일정이 없습니다.
                  </p>
                </div>
              )}
              {calendarView && (
                <div className="space-y-5">
                  {plannerData?.location.map(
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

          {data?.formattedAddress && (
            <div className="flex flex-col gap-1 py-8 border-b-1 text-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold">위치 정보</h2>
              <h3 className="text-sm sm:text-medium">
                {data?.formattedAddress}
              </h3>
              <h3 className="text-xs sm:text-sm text-gray-400">
                {data?.locationName}
              </h3>
            </div>
          )}
          <div>
            {refetchComments?.avgScore ? (
              <p className="text-lg sm:text-xl font-semibold text-yellow-500">
                해당 게시글의 별점은 {refetchComments?.avgScore / 100}점입니다.
              </p>
            ) : null}
          </div>
        </div>
      )}
      {isSuccess && (
        <Comment id={id.toString()} loginNickname={userInfoData?.nickname} />
      )}
    </div>
  );
};

export default Post;
