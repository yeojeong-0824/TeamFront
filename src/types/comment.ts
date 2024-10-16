export type Comment = {
  id: number;
  score: number;
  comment: string;
}

export type CommentResponse = {
  id: number;
  score: number;
  comment: string;
  member: {
    id: number;
    nickname: string
  }
}

export type UpdateComment = {
  commentId: number;
  score: number;
  comment: string;
}