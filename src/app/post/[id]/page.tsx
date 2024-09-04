'use client';

import { ParamsId } from "@/types/post";
import usePost from "@/hooks/usePost";
import useDeletePost from "@/hooks/useDeletePost";
import Comment from "@/app/components/Comment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/Loading";
import ErrorShow from "@/app/components/Error";
import { IoEyeOutline } from "react-icons/io5";
import { QueryClient } from "@tanstack/react-query";
import { BsThreeDots } from "react-icons/bs";
import { PiNotePencilThin } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";

const Post = ({ params }: { params: ParamsId }) => {
  const { id } = params;
  const { data, isLoading, isError, error, isSuccess } = usePost(id);
  const { mutate: deletePostMutate } = useDeletePost();
  const router = useRouter();
  // const token = localStorage.getItem('accessToken');
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const queryClient = new QueryClient();
  const [postOptionVisible, setPostOptionVisible] = useState<boolean>(false);

  const handlePostDelete = () => deletePostMutate(id);

  const handleUpdate = () => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '로그인이 필요한 서비스입니다'
      });
      router.push(`/login-ui`);
      return;
    }
    router.push(`/update/${id}`);
  }

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['post', id]
    });
  }, []);

  return (
    <div className="min-h-[1300px] my-12 p-2">
      <LoadingSpinner size={15} mt={400} isLoading={isLoading} />
      {isError && <ErrorShow error={error?.message} />}
      {isSuccess && (
        <div className="flex flex-col justify-between max-w-[800px] gap-3 mx-auto mt-24 p-3 text-gray-900">
          <h1 className="text-4xl leading-10">{data?.title}</h1>
          <div className="flex justify-end">
            <div className="flex items-center gap-3 text-sm">
              <h3 className="font-medium">{data?.memberNickname}user</h3>
              <h3>7시간 전</h3>
              <h3 className="text-sm">
                <IoEyeOutline className="inline mr-[1.5px] mb-[1.5px] text-lg" />
                {data?.view}
              </h3>
              <div className="flex justify-end relative gap-1 text-sm">
                <button
                  onClick={() => setPostOptionVisible((option) => !option)}
                  className="text-2xl" >
                  <BsThreeDots />
                </button>
                {postOptionVisible && <div className="flex flex-col absolute w-[120px] gap-1 p-3 top-6 border bg-white z-10 rounded-md shadow-md">
                  <button className="flex items-center gap-1 p-1 hover:text-blue-500"
                    onClick={handleUpdate}>
                    <PiNotePencilThin className="inline text-xl" />
                    수정하기
                  </button>
                  <button className="flex items-center gap-1 p-1 hover:text-red-500"
                    onClick={handlePostDelete}>
                    <CiTrash className="inline text-xl" />
                    삭제하기
                  </button>
                </div>}
              </div>
            </div>
          </div>
          <div className="min-h-[600px] border-b-2">
            <h2 className="flex-grow mt-5 py-3 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: data?.body }}
                className="custom-html-content" />
            </h2>
          </div>
          {data?.formattedAddress && <div className='flex flex-col gap-1 py-8 border-b-1 text-gray-700'>
            <h2 className="text-xl font-semibold">위치 정보</h2>
            <h3>{data?.formattedAddress}</h3>
            <h3 className="text-sm text-gray-400">{data?.locationName}</h3>
          </div>}
          <div>
            {data?.avgScore ? <p className="text-xl font-semibold text-yellow-500">
              해당 게시글의 별점은 {data?.avgScore / 100}점입니다.
            </p> : null}
          </div>
        </div>
      )}
      {isSuccess && <Comment id={id} />}
    </div>
  );
}

export default Post;