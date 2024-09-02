'use client';

import { ParamsId } from "@/types/post";
import { Textarea } from "@nextui-org/input";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PiNotePencilThin } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import useGetComment from "@/hooks/useGetComment";
import usePostComment from "@/hooks/usePostComment";
import { CommentResponse } from "@/types/comment";
import useDelteMutation from "@/hooks/useDeleteComment";
import useUpdateComment from "@/hooks/useUpdateComment";

const Comment = ({ id }: ParamsId) => {
  const [commentOptionVisible, setCommentOptionVisible] = useState<{ [key: string]: boolean }>({});
  const [comment, setComment] = useState<string>('');
  const [updateToggle, setUpdateToggle] = useState<{ [key: number]: boolean }>({});
  const [updateComment, setUpdateComment] = useState<{ [key: number]: string }>({});
  const { data, isLoading, isError, error, isSuccess } = useGetComment(id);
  const { mutate: postCommentMutate } = usePostComment(id);
  const { mutate: deleteCommentMutate } = useDelteMutation(id);
  const { mutate: updateCommentMutate } = useUpdateComment(id);

  const handleCommentPost = (e: React.FormEvent<HTMLFormElement>) => { // 댓글 작성
    e.preventDefault();
    if (!comment.trim()) {
      setComment('');
      return;
    };
    postCommentMutate({ id, score: 5, comment });
    setComment('');
  }

  const toggleCommentOptions = (commentId: number) => { // 댓글 옵션 토글
    setCommentOptionVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleDeleteComment = (commentId: number) => deleteCommentMutate(commentId); // 댓글 삭제

  const handleUpdateComment = (commentId: number) => { // 댓글 수정화면으로 전환
    setCommentOptionVisible((prev) => ({
      ...prev,
      [commentId]: false,
    }));
    setUpdateToggle((prev) => ({
      ...prev,
      [commentId]: true,
    }));
    setUpdateComment((prev) => ({
      ...prev,
      [commentId]: data?.content.find((comment: CommentResponse) => comment.id === commentId)?.comment || '',
    }));
  };

  const handleCancelUpdate = (commentId: number) => { // 댓글 수정 취소 다시 원래 댓글 화면으로 전환
    setUpdateToggle((prev) => ({
      ...prev,
      [commentId]: false,
    }));
    setUpdateComment((prev) => ({
      ...prev,
      [commentId]: '',
    }));
  };

  const handlePostUpdate = (commentId: number) => { // 댓글 수정
    updateCommentMutate({ commentId, score: 5, comment: updateComment[commentId] });
    setUpdateToggle((prev) => ({
      ...prev,
      [commentId]: false,
    }));
    setUpdateComment((prev) => ({
      ...prev,
      [commentId]: '',
    }));
  };

  return (
    <div className="flex flex-col mx-auto max-w-[800px] p-3 text-gray-900">
      {data?.content.length ? <h2 className="mb-10">{data?.content.length}개의 댓글</h2> : null}
      <form className="flex flex-col gap-1 border-2 rounded-md p-5 mb-10"
        onSubmit={handleCommentPost}>
        <Textarea
          variant="underlined"
          labelPlacement="outside"
          placeholder="여러분들의 의견을 댓글로 작성해주세요."
          isRequired
          minRows={1}
          maxRows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex gap-1 justify-end">
          <button className='px-6 p-2 mt-2 rounded-lg text-white bg-[#6EB4FB] hover:bg-blue-500'>
            댓글 쓰기
          </button>
        </div>
      </form>

      <div>
        {data?.content.map((comment: CommentResponse) => (
          <div className="flex flex-col gap-1 p-5 border-b text-gray-900" key={comment.id}>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <h3 className="font-semibold">{comment?.member.nickname}</h3>
                <p className="text-xs text-gray-500">7분전</p>
              </div>
              <div className="flex gap-1 justify-end text-sm relative">
                <button onClick={() => toggleCommentOptions(comment.id)}
                  className="text-xl">
                  <BsThreeDots />
                </button>
                {commentOptionVisible[comment.id] && (
                  <div className="flex flex-col w-[120px] border gap-1 p-3 rounded-md shadow-md absolute top-5 z-10 bg-white">
                    <button className="flex items-center gap-1 hover:text-blue-500 p-1"
                      onClick={() => handleUpdateComment(comment.id)}>
                      <PiNotePencilThin className="inline text-xl" />
                      수정하기
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-500 p-1"
                      onClick={() => handleDeleteComment(comment.id)}>
                      <CiTrash className="inline text-xl" />
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </div>
            {!updateToggle[comment.id] ? (
              <p className="text-sm">{comment?.comment}</p>
            ) : (
              <div>
                <Textarea
                  variant="underlined"
                  labelPlacement="outside"
                  isRequired
                  minRows={1}
                  maxRows={10}
                  onChange={(e) => setUpdateComment((prev) => ({
                    ...prev,
                    [comment.id]: e.target.value,
                  }))}
                  value={updateComment[comment.id] || ''}
                />
                <div className="flex justify-end gap-3">
                  <button className="px-4 p-2 mt-2 rounded-lg text-gray-900 hover:bg-gray-100 border"
                    onClick={() => handleCancelUpdate(comment.id)}>
                    취소
                  </button>
                  <button className="px-4 p-2 mt-2 rounded-lg text-white bg-[#6EB4FB] hover:bg-blue-500"
                    onClick={()=> handlePostUpdate(comment.id)}>
                    수정하기
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
