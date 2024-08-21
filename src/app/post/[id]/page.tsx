'use client';
import { ParamsId } from "@/types/post";
import usePost from "@/hooks/usePost";
import useDeletePost from "@/hooks/useDeletePost";
import Link from "next/link";
import Comment from "@/app/components/comment";
import { Slider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import useSetScore from "@/hooks/useSetScore";
import useDeleteScore from "@/hooks/useDeleteScore";

const Post = ({ params }: { params: ParamsId }) => {
  const { id } = params;
  const { mutate: deletePostMutate } = useDeletePost();
  const { data, isLoading, isError, error, isSuccess } = usePost(id);
  const [score, setScore] = useState<number>(0);
  const { mutate: scoreMutate, isError: scoreIsError } = useSetScore(id);
  const { mutate: deleteScoreMutate } = useDeleteScore(id);
  const getScore = localStorage.getItem(`score${id}`);

  const handlePostDelete = () => deletePostMutate(id);

  const handleScoreChange = (value: number | number[]) => setScore(value as number);

  if(scoreIsError) localStorage.removeItem(`score${id}`);

  const postScore = () => {
    scoreMutate(score);
    localStorage.setItem(`score${id}`, String(score));
  };

  const deleteScore = () => {
    deleteScoreMutate(id);
    localStorage.removeItem(`score${id}`);
  }

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
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Link className="hover:text-blue-500 font-bold" href={`/update/${id}`}>글 수정</Link>
              <button className="hover:text-red-500 font-bold" onClick={handlePostDelete}>글 삭제</button>
            </div>
          </div>
          <div>
            <Slider
              size="md"
              step={1}
              color="success"
              label="별점"
              showSteps={true}
              maxValue={10}
              minValue={0}
              defaultValue={getScore ? Number(getScore) : 0}
              className="max-w-sm"
              onChange={handleScoreChange}
              isDisabled={getScore ? true : false}
            />
            {!getScore ? (
              <Button
                color="success"
                className="text-white font-bold"
                onClick={postScore}
                isDisabled={score < 1}>
                별점 등록
              </Button>
            ) : (
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