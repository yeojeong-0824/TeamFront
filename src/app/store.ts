// store.ts
import { useEffect } from 'react';
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



 // 인증토큰 상태값으로 불러오기
 interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearTokens: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null, // 초기 상태는 null로 설정
  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
    set({ accessToken: token });
  },
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ accessToken: null });
  },
}));

export const useAuthInitializer = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }
  }, [setAccessToken]);
};

export default useAuthStore;


// 로그인 함수 예시
const handleLogin = () => {
  const token = 'newAccessToken';
  useAuthStore.getState().setAccessToken(token); // Zustand에서 상태를 직접 업데이트
};