export type SignupData = {
  username: string;
  nickname: string;
  age: number;
  oldPassword: string;
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