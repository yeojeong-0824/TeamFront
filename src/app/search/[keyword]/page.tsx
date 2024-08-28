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
import LoadingSpinner from "@/app/components/Loading";

const SearchPage = ({ params }: { params: ParmasKeyword }) => {
  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  const queryClient = useQueryClient(); 

  const initialPage = parseInt(searchParams.get('page') || '1', 10); 
  const initialSortOption = searchParams.get('sort') || 'latest'; 

  const keyword = decodeURIComponent(params.keyword);
  const [currentPage, setCurrentPage] = useState<number>(initialPage); 
  const [sortOption, setSortOption] = useState<string>(initialSortOption);

  const { data, isLoading, isError, error } = useSearch(keyword, currentPage, sortOption);

  const totalPages = data?.totalPages;

  useEffect(() => { 
    router.push(`?page=${currentPage}&sort=${sortOption}`); 
    queryClient.invalidateQueries({ queryKey: ['sortPosts', currentPage, sortOption] });
  }, [currentPage, sortOption, queryClient, router]);

  useEffect(()=> {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const sort = searchParams.get('sort') || 'latest';
    setCurrentPage(page);
    setSortOption(sort);
  }, [searchParams]);

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
          <p className="text-gray-900 text-2xl font-bold">
            게시글이 존재하지 않습니다.
          </p>
          <Link href={'/'} className="text-blue-500 text-xl font-bold hover:text-blue-600">돌아가기</Link>
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
          {isLoading && <LoadingSpinner size={10} mt={40} />}
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

export default SearchPage;