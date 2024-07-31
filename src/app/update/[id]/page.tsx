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
      </form>
    </div>
  );
};

export default Update;