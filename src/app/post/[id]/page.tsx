'use client';

import { ParamsId } from "@/types/post";
import usePost from "@/hooks/usePost";
import useDeletePost from "@/hooks/useDeletePost";
import Comment from "@/app/components/Comment";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
// import useSetScore from "@/hooks/useSetScore";
import useDeleteScore from "@/hooks/useDeleteScore";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { Rate } from "antd";
import LoadingSpinner from "@/app/components/Loading";
import ErrorShow from "@/app/components/Error";
import { IoEyeOutline } from "react-icons/io5";
import { QueryClient } from "@tanstack/react-query";
import { global } from "styled-jsx/css";

const Post = ({ params }: { params: ParamsId }) => {
  const { id } = params;
  const { data, isLoading, isError, error, isSuccess } = usePost(id);
  const { mutate: deletePostMutate } = useDeletePost();
  // const { mutate: scoreMutate } = useSetScore(id);
  const { mutate: deleteScoreMutate } = useDeleteScore(id);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const memberScoreInfo = data?.MemberScoreInfo;
  const token = localStorage.getItem('accessToken');
  const queryClient = new QueryClient();

  const handlePostDelete = () => deletePostMutate(id);

  // const deleteScore = () => deleteScoreMutate(id);

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

  // const handleRate = (value: number) => {
  //   if (!token) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: '로그인 필요',
  //       text: '로그인이 필요한 서비스입니다'
  //     });
  //     router.push('/login-ui');
  //     return;
  //   }
  //   if (value === 0) return;
  //   scoreMutate(value); 
  //   setScore(value);
  // };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['post', id]
    });
  }, []);

  return (
    <div className="min-h-[1300px] p-2 my-12">
      {isLoading && (
        <LoadingSpinner size={15} mt={40} />
      )}
      {isError && <ErrorShow error={error?.message} />}
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
            <h2 className="flex-grow py-3 mt-5 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: data?.body }}
                className="custom-html-content" />
            </h2>
          </div>
          <div className='flex justify-between text-gray-700 mb-14'>
            {data?.latitude !== '0' ? (
              <div className="self-start">
                <h2 className="text-xl font-semibold">위치 정보</h2>
                <h3>{data?.formattedAddress}</h3>
                <h3>{data?.locationName}</h3>
              </div>
            ) : (
              <div className="flex-grow" />
            )}
            <div className="flex gap-3 self-start">
              <button className="hover:text-blue-700" onClick={handleUpdate}>
                글 수정
              </button>
              <button className="hover:text-red-500" onClick={handlePostDelete}>
                글 삭제
              </button>
            </div>
          </div>
          <div>
            {/* <p>
              <Rate onChange={handleRate} 
                value={score}
                defaultValue={memberScoreInfo ? memberScoreInfo : 0} />
            </p> */}
            {/* {memberScoreInfo && (
              <Button
                color="danger"
                className="text-white font-bold"
                onClick={deleteScore}
              >
                별점 삭제
              </Button>
            )} */}
            {data?.avgScore ? <p className="text-xl font-bold text-yellow-500">
              해당 게시글의 별점은 {data?.avgScore / 100}점입니다.
            </p> : null}
          </div>
        </div>
      )}
      {isSuccess && <Comment />}
    </div>
  );
}

export default Post;