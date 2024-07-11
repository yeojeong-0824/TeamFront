// type 정의 import
import { post_type } from "../types/board";

// 컴포넌트 import
import Board_main_control_bar from "./components/Board_main_control_bar";
import Board_main_post_card from "./components/Board_main_post_card";
import Board_main_navigation_number from "./components/Board_main_navigation_number";
import Board_footer from "./components/Board_footer";

export default function Board_main() {
  // 가짜 body 텍스트
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";

  // 게시글에 사용될 가짜 데이터, (나중에 서버에서 받아올 데이터에선 구조 변경필요)
  const posts: post_type[] = [
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
      <main className="flex flex-col gap-3 mt-[100px] max-w-[800px] min-h-[1800px] mx-auto p-2">
        <Board_main_control_bar />

        {posts?.map((post) => (
          <Board_main_post_card post_data={post} key={post.post_id} />
        ))}
      </main>

      <Board_main_navigation_number />
      <Board_footer />
    </div>
  );
};
