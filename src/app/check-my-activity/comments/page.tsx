"use client";

import CommentCardPost from "@/app/components/CommentCardPost";
import ErrorShow from "@/app/components/Error";
import LoadingSpinner from "@/app/components/Loading";
import NavigationNumberMain from "@/app/components/NavigationNumberMain";
import useUserCommentsCall from "@/hooks/userHooks/useUserCommentsCall";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function CheckMyActivityComment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useUserCommentsCall(
    currentPage || 1
  );
  const totalPages = data?.totalPages;

  const comments = data?.content;

  useEffect(() => {
    router.push(`?page=${currentPage}`);
    queryClient.invalidateQueries({ queryKey: ["sortPosts", currentPage] });
  }, [currentPage, queryClient, router]);

  // 컴포넌트가 마운트될 때 상태 초기화
  useEffect(() => {
    const newPage = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(newPage);
  }, []);

  // URL 변경 사항을 감지하여 상태 업데이트
  useEffect(() => {
    const newPage = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(newPage);
  }, [searchParams]);

  const renderNoPostsFound = () => {
    if (data?.content.length === 0) {
      return (
        <div className="flex justify-center">
          <p className="font-bold text-gray-800">댓글이 존재하지 않습니다.</p>
        </div>
      );
    }
  };

  return (
    <div>
      {renderNoPostsFound()}
      <LoadingSpinner size={15} isLoading={isLoading} />
      {isError && <ErrorShow error={error?.message} />}
      {data?.content.map((comment: any) => (
        <CommentCardPost key={comment.id} comment={comment} />
      ))}
      {data?.content.length !== 0 && (
        <NavigationNumberMain
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPages}
        />
      )}
    </div>
  );
}

function CheckMyActivityCommentWrapper() {
  return (
    <Suspense fallback={<LoadingSpinner size={15} isLoading={true} />}>
      <CheckMyActivityComment />
    </Suspense>
  );
}

export default CheckMyActivityCommentWrapper;
