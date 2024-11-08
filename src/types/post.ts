export type ParamsId = { id: number };

export type Post = {
  avgScore: number;
  commentCount: number;
  formattedAddress: string;
  id: number;
  latitude: number;
  locationName: string;
  longitude: number;
  member: {
    id: number;
    nickname: string;
  }
  title: string;
  view: number;
}

export interface CardPostProps {
  post: Post;
}