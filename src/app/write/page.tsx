'use client';
import write_post from "@/api/write_post";
import { useMutation } from "@tanstack/react-query";
import { write_type } from "@/types/board";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Write = () => {
  const { register, handleSubmit, reset } = useForm<write_type>();
  const router = useRouter();

  const writeMutation = useMutation({
    mutationFn:(data:write_type)=> write_post(data),
    onError: (error) => console.log(error),
  });

  const handle_submit = (data: write_type) => {
    if (data.title === '' || data.body === '') return;
    writeMutation.mutate(data);
  };

  useEffect(()=>{
    if(writeMutation.isSuccess) {
      reset();
      router.push(`/`);
      console.log('글 작성완료');
    };
    if (writeMutation.isError) {
      reset();
      console.log(`${writeMutation.error}: 글 작성실패`);
    }
  }, [writeMutation.isSuccess, writeMutation.isError]);

  if(writeMutation.isPending) {
    return <p className="text-blue-500">loading...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-3 min-w-[600px] max-h-[800px] border p-3" onSubmit={handleSubmit(handle_submit)}>
      <h1 className="text-xl text-blue-500 font-bold">Write Post</h1>
        <input type="text" placeholder="title" className="p-1 border" {...register('title')} />
        <textarea placeholder="content" className="p-1 border min-h-[300px]" {...register('body')} autoComplete="off" />
        <button className="text-white bg-blue-500 rounded-sm p-1">submit</button>
      </form>
    </div>
  )
}

export default Write;
