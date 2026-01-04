import { useState, ChangeEvent, useEffect } from 'react';
import { validatePassword, validateName, validateId, validateResident, validateEmail } from '@/utils/AuthValidator';
import { useTimer } from './useTimer'; // 💡 분리한 useTimer 훅 임포트

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

  // 💡 타이머 관련 로직 분리: useTimer 훅 사용
  const { 
    timeLeft, 
    isActive: isTimerActive, 
    startTimer, 
    stopTimer, 
    formatTime 
  } = useTimer(180);

  const [isTyping, setIsTyping] = useState(false);

  // 주민등록번호 관련
  const [residentFront, setResidentFront] = useState('');
  const [residentBack, setResidentBack] = useState('');
  const [residentError, setResidentError] = useState('');

  // 이메일 관련
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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

  // 💡 인증번호 실시간 검증 로직
  useEffect(() => {
    if (verifyCode.length === 0) {
      setVerifyError('');
      setVerifySuccess('');
      return;
    }

    if (verifyCode === '123456') {
      setIsVerified(true);
      stopTimer(); // 💡 인증 성공 시 타이머 정지
      setVerifySuccess('인증되었습니다.');
      setVerifyError('');
    } else {
      setIsVerified(false);
      setVerifyError('올바르지 않은 인증번호입니다.');
      setVerifySuccess('');
    }
  }, [verifyCode, stopTimer]);

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
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setVerifyCode(value);
    setVerifyError('');
    setVerifySuccess('');
  };

  // 💡 인증번호 요청/재전송 시작
  const startVerification = () => {
    setIsRequested(true);
    startTimer(); // 💡 useTimer의 시작 기능 호출
    setIsVerified(false);
    setVerifyCode('');
    setVerifyError('');
    setVerifySuccess('');
  };

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
    isTyping, timeLeft, isTimerActive, isVerifyCodeFull,
    handleNameChange, handleIdChange, handleDuplicateCheck,
    handlePwChange, handleConfirmPwChange,
    handleVerifyCodeChange,
    startVerification,
    formatTime: () => formatTime(timeLeft), // 💡 UI에서 바로 호출 가능하도록 전달
    canResend: (timeLeft <= 0 || (verifyCode.length > 0 && !isVerified)) && !isVerified,
    residentError,
    handleResidentChange,
    residentFront,
    residentBack, 
    email,
    emailError,
    handleEmailChange,
  };
};