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
git clone https://github.com/yeojeong-0824/TeamFront.git
cd TeamFront
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

# 화면 구성

## 1. 메인 페이지

메인 페이지는 다음과 같은 구성으로 되어 있습니다:

상단 헤더

좌측에 로고

우측에는 로그인 상태에 따라 다음 버튼이 표시됩니다:

비로그인 시: 로그인 / 회원가입

로그인 시: 로그아웃 / 회원정보

메인 기능 영역

글 작성 버튼

캘린더 페이지로 이동하는 버튼

검색 입력창

글 정렬을 선택할 수 있는 드롭다운(Select Box)

본문 영역

게시글 목록이 카드 또는 리스트 형태로 표시됩니다.

하단에는 페이지네이션 UI가 있으며, 이는 URL 쿼리로 현재 페이지를 관리합니다.

<img src="https://github.com/user-attachments/assets/1d478b72-43d5-463c-8cea-5ee48a398bdb" alt="메인 화면">

## 2. 로그인/회원가입 페이지

### 로그인 페이지

로그인 페이지는 다음과 같은 구성으로 되어 있습니다:

아이디와 비밀번호를 입력하는 폼(Form) 필드

폼 하단에는 다음으로 이동할 수 있는 텍스트 링크가 제공됩니다:

회원가입

아이디 찾기

비밀번호 찾기

<img src="https://github.com/user-attachments/assets/029352d1-a7b7-456f-9bd7-b2fb68052835" alt="로그인 화면">

### 회원가입 페이지

회원가입 페이지에서는 다음과 같은 입력 필드를 포함한 폼이 제공됩니다:

이메일, 이메일 확인

아이디, 닉네임, 나이

비밀번호, 비밀번호 확인

각 입력 필드는 실시간 검증(Validation)이 적용되며, 유효하지 않은 값을 입력할 경우 해당 input 하단에 유효성 검사 에러 메시지가 즉시 표시됩니다.

<img src="https://github.com/user-attachments/assets/159c3aad-412c-4a21-95e7-0ee8b09fcaf1" alt="회원가입 화면">

## 3. 아이디/비밀번호 찾기 페이지

아이디 찾기에선 유저의 이메일을 form에 입력하면 해당 이메일로 유저의 아이디가 전송됩니다.

<img src="https://github.com/user-attachments/assets/b27cfd9d-1be8-41de-9d16-3e6af2e7d2e8" alt="아이디찾기 화면">

비밀번호를 찾기 위해선 유저의 아이디와 이메일이 필요하며, 해당 이메일로 새로 생성된 랜덤 비밀번호가 전송됩니다.

<img src="https://github.com/user-attachments/assets/ceced1a6-d293-43ed-bbed-adf0e0525c09" alt="비밀번호찾기 화면">

## 4. 게시글 상세 페이지

게시글 상세 페이지에선 다음과 같은 구성으로 되어 있습니다.

게시글 제목단 (제목, 작성자 닉네임, 작성시간, 조회수 )

옵션 버튼 (수정, 삭제, 링크복사, 공유 버튼)

게시글 본문(텍스트, 이미지)

게시글 위치 정보

댓글 영역 (작성 박스, 댓글 리스트)

<img src="https://github.com/user-attachments/assets/fcdec60b-731b-429d-a611-79c5e050d345" alt="게시글상세 화면">

## 5. 게시글 작성 페이지

게시글 작성 페이지는 다음과 같은 구성으로 되어 있습니다.

지역 선택, 제목, 플랜 선택, 이미지 선택, 본문 UI

<img src="https://github.com/user-attachments/assets/07996593-4376-4416-97bb-73750f4498bb" alt="게시글 작성 기본 화면">

지역 선택 input에 지역을 검색하면 구글 지역 자동완성 API가 작동하여, 검색어와 관련된 지역들이 자동완성으로 출력되고 선택할 수 있습니다.

<img src="https://github.com/user-attachments/assets/7d7e48e9-1b38-40f5-ab83-a00e22ca0923" alt="게시글 작성 지역 선택UI">

<img src="https://github.com/user-attachments/assets/9c20104e-317c-4007-ad01-8ed236a66799" alt="게시글 작성 지역 선택완료UI">

플랜 목록에서 선택 버튼이 클릭하면 계정에 등록된 플랜들이 모달에서 조회되며 선택하여 게시글에 첨부할 수 있습니다.

<img src="https://github.com/user-attachments/assets/739702a1-7f15-465e-8362-c940074d5469" alt="게시글 작성 플랜 선택UI">

