export type ParamsId = { id: number };

export type CommentPost = {
  board: {
    id: number,
    locationName: string,
    formattedAddress: string,
    latitude: string,
    longitude: string,
    title: string,
    body: string,
    view: number,
    avgScore: number,
    commentCount: number,
    member: {
      id: number;
      nickname: string,
    },
    time: {
      createTime: string,
      updateTime: string
    }
  },

  commentList: CommentData[]
}

export type CommentData = {
  id: number,
  score: number,
  comment: string,
  member: {
    username: string,
    nickname: string,
    email: string,
    age: number
  },
  time: {
    createTime: string,
    updateTime: string
  }
}


export interface CommentPostProps {
  comment: CommentPost;
}