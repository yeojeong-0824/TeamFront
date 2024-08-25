'use client';

import { ParmasKeyword } from "@/types/search";
import { Post } from "@/types/post";
import useSearch from "@/hooks/useSearch";
import ControlBarMain from "@/app/components/ControlBarMain";
import { useEffect, useState } from "react";
import CardPost from "@/app/components/CardPost";
import NavigationNumberMain from "@/app/components/NavigationNumberMain";
import Footer from "@/app/components/Footer";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";


const searchPage = ({ params }: { params: ParmasKeyword }) => {
  const router = useRouter(); // Add this line
  const searchParams = useSearchParams(); // Add this line
  const queryClient = useQueryClient(); // Add this line

  const initialPage = parseInt(searchParams.get('page') || '1', 10); // Add this line
  const initialSortOption = searchParams.get('sort') || 'latest'; // Add this line

  const keyword = decodeURIComponent(params.keyword);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [sortOption, setSortOption] = useState<string>('latest');
  const [currentPage, setCurrentPage] = useState<number>(initialPage); // Change this line
  const [sortOption, setSortOption] = useState<string>(initialSortOption); // Change this line

  const { data, isLoading, isError, error } = useSearch(keyword, currentPage, sortOption);

  const totalPages = data?.totalPages;

  useEffect(()=>{ // Add this block
    router.push(`?page=${currentPage}&sort=${sortOption}`); 
    queryClient.invalidateQueries({queryKey: ['sortPosts', currentPage, sortOption]});
  }, [currentPage, sortOption]);

  useEffect(()=> { // Add this block
    const page = parseInt(searchParams.get('page') || '1', 10);
    const sort = searchParams.get('sort') || 'latest';
    setCurrentPage(page);
    setSortOption(sort);
  }, [searchParams]);

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
        <div className="flex flex-col gap-6 items-center mt-32">
          <p className="text-red-500 text-2xl font-bold">
            게시글이 존재하지 않습니다.
          </p>
          <Link href={'/'} className="text-blue-500 text-xl font-bold hover:opacity-60">돌아가기</Link>
        </div>
      )
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 max-w-[800px] min-h-[1100px] mx-auto mt-10 relative p-2">
        <div className="flex flex-col gap-3 mt-10">
          <ControlBarMain sortOption={sortOption}
            setSortOption={setSortOption}
            setCurrentPage={setCurrentPage} />
          {renderNoPostsFound()}
          {data?.content.map((post: Post) => (
            <CardPost key={post.id} post={post} />
          ))}
          <NavigationNumberMain currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalPage={totalPages}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default searchPage;