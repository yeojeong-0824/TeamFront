'use client';
// post 데이터 input 값으로 추후 사용 
import { WriteUpdateType } from "@/types/board";
import { ParamsId } from "@/types/post";
import { useForm } from "react-hook-form";
import useUpdatePost from "@/hooks/useUpdatePost";
const Update = ({ params }: { params: ParamsId }) => {
  const { register, handleSubmit, reset } = useForm<WriteUpdateType>();
  const { id } = params;
  const updateMutation = useUpdatePost(id);

  // const { data } = useQuery({
  //   queryKey: ['update_data', id],
  //   queryFn: () => post_call(id),
  // });

  const onSubmitForm = (data: WriteUpdateType) => {
    if (data.title === '' || data.body === '') return;
    updateMutation.mutate(data);
  };

  updateMutation.isSuccess && reset();

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-3 min-w-[600px] max-h-[800px] border p-3" onSubmit={handleSubmit(onSubmitForm)}>
      <h1 className="text-xl text-blue-500 font-bold">Update Post id: {id}</h1>
        <input type="text" placeholder="title" className="p-1 border" {...register('title')} />
        <textarea placeholder="content" className="p-1 border min-h-[300px]" {...register('body')} autoComplete="off" />
        <button className="text-white bg-blue-500 rounded-sm p-1">submit</button>
import usePost from "@/hooks/usePost";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import PlaceSearch from "@/app/components/PlaceSearch";

const Update = ({ params }: { params: ParamsId }) => {
  const router = useRouter();
  const { id } = params;
  const { data } = usePost(id);
  const [location, setLocation] = useState<string>('');
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const updateMutation = useUpdatePost(id);

  const { register, handleSubmit, reset, formState: { defaultValues } } = useForm<WriteUpdateType>({
    defaultValues: {
      title: '',
      body: '',
    }
  });

  useEffect(() => {
    reset({
      title: data?.title,
      body: data?.body,
    });
  }, [data]);

  const onSubmitForm = (data: WriteUpdateType) => {
    if (data.title === defaultValues?.title && data.body === defaultValues?.body) {
      Swal.fire({
        icon: 'warning',
        title: '제목 혹은 내용에 변경사항이 없습니다.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    const locationData = {
      ...data,
      locationName: location,
      formattedAddress,
      latitude,
      longitude
    }
    updateMutation.mutate(locationData);
  };

  const onInvalid = (errors: any) => {
    Swal.fire({
      icon: 'error',
      title: '글 수정 실패',
      text: errors.title?.message || errors.body?.message
    });
  };

  const handleCancel = () => router.back();

  return (
    <div className="p-2">
      <form className="flex flex-col gap-3 justify-between max-w-[800px] min-h-[400px] mx-auto mt-40 border p-3"
        onSubmit={handleSubmit(onSubmitForm, onInvalid)}>
        <PlaceSearch setLocation={setLocation}
          setFormattedAddress={setFormattedAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <input type="text" placeholder="title" className="border p-3 text-2xl" {...register('title', {
          required: '글 제목을 입력해주세요',
          maxLength: { value: 20, message: '글 제목은 20자 이하로 입력하세요' }
        })} />
        <textarea placeholder="content" className="flex-grow p-3 border min-h-[300px]" {...register('body', {
          required: '글 내용을 입력하세요'
        })} autoComplete="off" />
        <button className="text-white bg-blue-500 rounded-sm p-1">수정</button>
        <button type="button" className="text-white bg-red-500 rounded-sm p-1"
          onClick={handleCancel}>취소</button>
      </form>
    </div>
  );
};

export default Update;