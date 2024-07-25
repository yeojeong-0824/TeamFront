'use client';

import use_write_post from "@/hooks/use_write_post";
import { write_type } from "@/types/board";
import { useForm } from "react-hook-form";

const Write = () => {
  const { register, handleSubmit, reset } = useForm<write_type>();
  const write_mutation = use_write_post(reset as () => void);

  const handle_submit = (data: write_type) => {
    if (data.title === '' || data.body === '') return;
    write_mutation.mutate(data);
  };

  if(write_mutation.isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-500 text-2xl text-center font-bold">
          Loading...
        </p>
      </div>
  )};

  if(write_mutation.isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-2xl text-center font-bold">
          Error: {write_mutation.error.message}
        </p>
      </div>
  )};

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
