'use client';
import post_call from "@/api/post_call";
import update_post from "@/api/update_post";
import { write_type } from "@/types/board";
import { params_id } from "@/types/post";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const Update = ({ params }: { params: params_id }) => {
  const { register, handleSubmit, reset } = useForm<write_type>();
  const router = useRouter();
  const { id } = params;

  // const { data } = useQuery({
  //   queryKey: ['update_data', id],
  //   queryFn: () => post_call(id),
  // });

  const update_mutation = useMutation({
    mutationFn: (data: write_type) => update_post(data, id),
    onError: (error) => console.log(error),
    onSuccess: () => {
      reset();
      router.push(`/`);
      console.log('글 수정완료');
    },
  });

  const handle_submit = (data: write_type) => {
    if (data.title === '' || data.body === '') return;
    update_mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-3 min-w-[600px] max-h-[800px] border p-3" onSubmit={handleSubmit(handle_submit)}>
      <h1 className="text-xl text-blue-500 font-bold">Update Post id: {id}</h1>
        <input type="text" placeholder="title" className="p-1 border" {...register('title')} />
        <textarea placeholder="content" className="p-1 border min-h-[300px]" {...register('body')} autoComplete="off" />
        <button className="text-white bg-blue-500 rounded-sm p-1">submit</button>
      </form>
    </div>
  );
};

export default Update;