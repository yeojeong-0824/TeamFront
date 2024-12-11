"use client"

import CardPost from "@/app/components/CardPost";
import ErrorShow from "@/app/components/Error";
import LoadingSpinner from "@/app/components/Loading";
import NavigationNumberMain from "@/app/components/NavigationNumberMain";
import useUserPostsCall from "@/hooks/userHooks/useUserPostsCall";
import { Post } from "@/types/post";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckMyActivityBoard() {
  const router = useRouter(); 
  const searchParams = useSearchParams(); 

  const initialPage = parseInt(searchParams.get('page') || '1', 10); 

  const [currentPage, setCurrentPage] = useState<number>(initialPage); 

  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useUserPostsCall(currentPage || 1);
  const totalPages = data?.totalPages;

  useEffect(() => {
    router.push(`?page=${currentPage}`);
    queryClient.invalidateQueries({ queryKey: ['sortPosts', currentPage] });
  }, [currentPage, queryClient, router]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['sortPosts', currentPage] });
  }, [currentPage, queryClient]);

  // 컴포넌트가 마운트될 때 상태 초기화
  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(newPage);
  }, []);

  // URL 변경 사항을 감지하여 상태 업데이트
  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(newPage);
  }, [searchParams]);

  const renderNoPostsFound = () => {
    if (data?.content.length === 0) {
      return (
        <div className="flex justify-center">
          <p className="font-bold text-2xl text-gray-800">
            게시글이 존재하지 않습니다.
          </p>
        </div>
      )
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div className="p-10 mt-10 sm:p-20 bg-white text-left shadow-md rounded-lg w-1/2">
        {renderNoPostsFound()}
        <LoadingSpinner size={15} isLoading={isLoading}/>
        {isError && <ErrorShow error={error?.message}/>}
        {data?.content.map((post: Post) => (
          <CardPost key={post.id} post={post} />
        ))}
        <NavigationNumberMain currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} />
      </div>
    </div>
  );
}