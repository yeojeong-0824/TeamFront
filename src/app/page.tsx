type post = {
  post_id: number;
  user_name: string;
  time_ago: string;
  like_count: number;
  comment_count: number;
  title: string;
  body: string;
};

export default function Community() {
  // 가짜 body 텍스트
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";

  // 게시글에 사용될 데이터, (나중에 서버에서 받아올 데이터)
  const posts: post[] = [
    {
      post_id: 1,
      user_name: "user1",
      time_ago: "약 1시간 전",
      like_count: 0,
      comment_count: 0,
      title: "TypeScript 오류 관련해서",
      body: lorem,
    },
    {
      post_id: 2,
      user_name: "user2",
      time_ago: "약 3시간 전",
      like_count: 1,
      comment_count: 3,
      title: "취업 관련해서 고민 상담 해주실 분..",
      body: lorem,
    },
    {
      post_id: 3,
      user_name: "user3",
      time_ago: "약 6시간 전",
      like_count: 2,
      comment_count: 6,
      title: "다들 안녕하세요!",
      body: lorem,
    },
    {
      post_id: 4,
      user_name: "user4",
      time_ago: "약 12시간 전",
      like_count: 3,
      comment_count: 4,
      title: "오늘 날씨가 좋진 않네요",
      body: lorem,
    },
    {
      post_id: 5,
      user_name: "user5",
      time_ago: "약 18시간 전",
      like_count: 4,
      comment_count: 13,
      title: "안녕하세요 1번째 글입니다.",
      body: lorem,
    },
  ];

  return (
    <div>
      <Header />

      <main className="flex flex-col gap-3 mt-[100px]">
        {posts.map((post) => (
          <Post post_data={post} />
        ))}
        {posts.map((post) => (
          <Post post_data={post} />
        ))}
        {posts.map((post) => (
          <Post post_data={post} />
        ))}
      </main>

      <Navigation_number />

      <Footer />
    </div>
  );
}

const Header = () => {
  return (
    <header className="flex justify-between fixed top-0 w-full py-5 px-1 bg-white border-b">
      <h1 className="text-2xl font-bold text-cente text-blue-500">Seoul Community</h1>
      <div className="flex gap-10 items-center">
        <div className="flex gap-1">
          <input type="text" className="border p-2 rounded-lg" />
          <button className="border p-2 rounded-lg text-white bg-blue-500 text-base">검색</button>
        </div>

        <div className="flex gap-2">
          <button className="p-2 rounded-xl bg-blue-500 text-white">로그인</button>
          <button className="p-2 rounded-xl bg-blue-500 text-white">회원가입</button>
        </div>
      </div>
    </header>
  )
}

const Post = ({ post_data }: { post_data: post }) => {
  const { user_name, time_ago, like_count, comment_count, title } = post_data;
  return (
    <div className="flex flex-col gap-3 w-[800px] mx-auto border p-5 rounded-md shadow-sm">

      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="font-semibold">{user_name}</p>
          <p className="text-sm">{time_ago}</p>
        </div>

        <div className="flex gap-3 items-center">
          <p className="text-sm">좋아요 {like_count}</p>
          <p className="text-sm">댓글 {comment_count}</p>
        </div>
      </div>

      <h3 className="font-bold">{title}</h3>

    </div>
  )
}

const Navigation_number = () => {
  const btn_style = "p-1 rounded-sm";
  return (
    <nav className="w-full h-[60px] flex justify-center items-center mt-3">
      <div className="w-[200px] flex justify-around">
        <button className={`btn_style underline text-blue-500`}>1</button>
        <button className={btn_style}>2</button>
        <button className={btn_style}>3</button>
        <button className={btn_style}>4</button>
        <button className={btn_style}>5</button>
        <button className={btn_style}>...</button>
      </div>
    </nav>
  )
}

const Footer = () => {
  return (
    <footer className="w-full min-h-[150px] py-3 border mt-[50px] bg-blue-500">
    </footer>
  )
}
