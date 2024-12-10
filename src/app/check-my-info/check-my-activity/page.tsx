import ControlBarMain from "@/app/components/ControlBarMain";
import LoadingSpinner from "@/app/components/Loading";
import { useRouter } from "next/router";

export default function CheckMyInfo() {
  const router = useRouter(); 
  const searchParams = useSearchParams(); 

  const initialPage = parseInt(searchParams.get('page') || '1', 10); 
  const initialSortOption = searchParams.get('sort') || 'latest';

  const [currentPage, setCurrentPage] = useState<number>(initialPage); 
  const [sortOption, setSortOption] = useState<string>(initialSortOption); 

  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useSortPosts(currentPage || 1, sortOption);
  const totalPages = data?.totalPages;

  useEffect(() => {
    router.push(`?page=${currentPage}&sort=${sortOption}`);
    queryClient.invalidateQueries({ queryKey: ['sortPosts', currentPage, sortOption] });
  }, [currentPage, sortOption, queryClient, router]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['sortPosts', currentPage, sortOption] });
  }, [currentPage, sortOption, queryClient]);

  // 컴포넌트가 마운트될 때 상태 초기화
  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') || '1', 10);
    const newSortOption = searchParams.get('sort') || 'latest';
    setCurrentPage(newPage);
    setSortOption(newSortOption);
  }, []);

  // URL 변경 사항을 감지하여 상태 업데이트
  useEffect(() => {
    const newPage = parseInt(searchParams.get('page') || '1', 10);
    const newSortOption = searchParams.get('sort') || 'latest';
    setCurrentPage(newPage);
    setSortOption(newSortOption);
  }, [searchParams]);

  const renderNoPostsFound = () => {
    if (data?.content.length === 0) {
      return (
        <div className="flex justify-center mt-32">
          <p className="font-bold text-2xl text-gray-800">
            게시글이 존재하지 않습니다.
          </p>
        </div>
      )
    };
  };

  return (
    <div className="flex flex-col min-h-[1300px] gap-3">
      <ControlBarMain sortOption={sortOption}
        setSortOption={setSortOption}
        setCurrentPage={setCurrentPage} />
      {renderNoPostsFound()}
      <LoadingSpinner size={15} mt={400} isLoading={isLoading}/>
      {isError && <ErrorShow error={error?.message}/>}
      {data?.content.map((post: Post) => (
        <CardPost key={post.id} post={post} />
      ))}
      <NavigationNumberMain currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPages} />
    </div>
  );
}
