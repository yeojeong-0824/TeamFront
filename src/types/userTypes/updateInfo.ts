export type CheckOldPassword = {
  password: string;
}

export type UpdateUserInfo = {
  key: string;
  nickname: string;
  age: number;
}

export type UpdateUserPassword = {
  key: string,
  checkPassword: string,
  password: string
}