<img src="https://github.com/user-attachments/assets/5e238115-c302-4ab2-9fe7-455bb1e19fd0" alt="게시글 작성 플랜 선택완료UI">

## 6. 캘린더(플래너) 작성 페이지

캘린더는 단순 여행 일정 메모 용도와 게시글에 첨부하여 여행 일정을 다른 사람들에게 공유할 수 있는 기능을 제공합니다.

플랜 조회는 달력 UI를 사용해 달 별로 조회할 수 있습니다.

새 플랜을 작성하고 싶다면 파란색 플랜 추가 버튼을 클릭해 작성 페이지로 넘어갈 수 있습니다.

<img src="https://github.com/user-attachments/assets/799a64b9-a86f-4486-9bdd-7170cebf7a54" alt="캘린더 기본 화면">

해당 달에 플랜이 있다면 플랜들이 박스형태로 하단에 조회되며, 상세 플랜을 플랜 박스를 클릭해 모달로 확인합니다.

입력한 정보들이 모달에 출력됩니다.

하단 버튼들의 기능은 다음과 같습니다.

게시글 작성: 해당 플랜을 사용해 게시글 작성을 할 수 있는 페이지로 이동시킵니다.

일정 추가: 해당 플랜에서 추가 일정을 만듭니다.

플랜/일정 수정: 해당 플랜이나 세부 일정을 수정합니다.

플랜 삭제: 현재 플랜을 삭제합니다.

<img src="https://github.com/user-attachments/assets/66627a60-5cf9-4460-8803-8e9c4a5a604b" alt="캘린더 기본화면 모달">

먼저 플랜을 작성하기 위해 제목, 부제/설명, 인원수를 입력합니다.

<img src="https://github.com/user-attachments/assets/f2b089d1-1ec8-4a4e-bfb1-a1c6f653fae5" alt="캘린더 작성화면 1">

상세 일정을 작성하는 화면입니다.
날짜, 시작 시간, 교통 수단, 위치, 연락처, 이동 시간, 메모 등 상세 일정을 플랜에 추가합니다.
한 플랜안에 여러 개의 일정을 작성할 수 있습니다.

<img src="https://github.com/user-attachments/assets/8eb79ff8-3532-40e3-87f3-24b63d58c88a" alt="캘린더 작성화면2(일정작성)">

플랜 내부에 일정이 있을 경우 하단에 박스형태로 나열됩니다.

<img src="https://github.com/user-attachments/assets/5010a918-d0b9-4199-9fea-9dbe2aeaef04" alt="캘린더 작성화면2(일정작성완료)">

## 7. 회원정보 페이지

로그인 상태일 때 상단 헤더에 있는 회원정보 버튼을 클릭하면 회원정보 페이지로 이동됩니다.

요소들은 다음과 같습니다.

유저닉네임, 이메일 표시

내 정보 수정 버튼

비밀번호 변경 버튼

나의 활동 버튼

<img src="https://github.com/user-attachments/assets/e8beeb35-63a3-47c4-a238-30f4868ca47e" alt="회원정보 기본화면">

내 정보 수정 버튼을 눌러 페이지가 이동되면

먼저 비밀번호를 확인합니다.

<img src="https://github.com/user-attachments/assets/33f582ed-48d7-4b3a-8e6c-ceab1570a4b7" alt="내 정보 수정 초기화면">

계정에 맞는 비밀번호를 입력하여 통과한다면, 내 정보 수정을 할 수 있는 form이 등장합니다.

이메일, 아이디, 닉네임, 나이로 구성되어 있으며, 수정가능한 항목은 닉네임과 나이입니다.

<img src="https://github.com/user-attachments/assets/59cfcaa0-96ec-4532-91ad-5ecec0a4af1c" alt="내 정보 수정 화면">

비밀번호 변경 버튼을 눌러 페이지가 이동되면

앞서 과정과 같게 비밀번호를 확인하고(이미지 생략)

비밀번호, 비밀번호 확인이 존재하는 form으로 계정의 비밀번호를 변경할 수 있다.

<img src="https://github.com/user-attachments/assets/28a7ebfa-f437-4d1e-8f84-2a0e231d6abe" alt="비밀번호 변경 화면">

나의 활동 버튼을 눌러 페이지가 이동되면

내가 작성한 글/내가 쓴 댓글을 확인할 수 있다.

<img src="https://github.com/user-attachments/assets/c5672476-2d81-48a4-bfd1-26e89f9162fc" alt="나의 활동 작성 글화면">

<img src="https://github.com/user-attachments/assets/2d3c9e0a-21a3-49b7-a58e-f21cbc96a319" alt="나의 활동 댓글화면">
