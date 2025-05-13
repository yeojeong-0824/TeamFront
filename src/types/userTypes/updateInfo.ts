export type CheckOldPassword = {
  password: string;
}

export type UpdateUserInfo = {
  nickname: string;
  age: number;
}

export type UpdateUserPassword = {
  checkPassword: string,
  password: string
}