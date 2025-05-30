"use client";

import useWritePost from "@/hooks/useWritePost";
import { WriteUpdateType } from "@/types/board";
import { useEffect, useRef, useState } from "react";
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
import useConfirmPageLeave from "@/util/useConfirmPageLeave";
import Image from "next/image";
import usePostImages from "@/hooks/usePostImages";
import { MdDeleteForever } from "react-icons/md";
import useDeleteImage from "@/hooks/useDeleteImage";
import useAccessCheck from "@/hooks/TokenHooks/useAccessCheck";

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

interface Image {
  url: string;
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
  const {
    data: cacheData,
    isLoading: accessIsLoading,
    refetch,
  } = useAccessCheck();
  const imageRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Image[]>([]);
  const { mutate: postImages, isPending: postImagesIsPending } =
    usePostImages();
  const { mutate: deleteImage, isPending: deleteImageIsPending } =
    useDeleteImage();

  useConfirmPageLeave();

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
    refetch();
    if (!cacheData && !accessIsLoading) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
      router.push(`/login`);
      return;
    }
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
    if (!cacheData) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
      router.push(`/login`);
      return;
    }
    const imageUrls = images.map((image) => image.url);
    const locationData = {
      title: title.title,
      body: html,
      locationName: location,
      formattedAddress,
      latitude,
      longitude,
      plannerId: data?.id || 0,
      images: imageUrls,
    };
    writeMutation.mutate(locationData);
  };

  const handleCancel = () => router.back();

  const handleShowModal = () => {
    if (!cacheData) {
      Swal.fire({
        icon: "error",
        title: "로그인 필요",
        text: "로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다",
      });
      router.push(`/login`);
      return;
    }
    setShowModal(true);
  };

  const handleImageClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (
      !file.type.includes("png") &&
      !file.type.includes("jpg") &&
      !file.type.includes("jpeg")
    ) {
      Swal.fire({
        icon: "error",
        title: "이미지 형식 오류",
        text: "png 또는 jpg 형식의 이미지만 업로드 가능합니다.",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "이미지 용량 초과",
        text: "이미지 용량은 2MB 이하여야 합니다.",
      });
      return;
    }
    postImages(file, {
      onSuccess: (data) => {
        setImages((prev) => [...prev, { url: data.data.url }]);
      },
    });
  };

  const handleDeleteImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img.url !== url));
    deleteImage(url);
  };

  const btnStyle =
    "p-1 px-3 sm:p-2 sm:px-6 border text-gray-900 hover:bg-gray-100 rounded-lg text-sm sm:text-base";
  return (
    <>
      <div className="min-h-[calc(100vh-304px)] sm:min-h-[calc(100vh-294px)] mt-[63.48px] sm:mt-[90.9px] p-2 text-gray-900">
        {writeMutation.isError && (
          <ErrorShow error={writeMutation.error.message} />
        )}
        <form
          className="flex flex-col max-w-[800px] gap-8 mx-auto p-3"
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
              {data?.location.length !== 0 ? (
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="text-blue-500 font-semibold">
                      {data?.location?.length}
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
                  {data?.location.map((location: LocationInfo) => {
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
                            {dateTime.year}년 {dateTime.month}월 {dateTime.day}
                            일
                          </h2>
                          <p className="text-gray-700">
                            {formatStartTime(dateTime.hour, dateTime.minute)}
                            부터
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
                              메모:{" "}
                              <span className="text-gray-500">
                                {location.memo}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
              onClick={handleShowModal}
            >
              플랜 목록에서 선택
            </button>
          </div>
          {showModal && (
            <PostModal
              setShowModal={setShowModal}
              setPlannerId={setPlannerId}
            />
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-sm sm:text-medium">
              이미지
              <span className="ml-3 text-sm text-gray-400">
                이미지는 게시글 본문 최상단에 고정됩니다.
              </span>
            </label>
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              id="image"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={handleImageClick}
              className={btnStyle}
              disabled={postImagesIsPending}
            >
              이미지 선택
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="text-sm sm:text-medium">
              본문
            </label>
            {images.length !== 0 || !postImagesIsPending ? (
              <div className="flex flex-col gap-2">
                {images.map((image) => (
                  <div key={image.url} className="relative">
                    <Image
                      src={
                        `${process.env.NEXT_PUBLIC_API_URL}files/${image.url}` as string
                      }
                      alt="image"
                      width={500}
                      height={300}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      className="rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full z-10"
                      onClick={() => handleDeleteImage(image.url)}
                    >
                      <MdDeleteForever className="text-2xl" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <LoadingSpinner isLoading={postImagesIsPending} size={15} />
            )}
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
              isLoading={
                postImagesIsPending ||
                writeMutation.isPending ||
                deleteImageIsPending
              }
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
