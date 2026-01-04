import { useState, ChangeEvent, useEffect } from 'react';
import { validatePassword, validateName, validateId, validateResident, validateEmail } from '@/utils/AuthValidator';

export const useAuthForm = () => {
  // --- 1. 상태 관리 ---
  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');
  const [idCheckError, setIdCheckError] = useState('');
  const [idCheckSuccess, setIdCheckSuccess] = useState('');

  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [confirmPwError, setConfirmPwError] = useState('');
  const [confirmPwSuccess, setConfirmPwSuccess] = useState('');

  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');

  // 인증번호 관련
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [verifySuccess, setVerifySuccess] = useState('');
  const [isRequested, setIsRequested] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 타이머 관련 (180초 = 3분)
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  // 주민등록번호 관련
  const [residentFront, setResidentFront] = useState('');
  const [residentBack, setResidentBack] = useState('');
  const [residentError, setResidentError] = useState('');

  // 이메일 관련
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // 💡 추가: 인증번호가 6자리인지 여부 (재전송 버튼 활성화용)
  const isVerifyCodeFull = verifyCode.length === 6;

  // --- 2. useEffect 로직 ---

  // 비밀번호 실시간 통합 검증
  useEffect(() => {
    const isPwInvalid = pw.length > 0 && !validatePassword(pw);
    setPwError(isPwInvalid ? '영문 대소문자, 숫자, 특수문자 포함 8~16자로 입력해주세요.' : '');

    if (confirmPw.length > 0) {
      if (pw !== confirmPw) {
        setConfirmPwError('비밀번호가 일치하지 않습니다.');
        setConfirmPwSuccess('');
      } else if (!isPwInvalid) {
        setConfirmPwError('');
        setConfirmPwSuccess('사용 가능한 비밀번호입니다.');
      }
    } else {
      setConfirmPwError('');
      setConfirmPwSuccess('');
    }
  }, [pw, confirmPw]);

  // 타이머 로직
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isTimerActive, timeLeft]);

  // --- 3. 핸들러 함수 ---

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    setNameError(value.length > 0 && !validateName(value) ? '올바르지 않은 이름 형식입니다.' : '');
  };

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setIsTyping(true);
    setIdError(value.length > 0 && !validateId(value) ? '올바른 아이디를 입력해주세요.' : '');
    setIdCheckSuccess('');
    setIdCheckError('');
  };

  const handleDuplicateCheck = () => {
    setIsTyping(false);
    if (!validateId(id)) {
      setIdCheckError('사용할 수 없는 아이디 형식입니다.');
      return;
    }
    if (id === 'user') setIdCheckError('이미 사용 중인 아이디입니다.');
    else setIdCheckSuccess('사용 가능한 아이디입니다.');
  };

  const handlePwChange = (e: ChangeEvent<HTMLInputElement>) => setPw(e.target.value);
  const handleConfirmPwChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPw(e.target.value);

  const handleVerifyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 💡 숫자만 입력 가능하도록 제한 (선택 사항)
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setVerifyCode(value);
    setVerifyError('');
    setVerifySuccess('');
  };

  // 💡 1. 인증번호 요청/재전송 시작
  const startVerification = () => {
    setIsRequested(true);
    setTimeLeft(180);
    setIsTimerActive(true);
    setIsVerified(false); // 재전송 시 인증 상태 초기화
    setVerifyCode('');    // 재전송 시 입력창 비우기
    setVerifyError('');
    setVerifySuccess('');
  };

  // 💡 2. 인증번호 실시간 검증 로직 (useEffect 추가)
  useEffect(() => {
    // 1. 아예 입력 안 했을 때는 메시지 표시 안 함
    if (verifyCode.length === 0) {
      setVerifyError('');
      setVerifySuccess('');
      return;
    }

    // 2. 오직 '123456'일 때만 성공 처리
    if (verifyCode === '123456') {
      setIsVerified(true);
      setIsTimerActive(false); // 타이머 정지
      setVerifySuccess('인증되었습니다.');
      setVerifyError('');
    } else {
      setIsVerified(false);
      setVerifyError('올바르지 않은 인증번호입니다.');
      setVerifySuccess('');
    }
  }, [verifyCode]);
  const canResend = (timeLeft <= 0 || (verifyCode.length > 0 && !isVerified)) && !isVerified;

  // 💡 3. 수동 확인 함수 (버튼용으로 유지하되 로직은 간소화)
  const handleVerifyButtonClick = () => {
    if (verifyCode.length < 6) {
      setVerifyError('인증번호 6자리를 입력해주세요.');
      return;
    }
    // 실제 검증은 위 useEffect에서 처리하므로 여기는 보조 역할
  };

  // 시간 포맷 (0:00)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // 주민등록번호 변경 핸들러
  const handleResidentChange = (front: string, back: string) => {
  setResidentFront(front);
  setResidentBack(back);

  if (front.length === 6 && back.length === 1) {
    if (!validateResident(front, back)) {
      setResidentError('올바르지 않은 주민등록번호입니다.');
    } else {
      setResidentError('');
    }
  } else {
    setResidentError('');
  }
};

const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setEmail(value);

  if (value.length === 0) {
    setEmailError('');
    return;
  }

  // 💡 실시간 이메일 형식 검증
  if (!validateEmail(value)) {
    setEmailError('올바르지 않은 이메일 형식입니다.');
  } else {
    setEmailError('');
  }
};

  // --- 4. 반환값 ---

  return {
    id, idError, idCheckError, idCheckSuccess,
    pw, pwError, confirmPw, confirmPwError, confirmPwSuccess,
    userName, nameError,
    verifyCode, verifyError, verifySuccess, isRequested, isVerified,
    isTyping, timeLeft, isTimerActive, isVerifyCodeFull, // 💡 isVerifyCodeFull 추가됨
    handleNameChange, handleIdChange, handleDuplicateCheck,
    handlePwChange, handleConfirmPwChange,
    handleVerifyButtonClick, handleVerifyCodeChange,
    startVerification, formatTime,
    canResend, // 💡 canResend 추가됨
    residentError,
    handleResidentChange,
    residentFront,
    residentBack, email,
  emailError,
  handleEmailChange,
  };
};