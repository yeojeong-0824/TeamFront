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
import { Rate } from "antd";

const Comment = ({ id }: ParamsId) => {
  const [commentOptionVisible, setCommentOptionVisible] = useState<number | null>(null); // 단일 ID로 변경
  const [comment, setComment] = useState<string>('');
  const [updateToggle, setUpdateToggle] = useState<{ [key: number]: boolean }>({});
  const [updateComment, setUpdateComment] = useState<{ [key: number]: string }>({});
  const { data, isLoading, isError, error, isSuccess } = useGetComment(id);
  const { mutate: postCommentMutate } = usePostComment(id);
  const { mutate: deleteCommentMutate } = useDelteMutation(id);
  const { mutate: updateCommentMutate } = useUpdateComment(id);
  const [score, setScore] = useState<number>(0);
  const [updateScore, setUpdateScore] = useState<number>(0);

  const handleCommentPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) {
      setComment('');
      return;
    }
    postCommentMutate({ id, score, comment });
    setComment('');
    setScore(0);
  };

  const toggleCommentOptions = (commentId: number) => {
    setCommentOptionVisible((prev) => (prev === commentId ? null : commentId)); // 동일 ID 클릭 시 닫힘
  };

  const handleDeleteComment = (commentId: number) => deleteCommentMutate(commentId);

  const handleUpdateComment = (commentId: number) => {
    setCommentOptionVisible(null); // 옵션 메뉴 닫기
    setUpdateToggle((prev) => ({
      ...prev,
      [commentId]: true,
    }));
    setUpdateComment((prev) => ({
      ...prev,
      [commentId]: data?.content.find((comment: CommentResponse) => comment.id === commentId)?.comment || '',
    }));
  };

  const handleCancelUpdate = (commentId: number) => {
    setUpdateToggle((prev) => ({
      ...prev,
      [commentId]: false,
    }));
    setUpdateComment((prev) => ({
      ...prev,
      [commentId]: '',
    }));
  };

  const handlePostUpdate = (commentId: number) => {
    const originalComment = data?.content.find((comment: CommentResponse) => comment.id === commentId);

    // 새 별점이 0이거나 원래 별점과 같다면, 원래 별점을 사용
    const finalScore = updateScore === 0 || updateScore === originalComment?.score ? originalComment?.score : updateScore;

    // 댓글 내용과 별점이 변경되지 않았으면 리턴
    if (originalComment?.comment === updateComment[commentId] && finalScore === originalComment?.score) {
      return;
    }

    updateCommentMutate({ commentId, score: finalScore, comment: updateComment[commentId] });
    setCommentOptionVisible(null);
    setUpdateScore(0);
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
    <div className="flex flex-col max-w-[800px] mx-auto p-3 text-gray-900">
      {data?.content.length ? <h2 className="mb-10">{data?.content.length}개의 댓글</h2> : null}
      <form className="flex flex-col gap-1 mb-10 p-5 border-2 rounded-md" onSubmit={handleCommentPost}>
        <Rate value={score} onChange={(value) => setScore(value)} />
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
        <div className="flex justify-end gap-1">
          <button className="mt-2 p-2 px-6 bg-[#6EB4FB] text-white rounded-lg hover:bg-blue-500">댓글 쓰기</button>
        </div>
      </form>

      <div>
        {data?.content.map((comment: CommentResponse) => (
          <div className="flex flex-col gap-1 p-5 border-b text-gray-900" key={comment.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">{comment?.member.nickname}</h3>
                <p className="text-xs text-gray-500">7분전</p>
                <Rate
                  value={comment?.score}
                  disabled
                  style={{
                    fontSize: '13px',
                    display: updateToggle[comment.id] ? 'none' : 'block',
                  }}
                />
              </div>
              <div className={`flex relative justify-end gap-1 text-sm ${updateToggle[comment.id] ? 'hidden' : 'block'}`}>
                <button onClick={() => toggleCommentOptions(comment.id)} className="text-xl">
                  <BsThreeDots />
                </button>
                {commentOptionVisible === comment.id && ( // 현재 활성화된 ID와 비교
                  <div className="flex flex-col absolute w-[120px] gap-1 top-5 p-3 border bg-white rounded-md z-10 shadow-md">
                    <button
                      className="flex items-center gap-1 p-1 hover:text-blue-500"
                      onClick={() => handleUpdateComment(comment.id)}
                    >
                      <PiNotePencilThin className="inline text-xl" />
                      수정하기
                    </button>
                    <button
                      className="flex items-center gap-1 p-1 hover:text-red-500"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
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
                <Rate defaultValue={comment?.score} onChange={(value)=> setUpdateScore(value)} />
                <Textarea
                  variant="underlined"
                  labelPlacement="outside"
                  isRequired
                  minRows={1}
                  maxRows={10}
                  onChange={(e) =>
                    setUpdateComment((prev) => ({
                      ...prev,
                      [comment.id]: e.target.value,
                    }))
                  }
                  value={updateComment[comment.id] || ''}
                />
                <div className="flex justify-end gap-3">
                  <button
                    className="mt-2 p-2 px-4 text-gray-900 border hover:bg-gray-100 rounded-lg"
                    onClick={() => handleCancelUpdate(comment.id)}
                  >
                    취소
                  </button>
                  <button
                    className="mt-2 p-2 px-4 text-white bg-[#6EB4FB] hover:bg-blue-500 rounded-lg"
                    onClick={() => handlePostUpdate(comment.id)}
                  >
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
};

export default Comment;
