export const usernameV = {
  required: '사용자명을 입력하세요',
  minLength: {
    value: 5,
    message: '사용자명은 5글자 이상이어야 합니다.',
  },
  maxLength: {
    value: 30,
    message: '사용자명은 30글자 이하여야 합니다.',
  },
};

export const nicknameV = {
  required: '닉네임을 입력하세요',
  minLength: {
    value: 1,
    message: '닉네임은 1글자 이상이어야 합니다.',
  },
  maxLength: {
    value: 10,
    message: '닉네임은 10글자 이하여야 합니다.',
  },
};

export const emailV = {
  required: '이메일을 입력하세요',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '이메일 형식이 아닙니다.',
  },
};

export const emailConfirmV = {
  required: '이메일 인증번호를 입력하세요'
}

export const passwordV = {
  required: '비밀번호를 입력하세요',
  minLength: {
    value: 8,
    message: '비밀번호는 8글자 이상이어야 하며, 영문 및 숫자를 포함해야 합니다.',
  }
};

export const passwordConfirmV = {
  required: '비밀번호를 다시 입력하세요',
  validate: (value: string, values: any) => {
    return value === values.password || '비밀번호가 일치하지 않습니다.';
  },
};

export const ageV = {
  required: '나이를 입력하세요',
  min: {
    value: 1,
    message: '나이는 1세 이상이어야 합니다.',
  },
  max: {
    value: 100,
    message: '100세 이상은 가입할 수 없습니다.',
  },
};