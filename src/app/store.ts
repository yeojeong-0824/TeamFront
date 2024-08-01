// store.ts
import { create } from 'zustand';

interface UserJwtInfo {
  username: string;
  age: number;
  set_username: (username: string) => void;
  set_age: (age: number) => void;
}

export const useUserJwtInfo = create<UserJwtInfo>((set) => ({
  username: '',
  age: 0,
  set_username: (username: string) => set({ username }),
  set_age: (age: number) => set({ age }),
}));


interface User_signup_info {
    username: string;
    nickname: string;
    name: string;
    password: string;
    email: string;
    age: number;
    set_username: (username: string) => void;
    set_nickname: (nickname: string) => void;
    set_name: (name: string) => void;
    set_password: (password: string) => void;
    set_email: (email: string) => void;
    set_age: (age: number) => void;
  }
  
  export const use_user_signup_info = create<User_signup_info>((set) => ({
    username: '',
    password: '',
    nickname: '',
    name: '',
    email: '',
    age: 0,
    set_username: (username: string) => set({ username }),
    set_nickname: (nickname: string) => set({ nickname }),
    set_name: (name: string) => set({ name }),
    set_password: (password: string) => set({ password }),
    set_email: (email: string) => set({ email }),
    set_age: (age: number) => set({ age }),
  }));
  
 export const url = process.env.NEXT_PUBLIC_API_URL
