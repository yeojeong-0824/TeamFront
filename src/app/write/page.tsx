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

const Write = () => {
  const { register, handleSubmit } = useForm<WriteUpdateType>();
  const writeMutation = useWritePost();
  const [location, setLocation] = useState<string>('');
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [html, setHtml] = useState<string>('');
  const router = useRouter();

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
      <div className="min-h-[1300px] p-2 my-12 text-gray-900">
        {writeMutation.isPending && <LoadingSpinner size={15} mt={40} />}
        {writeMutation.isError && <ErrorShow error={writeMutation.error.message} />}
        <form className="flex flex-col gap-8 max-w-[800px] mx-auto mt-24 p-3" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl leading-10 text-gray-700">
              당신의 <span className="text-[#3D6592]">여정</span>을 기록해보세요
            </h1>
            <p className="text-gray-400 ml-1">
              <span className="text-[#3D6592]">여정</span>에서 다양한 사람들과 소중한 기록을 나눠보는건 어떨까요?
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="local-search">지역</label>
            <PlaceSearch setLocation={setLocation}
              setFormattedAddress={setFormattedAddress}
              setLatitude={setLatitude}
              setLongitude={setLongitude} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title">제목</label>
            <input type="text" placeholder="제목을 입력해주세요." className="p-2 border rounded-md" {...register('title')} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="body">본문</label>
            <QuillEditor html={html} setHtml={setHtml} />
          </div>
          <div className="flex justify-end gap-3">
            <button className='px-6 p-2 rounded-lg text-gray-900 hover:bg-gray-100 border' type="button" onClick={handleCancel}>
              취소
            </button>
            <button className='px-6 p-2 rounded-lg text-white bg-[#6EB4FB] hover:bg-blue-500'>
              등록
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Write;
