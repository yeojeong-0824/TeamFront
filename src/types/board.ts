export type post_type = { // 추후 API에 따라 타입 수정 예정
  post_id: number;
  user_name: string;
  time_ago: string;
  like_count: number;
  comment_count: number;
  title: string;
  body: string;
};

