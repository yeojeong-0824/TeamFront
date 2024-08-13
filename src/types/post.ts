export type ParamsId = { id: number };

export type Post = {
  id: number;
  likeCount: number;
  memberNickname: string;
  satisfaction: number;
  title: string;
  view: number;
}

export interface CardPostProps {
  post: Post;
}