'use client';

import { Textarea } from "@nextui-org/input";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PiNotePencilThin } from "react-icons/pi";
import { CiTrash } from "react-icons/ci";
import useGetComment from "@/hooks/useGetComment";
import usePostComment from "@/hooks/usePostComment";
import { CommentResponse } from "@/types/comment";
import useDelteMutation from "@/hooks/useDeleteComment";
import useUpdateComment from "@/hooks/useUpdateComment";
import { Rate } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import formatDate from "@/util/formatDate";

type CommentProps = {
  id: number;
  loginNickname: string;
};

const Comment = ({ id, loginNickname }: CommentProps) => {
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
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ['accessCheck'] });
  const cacheData = queryClient.getQueryData(['accessCheck']);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commentOptionVisible !== null) {
        const menuElement = menuRefs.current[commentOptionVisible];
        const buttonElement = buttonRefs.current[commentOptionVisible];
        if (menuElement && !menuElement.contains(event.target as Node) && buttonElement && !buttonElement.contains(event.target as Node)) {
          setCommentOptionVisible(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [commentOptionVisible]);

  const handleCommentPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) {
      setComment('');
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['accessCheck'] });
    const cacheData = queryClient.getQueryData(['accessCheck']);
    if(!cacheData) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '로그인이 필요한 서비스입니다.'
      });
      return;
    }
    postCommentMutate({ id, score, comment });
    setComment('');
    setScore(0);
  };

  const toggleCommentOptions = (commentId: number) => {
    setCommentOptionVisible((prev) => (prev === commentId ? null : commentId));
  };

  const handleDeleteComment = (commentId: number) => {
    if(!cacheData) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '로그인이 필요한 서비스입니다.'
      });
      return;
    }
    deleteCommentMutate(commentId)
  };

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
    if(!cacheData) {
      Swal.fire({
        icon: 'error',
        title: '로그인 필요',
        text: '로그인이 필요한 서비스입니다.'
      });
      return;
    }
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
      {data?.content.length ? <h2 className="text-sm sm:text-medium mb-10">{data?.content.length}개의 댓글</h2> : null}
      <form className="flex flex-col gap-1 mb-10 p-5 border-2 rounded-md" onSubmit={handleCommentPost}>
        <Rate value={score} onChange={(value) => setScore(value)} />
        <Textarea
          variant="underlined"
          labelPlacement="outside"
          placeholder="여러분들의 의견을 댓글로 작성해주세요. 최대 255자 까지 작성 가능합니다."
          isRequired
          minRows={1}
          maxRows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="text-sm sm:text-medium"
        />
        <div className="flex justify-end gap-1">
          <button className="mt-2 p-1 px-3 text-sm sm:p-2 sm:px-6 sm:text-medium bg-[#6EB4FB] text-white rounded-lg hover:bg-blue-500">댓글 쓰기</button>
        </div>
      </form>

      <div>
        {data?.content.map((comment: CommentResponse) => (
          <div className="flex flex-col gap-1 p-5 border-b text-gray-900" key={comment.id}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-medium font-semibold">{comment?.member.nickname}</h3>
                <p className="text-xs text-gray-400">{loginNickname === comment?.member?.nickname && '내 댓글'}</p>
                <p>

                </p>
                {comment?.score ? (
                  <Rate
                    value={comment?.score}
                    disabled
                    style={{
                      fontSize: '13px',
                      display: updateToggle[comment.id] ? 'none' : 'block',
                    }}
                  />) : null}
              </div>
              <div className={`flex relative justify-end gap-1 text-sm ${updateToggle[comment.id] ? 'hidden' : 'block'}`}>
                <button ref={(el) => { buttonRefs.current[comment.id] = el; }} onClick={() => toggleCommentOptions(comment.id)} className={`text-xl ${Object.values(updateToggle).includes(true) || !cacheData || loginNickname !== comment?.member?.nickname ? 'hidden' : 'block'}`}>
                  <BsThreeDots className="text-sm sm:text-2xl" />
                </button>
                {commentOptionVisible === comment.id && (
                  <div className="flex flex-col absolute w-[90px] sm:w-[120px] gap-1 top-5 p-1 sm:p-3 border bg-white rounded-md z-10 shadow-md"
                  ref={(el) => { menuRefs.current[comment.id] = el; }}>
                    <button
                      className="flex items-center gap-1 p-1 hover:text-blue-500 text-xs sm:text-medium"
                      onClick={() => handleUpdateComment(comment.id)}
                    >
                      <PiNotePencilThin className="inline text-lg sm:text-xl" />
                      수정하기
                    </button>
                    <button
                      className="flex items-center gap-1 p-1 hover:text-red-500 text-xs sm:text-medium"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <CiTrash className="inline text-lg sm:text-xl" />
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
                  className="text-sm sm:text-medium"
                />
                <div className="flex justify-end gap-3">
                  <button
                    className="mt-2 p-1 px-2 sm:p-2 sm:px-4 text-gray-900 border hover:bg-gray-100 rounded-lg text-xs sm:text-medium"
                    onClick={() => handleCancelUpdate(comment.id)}
                  >
                    취소
                  </button>
                  <button
                    className="mt-2 p-1 px-2 sm:p-2 sm:px-4 text-white bg-[#6EB4FB] hover:bg-blue-500 rounded-lg text-xs sm:text-medium"
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
