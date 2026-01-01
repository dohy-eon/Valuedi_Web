import { useState, ChangeEvent } from 'react';
import { validatePassword, validateName, validatePhone, validateId } from '@/utils/AuthValidator';

export const useAuthForm = () => {
  // --- 상태 관리 ---
  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');

  const [idCheck, setIdCheck] = useState('');
  const [idCheckError, setIdCheckError] = useState('');
  const [idCheckSuccess, setIdCheckSuccess] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [verifySuccess, setVerifySuccess] = useState('');
  const [isRequested, setIsRequested] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [pw2, setPw2] = useState('');
  const [pw2Error, setPw2Error] = useState('');
  const [confirmPw2, setConfirmPw2] = useState('');
  const [confirmPw2Error, setConfirmPw2Error] = useState('');
  const [confirmPw2Success, setConfirmPw2Success] = useState('');

  // --- 핸들러 ---
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    setNameError(value.length > 0 && !validateName(value) ? '올바르지 않은 이름 형식입니다.' : '');
  };

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setIdError(value.length > 0 && !validateId(value) ? '올바른 아이디를 입력해주세요.' : '');
  };

  const handlePwChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPw(value);
    setPwError(value.length > 0 && !validatePassword(value) ? '영문 대소문자, 숫자, 특수문자 포함 8~16자로 입력해주세요.' : '');
  };

  const handleDuplicateCheck = () => {
    setIsTyping(false);
    if (!validateId(idCheck)) {
      setIdCheckError('사용할 수 없는 아이디 형식입니다.');
      setIdCheckSuccess('');
      return;
    }
    if (idCheck === 'test@naver.com') {
      setIdCheckError('이미 사용 중인 아이디입니다.');
      setIdCheckSuccess('');
    } else {
      setIdCheckError('');
      setIdCheckSuccess('사용 가능한 아이디입니다.');
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(value.length > 0 && !validatePhone(value) ? '올바르지 않은 전화번호 형식입니다.' : '');
  };

  const handleVerifyButtonClick = () => {
    if (verifyCode === '123456') {
      setIsVerified(true);
      setVerifyError('');
      setVerifySuccess('인증되었습니다.');
    } else {
      setIsVerified(false);
      setVerifyError('올바르지 않은 인증번호입니다.');
    }
  };

  const handlePw2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPw2(value);
    const isInvalid = value.length > 0 && !validatePassword(value);
    setPw2Error(isInvalid ? '영문 대소문자, 숫자, 특수문자 포함 8~16자로 입력해주세요.' : '');
    if (confirmPw2.length > 0) {
      if (value !== confirmPw2) {
        setConfirmPw2Error('비밀번호가 일치하지 않습니다.');
        setConfirmPw2Success('');
      } else if (!isInvalid) {
        setConfirmPw2Error('');
        setConfirmPw2Success('사용 가능한 비밀번호입니다.');
      }
    }
  };

  const handleConfirmPw2Change = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPw2(value);
    if (value.length > 0) {
      if (pw2 !== value) {
        setConfirmPw2Error('비밀번호가 일치하지 않습니다.');
        setConfirmPw2Success('');
      } else if (!pw2Error) {
        setConfirmPw2Error('');
        setConfirmPw2Success('사용 가능한 비밀번호입니다.');
      }
    } else {
      setConfirmPw2Error('');
      setConfirmPw2Success('');
    }
  };

  return {
    id, idError, pw, pwError, userName, nameError,
    idCheck, idCheckError, idCheckSuccess, isTyping, setIsTyping, setIdCheck,
    phone, phoneError, verifyCode, setVerifyCode, verifyError, verifySuccess, isRequested, setIsRequested, isVerified,
    pw2, pw2Error, confirmPw2, confirmPw2Error, confirmPw2Success,
    handleNameChange, handleIdChange, handlePwChange, handleDuplicateCheck,
    handlePhoneChange, handleVerifyButtonClick, handlePw2Change, handleConfirmPw2Change
  };
};