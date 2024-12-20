'use client';

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

type SetLocalData = {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setFormattedAddress: React.Dispatch<React.SetStateAction<string>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
};

const Update = ({ params }: { params: ParamsId }) => {
  const router = useRouter();
  const { id } = params;
  const { data, isLoading, isError, error } = usePost(id);
  const [location, setLocation] = useState<string>(data?.locationName || "");
  const [formattedAddress, setFormattedAddress] = useState<string>(data?.formattedAddress || "");
  const [latitude, setLatitude] = useState<number>(data?.latitude || 0);
  const [longitude, setLongitude] = useState<number>(data?.longitude || 0);
  const updateMutation = useUpdatePost(id);
  const [html, setHtml] = useState<string>(data?.body || "");

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
    if(data?.body) {
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
      data.locationName === location
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
    };
    updateMutation.mutate(postData);
  };

  const handleCancel = () => router.back();

  return (
    <div className="min-h-[1100px] sm:mt-10 p-2 text-gray-900">
        <LoadingSpinner size={15} mt={40} 
        isLoading={isLoading || updateMutation.isPending} />
        {isError || updateMutation?.isError ? <ErrorShow error={updateMutation?.error?.message} />: null}
        {isLoading || updateMutation?.isPending || isError || updateMutation?.isError ? null : <form className="flex flex-col max-w-[800px] gap-8 mx-auto mt-24 p-3" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-3xl text-gray-700 leading-10">
              게시글 수정하기
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="local-search"
            className="text-sm sm:text-medium">지역</label>
            <PlaceSearch 
              setLocalData={setLocalData}
              updateData={data} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title"
            className="text-sm sm:text-medium">제목</label>
            <input type="text" placeholder="제목을 입력해주세요." className="p-2 border rounded-md text-sm sm:text-medium" {...register('title')} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="body"
            className="text-sm sm:text-medium">본문</label>
            <QuillEditor html={html} setHtml={setHtml} defaultBody={data?.body} />
          </div>
          <div className="flex justify-end gap-3">
            <button className='p-1 px-3 sm:px-6 sm:p-2 border text-gray-900 hover:bg-gray-100 rounded-lg text-sm sm:text-base' type="button" onClick={handleCancel}>
              취소
            </button>
            <button className='p-1 px-3 sm:px-6 sm:p-2 text-white bg-[#6EB4FB] hover:bg-blue-500 rounded-lg text-sm sm:text-base'>
              등록
            </button>
          </div>
        </form>}
      </div>
  );
};

export default Update;