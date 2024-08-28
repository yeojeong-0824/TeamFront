'use client';

import { ParamsId } from "@/types/post";
import usePost from "@/hooks/usePost";
import useDeletePost from "@/hooks/useDeletePost";
import Comment from "@/app/components/comment";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import useSetScore from "@/hooks/useSetScore";
import useDeleteScore from "@/hooks/useDeleteScore";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Rate } from "antd";
import LoadingSpinner from "@/app/components/Loading";

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

  return (
    <div className="p-2">
      {isLoading && (
        <LoadingSpinner size={15}/>
      )}
      {isError && (
        <div className="text-red-500 font-bold text-5xl">
          {error?.toString()}
        </div>
      )}
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
          {data?.latitude !== '0' && (
            <div className="border p-3">
              <h2 className="text-xl font-bold">위치 정보</h2>
              <h3>{data?.formattedAddress}</h3>
              <h3>{data?.locationName}</h3>
              <h3>{data?.latitude}</h3>
              <h3>{data?.longitude}</h3>
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex gap-3">
              <button className="hover:text-blue-500 font-bold" onClick={handleUpdate}>
                글 수정
              </button>
              <button className="hover:text-red-500 font-bold" onClick={handlePostDelete}>
                글 삭제
              </button>
            </div>
          </div>
          <div>
            <p>
              <Rate onChange={handleRate} 
                value={score}
                defaultValue={memberScoreInfo ? memberScoreInfo : 0} />
            </p>
            {memberScoreInfo && (
              <Button
                color="danger"
                className="text-white font-bold"
                onClick={deleteScore}
              >
                별점 삭제
              </Button>
            )}
            <p className="text-xl mt-3 font-bold">평균 별점 {data?.avgScore / 100}</p>
          </div>
        </div>
      )}
      {isSuccess && <Comment />}
    </div>
  );
}

export default Post;