'use client';
import CardPost from "./CardPost";
import { Post } from "@/types/post";
import NavigationNumberMain from "./NavigationNumberMain";
import { useEffect, useState } from "react";
import ControlBarMain from "./ControlBarMain";
import useSortPosts from "@/hooks/useSortPosts";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CardPosts = () => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') || '1') || 1);
  const [sortOption, setSortOption] = useState<string>(searchParams.get('sort') || 'latest');
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading, isError, error } = useSortPosts(currentPage, sortOption);

  const totalPages = data?.totalPages;
  
  // 만약 url에서 sort 옵션이 변경되면 sortOption을 url 값으로 변경
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const page = query.get('page');
    const sort = query.get('sort');

    if (page) {
      setCurrentPage(Number(page));
    }

    if (sort) {
      setSortOption(sort);
    }
  }, [window.location.search]);

  useEffect(() => {
    const query = new URLSearchParams();
    query.set('page', currentPage.toString());
    query.set('sort', sortOption);
    router.push(`/?${query.toString()}`);
  }, [currentPage, sortOption, router]);

  useEffect(()=> {
    queryClient.invalidateQueries({queryKey: ['sortPosts', currentPage, sortOption]});
  }, [currentPage, sortOption]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-32">
        <p className="text-blue-500 text-2xl font-bold">
          Loading...
        </p>
      </div>
    );
  };

  if (isError) {
    return (
      <div className="flex justify-center mt-32">
        <p className="text-red-500 text-2xl font-bold">
          Error: {error?.message}
        </p>
      </div>
    );
  };

  const renderNoPostsFound = () => {
    if (data?.content.length === 0) {
      return (
        <div className="flex justify-center mt-32">
          <p className="text-red-500 text-2xl font-bold">
            게시글이 존재하지 않습니다.
          </p>
        </div>
      )
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-10">
      <ControlBarMain sortOption={sortOption}
        setSortOption={setSortOption}
        setCurrentPage={setCurrentPage} />
      {renderNoPostsFound()}
      {data?.content.map((post: Post) => (
        <CardPost key={post.id} post={post} />
      ))}
      <NavigationNumberMain currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} />
    </div>
  );
}

export default CardPosts;
