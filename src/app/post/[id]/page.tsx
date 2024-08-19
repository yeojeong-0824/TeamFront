'use client';
import { ParamsId } from "@/types/post";
import usePost from "@/hooks/usePost";
import useDeletePost from "@/hooks/useDeletePost";
import Link from "next/link";
import Comment from "@/app/components/comment";

const Post = ({ params }: { params: ParamsId }) => {
  const { id } = params;

  const { mutate } = useDeletePost();
  const { data, isLoading, isError, error, isSuccess } = usePost(id);

  const handleDelete = () => mutate(id);

  console.log(data);

  return (
    <div className="p-2">
      {isLoading && <div className="flex justify-center mt-72 text-blue-500 font-bold text-3xl">
        Loading...
      </div>}
      {isError && <div className="text-red-500 font-bold text-5xl">
        {error?.toString()}
      </div>}
      {isSuccess && (
        <div className="flex flex-col gap-3 justify-between max-w-[800px] min-h-[400px] mx-auto mt-40 border p-3">
          <div className="flex justify-between border p-3" >
            <h1 className="text-2xl">{data?.title}</h1>
            <div className="flex gap-3 items-center">
              <h3 className="font-bold">{data?.memberNickname}</h3>
              <h3 className="text-sm">조회수 <span>{data?.view}</span></h3>
            </div>
          </div>
          <h2 className="flex-grow border p-3">{data?.body}</h2>
          <div className="flex justify-end gap-3">
            <Link className="hover:text-blue-500 font-bold" href={`/update/${id}`}>수정</Link>
            <button className="hover:text-red-500 font-bold" onClick={handleDelete}>삭제</button>
          </div>
        </div>
      )}
      {isSuccess && <Comment boardId={id}/>}
    </div>
  );
}

export default Post;