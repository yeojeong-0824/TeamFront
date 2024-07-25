'use client';
// post 데이터 input 값으로 추후 사용 
import { write_type } from "@/types/board";
import { params_id } from "@/types/post";
import { useForm } from "react-hook-form";
import use_update_post from "@/hooks/use_update_post";

const Update = ({ params }: { params: params_id }) => {
  const { register, handleSubmit, reset } = useForm<write_type>();
  const { id } = params;
  const update_mutation = use_update_post(id);

  // const { data } = useQuery({
  //   queryKey: ['update_data', id],
  //   queryFn: () => post_call(id),
  // });

  const handle_submit = (data: write_type) => {
    if (data.title === '' || data.body === '') return;
    update_mutation.mutate(data);
  };

  update_mutation.isSuccess && reset();

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