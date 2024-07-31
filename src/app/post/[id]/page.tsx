'use client';
import { ParamsId } from "@/types/post";
import usePost from "@/hooks/usePost";

const Post = ({ params }: { params: ParamsId }) => {
  const { id } = params;

  const { data, isLoading, isError, error, isSuccess } = usePost(id);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isLoading && <div className="text-blue-500 font-bold text-5xl">
        Loading...
      </div>}
      {isError && <div className="text-red-500 font-bold text-5xl">
        {error?.toString()}
      </div>}
      {isSuccess && (
        <div>
          <h1 className="text-4xl">title: {data?.title}</h1>
          <h2>body: {data?.Body}</h2>
          <h3>memberNickname: {data?.memberNickname}</h3>
        </div>
      )}
    </div>
  );
}

export default Post;