'use client';

import useWritePost from "@/hooks/useWritePost";
import { WriteUpdateType } from "@/types/board";
import { useForm } from "react-hook-form";

const Write = () => {
  const { register, handleSubmit, reset } = useForm<WriteUpdateType>();
  const writeMutation = useWritePost(reset as () => void);

  const onSubmitForm = (data: WriteUpdateType) => {
    if (data.title === '' || data.body === '') return;
    writeMutation.mutate(data);
  };

  if(writeMutation.isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-500 text-2xl text-center font-bold">
          Loading...
        </p>
      </div>
  )};

  if(writeMutation.isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-2xl text-center font-bold">
          Error: {writeMutation.error.message}
        </p>
      </div>
  )};

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-3 min-w-[600px] max-h-[800px] border p-3" onSubmit={handleSubmit(onSubmitForm)}>
      <h1 className="text-xl text-blue-500 font-bold">Write Post</h1>
        <input type="text" placeholder="title" className="p-1 border" {...register('title')} />
        <textarea placeholder="content" className="p-1 border min-h-[300px]" {...register('body')} autoComplete="off" />
        <button className="text-white bg-blue-500 rounded-sm p-1">submit</button>
      </form>
    </div>
  )
}

export default Write;
