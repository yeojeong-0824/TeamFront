export type SignupData = {
  username: string;
  nickname: string;
  age: number;
  password: string;
  passwordConfirm: string;
  email: string;
  emailConfirm: string;
};

export type SignupRequest = {
  username: string;
  nickname: string;
  age: number;
  password: string;
  email: string;
};

export type CheckOldPassword = {
  password: string;
}

export type ChangeInfo = {
  nickname: string;
  age: number;
}