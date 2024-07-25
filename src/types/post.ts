export type Params_id = { id: number };

export type Post = {
  id: number;
  likeCount: number;
  memberNickname: string;
  satisfaction: number;
  title: string;
  view: number;
}

export interface Card_post_props {
  post: Post;
  handle_delete: (id: number) => void;
}