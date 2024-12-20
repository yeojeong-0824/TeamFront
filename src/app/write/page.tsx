'use client';

import useWritePost from "@/hooks/useWritePost";
import { WriteUpdateType } from "@/types/board";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PlaceSearch from "../components/PlaceSearch";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/Loading";
import ErrorShow from "../components/Error";
import 'react-quill/dist/quill.snow.css';
import QuillEditor from "../components/Quill";
import Swal from "sweetalert2";
import { SetLocalData } from "@/types/write";

const Write = () => {
  const { register, handleSubmit } = useForm<WriteUpdateType>();
  const writeMutation = useWritePost();
  const [location, setLocation] = useState<string>('');
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [html, setHtml] = useState<string>('');
  const router = useRouter();

  const setLocalData: SetLocalData = {
    setLocation,
    setFormattedAddress,
    setLatitude,
    setLongitude,
  };

  const onSubmitForm = (title: WriteUpdateType) => {
    if (title.title === '' || html === '') {
      Swal.fire({
        icon: 'error',
        title: '제목과 본문을 입력해주세요.',
      });
      return;
    };
    const locationData = {
      title: title.title,
      body: html,
      locationName: location,
      formattedAddress,
      latitude,
      longitude
    }
    writeMutation.mutate(locationData);
  };

  const handleCancel = () => router.back();

  return (
    <>
      <div className="min-h-[1100px] sm:my-12 p-2 text-gray-900">
        <LoadingSpinner size={15} mt={40} isLoading={writeMutation.isPending} />
        {writeMutation.isError && <ErrorShow error={writeMutation.error.message} />}
        <form className="flex flex-col max-w-[800px] gap-8 mx-auto mt-24 p-3" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
              당신의 <span className="text-[#3D6592]">여정</span>을 기록해보세요
            </h1>
            <p className="text-xs sm:text-medium ml-1 text-gray-400">
              <span className="text-[#3D6592]">여정</span>과 함께 소중한 여행의 기록들을 나눠보는건 어떨까요?
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="local-search"
            className="text-sm sm:text-medium">지역</label>
            <PlaceSearch setLocalData={setLocalData} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title"
            className="text-sm sm:text-medium">제목</label>
            <input type="text" placeholder="제목을 입력해주세요." className="p-1.5 sm:p-2 border rounded-md text-sm md:text-base" {...register('title')} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="body"
            className="text-sm sm:text-medium">본문</label>
            <QuillEditor html={html} setHtml={setHtml} />
          </div>
          <div className="flex justify-end gap-3">
            <button className='p-1 px-3 sm:p-2 sm:px-6 border text-gray-900 hover:bg-gray-100 rounded-lg text-sm sm:text-base' type="button" onClick={handleCancel}>
              취소
            </button>
            <button className='p-1 px-3 sm:p-2 sm:px-6 text-white bg-[#6EB4FB] hover:bg-blue-500 rounded-lg text-sm sm:text-base'>
              등록
            </button>
          </div>
        </form>
      </div>
    </>
  )
};

export default Write;
