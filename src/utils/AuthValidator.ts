/**
 * 비밀번호 유효성 검사: 영문 대소문자, 숫자, 특수문자 포함 8~16자
 * 함수명: camelCase
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passwordRegex.test(password);
};

/**
 * 아이디 정책: 3자 이상 16자 이하, 영어 또는 숫자로 구성
 * (toLowerCase로 변환되므로 소문자와 숫자만 체크)
 */
export const validateId = (id: string): boolean => {
  const idRegex = /^[a-z0-9]{3,16}$/;
  return idRegex.test(id);
};

/**
 * 이름 형식 검사 (2자 이상 한글 또는 영문)
 */
export const validateName = (name: string): boolean => {
  // 1. 영문(대소문자) 또는 가-힣(완성형 한글)으로만 2~20자 구성되었는지 확인
  const nameRegex = /^[a-zA-Z가-힣]{2,20}$/;

  // 2. 단독 자음(ㄱ-ㅎ)이나 단독 모음(ㅏ-ㅣ)이 포함되어 있는지 별도로 체크
  const hasSingleJamo = /[ㄱ-ㅎㅏ-ㅣ]/.test(name);

  // 전체 형식이 맞으면서 + 단독 자모음이 없어야 true
  return nameRegex.test(name) && !hasSingleJamo;
};

/**
 * 전화번호 형식 검사:
 * 1. 0: 전화번호는 0으로 시작
 * 2. 한국 휴대폰 번호 기준 8자~10자
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^0\d{8,10}$/;

  return phoneRegex.test(phone);
};

export const validateRRNFront7 = (value: string) => {
  // 숫자 7자리인지
  if (!/^\d{7}$/.test(value)) return false;

  const yy = Number(value.slice(0, 2));
  const mm = Number(value.slice(2, 4));
  const dd = Number(value.slice(4, 6));
  const genderCode = Number(value[6]);

  // 월 / 일 범위
  if (mm < 1 || mm > 12) return false;
  if (dd < 1 || dd > 31) return false;

  // 성별 코드 (MVP 기준 1~4)
  if (![1, 2, 3, 4].includes(genderCode)) return false;

  // 날짜 유효성
  const fullYear = genderCode <= 2 ? 1900 + yy : 2000 + yy;
  const date = new Date(fullYear, mm - 1, dd);

  return date.getFullYear() === fullYear && date.getMonth() === mm - 1 && date.getDate() === dd;
};
