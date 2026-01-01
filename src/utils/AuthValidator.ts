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
 * 1. 숫자만 포함되어야 함 (ddfkja 같은 문자 차단)
 * 2. 한국 휴대폰 번호 기준 10자~11자
 */
export const validatePhone = (phone: string): boolean => {
  // 숫자만 10자에서 11자 사이인지 확인하는 정규식
  const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
  
  return phoneRegex.test(phone);
};