'use client';
import { params_type } from "@/types/post";

const Post = ({ params }: {params: params_type}) => {
  const { id } = params; // id 값으로 추후 api 요청을 사용, id 값에 따른 게시글을 가져옴

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl">id: {id} - post page</h1>

    </div>
  );
}

export default Post;