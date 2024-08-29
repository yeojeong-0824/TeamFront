'use client';

import { ParamsId } from "@/types/post";
import usePost from "@/hooks/usePost";
import useDeletePost from "@/hooks/useDeletePost";
import Comment from "@/app/components/comment";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSetScore from "@/hooks/useSetScore";
import useDeleteScore from "@/hooks/useDeleteScore";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Rate } from "antd";
import LoadingSpinner from "@/app/components/Loading";
import ErrorShow from "@/app/components/Error";
import { IoEyeOutline } from "react-icons/io5";
import { QueryClient } from "@tanstack/react-query";

const Post = ({ params }: { params: ParamsId }) => {
  const { id } = params;
  const { data, isLoading, isError, error, isSuccess } = usePost(id);
  const { mutate: deletePostMutate } = useDeletePost();
  const { mutate: scoreMutate } = useSetScore(id);
  const { mutate: deleteScoreMutate } = useDeleteScore(id);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const memberScoreInfo = data?.MemberScoreInfo;
  const token = localStorage.getItem('accessToken');
  const queryClient = new QueryClient();

  const handlePostDelete = () => deletePostMutate(id);

  const deleteScore = () => deleteScoreMutate(id);

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

  const handleRate = (value: number) => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '로그인이 필요한 서비스입니다'
      });
      router.push('/login-ui');
      return;
    }
    if (value === 0) return;
    scoreMutate(value); 
    setScore(value);
  };

  useEffect(() => {
      queryClient.invalidateQueries({
        queryKey: ['post', id]
      });
  }, []);

  return (
    <div className="p-2 mt-10">
      {isLoading && (
        <LoadingSpinner size={15} mt={40}/>
      )}
      {isError && <ErrorShow error={error?.message}/>}
      {isSuccess && (
        <div className="flex flex-col gap-3 justify-between max-w-[800px] mx-auto mt-24 p-3">
          <h1 className="text-4xl text-gray-900 leading-10">{data?.title}</h1>
          <div className="flex justify-end px-3" >
            <div className="flex gap-2 items-center text-gray-900 text-sm">
              <h3 className="font-medium">{data?.memberNickname}user</h3>         
              <h3>7시간 전</h3>
              <h3 className="text-sm">
                <IoEyeOutline className="inline text-lg mr-[1.5px] mb-[1.5px]" />
                {data?.view}
              </h3>
            </div>
          </div>
          <div className="min-h-[600px] border-b-2">
          <h2 className="flex-grow p-3 mt-5 leading-relaxed">
            {data?.body}
          </h2>
          </div>
          <div className="flex justify-end text-gray-900 font-semibold">
            <div className="flex gap-3">
              <button className="hover:text-blue-700" onClick={handleUpdate}>
                글 수정
              </button>
              <button className="hover:text-red-00" onClick={handlePostDelete}>
                글 삭제
              </button>
            </div>
          </div>
          {data?.latitude !== '0' && (
            <div className="p-3">
              <h2 className="text-xl font-bold">위치 정보</h2>
              <h3>{data?.formattedAddress}</h3>
              <h3>{data?.locationName}</h3>
            </div>
          )}
          <div>
            {/* <p>
              <Rate onChange={handleRate} 
                value={score}
                defaultValue={memberScoreInfo ? memberScoreInfo : 0} />
            </p> */}
            {memberScoreInfo && (
              <Button
                color="danger"
                className="text-white font-bold"
                onClick={deleteScore}
              >
                별점 삭제
              </Button>
            )}
            <p className="text-xl mb-3 font-bold text-gray-900">
              해당 게시글의 별점 {data?.avgScore / 100}
            </p>
          </div>
        </div>
      )}
      {isSuccess && <Comment />}
    </div>
  );
}

export default Post;