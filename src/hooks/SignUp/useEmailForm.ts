import { useEffect, useMemo, useRef, useState, ChangeEvent } from 'react';

const DEFAULT_SECONDS = 180;

export const useEmailForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [verifyCode, setVerifyCode] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [verifySuccess, setVerifySuccess] = useState('');

  const [isRequested, setIsRequested] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);

  const timerRef = useRef<number | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);

    if (value.length === 0) setEmailError('');
    else if (!/^\S+@\S+\.\S+$/.test(value)) setEmailError('이메일 형식이 올바르지 않습니다.');
    else setEmailError('');

    setIsRequested(false);
    setIsVerified(false);
    setVerifyCode('');
    setVerifyError('');
    setVerifySuccess('');
    setSecondsLeft(DEFAULT_SECONDS);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const handleVerifyCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerifyCode(value);
    setVerifyError('');
    setVerifySuccess('');
  };

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const canResend = useMemo(() => {
    return !!email && !emailError && !isVerified;
  }, [email, emailError, isVerified]);

  const startVerification = () => {
    if (!canResend) return;

    setIsRequested(true);
    setIsVerified(false);
    setVerifyCode('');
    setVerifyError('');
    setVerifySuccess('');
    setSecondsLeft(DEFAULT_SECONDS);

    if (timerRef.current) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const confirmVerification = () => {
    // 목업: 123456
    if (verifyCode === '123456') {
      setIsVerified(true);
      setVerifyError('');
      setVerifySuccess('인증되었습니다.');
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    } else {
      setIsVerified(false);
      setVerifyError('올바르지 않은 인증번호입니다.');
      setVerifySuccess('');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const timerText = isRequested ? formatTime(secondsLeft) : '03:00';

  const isStep2Valid = !!(email && !emailError && isVerified);

  return {
    email,
    emailError,
    verifyCode,
    verifyError,
    verifySuccess,
    isRequested,
    isVerified,
    secondsLeft,
    timerText,
    canResend,

    handleEmailChange,
    handleVerifyCodeChange,
    startVerification,
    confirmVerification,

    isStep2Valid,
  };
};
