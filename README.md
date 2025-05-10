# 여정

> 여정은 여행지에서의 감동과 추억을 함께 나누는 **커뮤니티 플랫폼**입니다.
>
> 사용자들은 자신이 경험한 특별한 장소를 소개하고, 후기를 통해 진정한 여행의 의미를 공유합니다.
>
> 여정은 다양한 여행지에서 얻을 수 있는 **실질적인 팁과 영감을 제공**합니다.

<br>

###

```
├── 게시글
│   ├── 구글 API를 활용한 위치 검색
│   ├── 게시글 작성 / 수정 / 삭제
│   ├── 게시글 읽기
│   ├── 게시글 검색
│   ├── 전체 게시글 읽기
│
├── 댓글
│   ├── 평점 작성
│   ├── 댓글 작성 / 수정 / 삭제
│
├── 회원
│   ├── 회원가입 / 로그인
│   ├── 회원 정보 수정
│   ├── 아이디/비밀번호 찾기
│   ├── 작성한 게시글 조회
│   ├── 작성한 댓글 조회
|
├── 메일
│   ├── 이메일 인증 메일
│   ├── 아이디 찾기 메일
│   ├── 비밀번호 찾기 메일
│   ├── 5개월 미접속시 알림 전
```

## 사용 기술

Next.js, Tailwinds.css, Tanstack-query, react-hook-form, react-quill, axios, next-ui, zustand, typescript

### 아키텍처

<img src="https://github.com/user-attachments/assets/1a984f5e-d593-45c3-a631-7432e528bef7">

## 팀소개

| 건우 | 은이 | 성빈 | 형준 |
| ---- | ---- | ---- | ---- |
| BE   | BE   | BE   | FE   |

# 🚀 프로젝트 시작 가이드

이 프로젝트는 **Next.js 14.2.7**을 기반으로 개발되었습니다.

## 1. 프로젝트 클론

```bash
git clone [REPOSITORY_URL]
cd [PROJECT_NAME]
```

## 2. 의존성 설치

아래 명령어 중 사용하는 패키지 매니저에 맞는 것을 실행하세요:

```bash
pnpm install
# 또는
npm install
# 또는
yarn install
```

## 3. 환경 변수 설정

프로젝트 루트 env파일에 해당 환경변수를 설정합니다.

```bash
NEXT_PUBLIC_API_URL=http://54.180.153.67:8080/
```

## 4. 개발 서버 시작

```bash
pnpm dev
# 또는
npm run dev
# 또는
yarn dev
```
