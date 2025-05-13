export type ParamsId = { id: number };

export type Post = {
  image: string;
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
  };
  title: string;
  view: number;
  time: {
    createTime: string;
    updateTime: string;
  };
};

export interface CardPostProps {
  post: Post;
}
