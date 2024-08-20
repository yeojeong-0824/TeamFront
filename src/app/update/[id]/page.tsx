'use client';
// post 데이터 input 값으로 추후 사용 
import { WriteUpdateType } from "@/types/board";
import { ParamsId } from "@/types/post";
import { useForm } from "react-hook-form";
import useUpdatePost from "@/hooks/useUpdatePost";
import usePost from "@/hooks/usePost";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Update = ({ params }: { params: ParamsId }) => {
  const router = useRouter();
  const { id } = params;
  const { data } = usePost(id);
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
        title: '변경사항이 없습니다.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    updateMutation.mutate(data);
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