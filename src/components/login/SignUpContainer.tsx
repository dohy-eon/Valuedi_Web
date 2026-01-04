import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components';
import AuthInput from '@/components/login/AuthInput'; 
import { TermsAgreement } from '@/components/login/TermsAgreement';
import { useAuthForm } from '@/hooks/useAuthForm'; 
import DuplicateCheckButton from '@/components/buttons/DuplicateCheckButton';
import AuthRequestButton from '@/components/buttons/AuthRequestButton'; 
import { LoginButton } from '../buttons';
import ResidentInput from './ResidentInput';

interface SignUpContainerProps {
  className?: string;
  onSignUp?: (formData: any) => void;
}

const SignUpContainer: React.FC<SignUpContainerProps> = ({ onSignUp }) => {
  const auth = useAuthForm();
  const [step, setStep] = useState<1 | 2>(1); // 💡 단계 관리를 위한 상태 추가
  const [isTermsValid, setIsTermsValid] = useState(false);

  // 1단계 유효성 검사 (아이디, 이름, 주민번호, 비밀번호)
  const isStep1Valid = !!(
    auth.id && !auth.idError && auth.idCheckSuccess &&
    auth.userName && !auth.nameError &&
    auth.residentFront.length === 6 && auth.residentBack.length === 1 && !auth.residentError &&
    auth.pw && !auth.pwError &&
    auth.confirmPwSuccess
  );

  // 2단계 유효성 검사 (이메일, 인증번호, 약관동의)
  const isStep2Valid = !!(
    auth.email && !auth.emailError &&
    auth.isVerified &&
    isTermsValid
  );

  // 💡 추가된 부분: 서버에 제출할 데이터 정리
  const handleSignUpSubmit = () => {
    const signUpData = {
      id: auth.id,
      userName: auth.userName,
      resident: `${auth.residentFront}-${auth.residentBack}`,
      password: auth.pw,
      email: auth.email,
    };
    onSignUp?.(signUpData);
  };

  return (
    <div className={cn('flex flex-col items-center bg-white justify-center w-full max-w-[400px] mx-auto')}>
      {/* 상단 헤더 영역 */}
      <div className="text-center space-y-4 my-4">
        <Typography variant="headline-1" weight="bold" className="text-neutral-100">
          회원가입
        </Typography>
        <Typography variant="body-2" className="text-neutral-60">
          당신을 위한 금융 서비스, 밸류디
        </Typography>
      </div>

      <div className="flex flex-col gap-3 w-full items-center mt-8">
        {/* 💡 STEP 1: 기본 정보 입력 */}
        {step === 1 && (
          <div>
            <AuthInput
              name="userId"
              label="아이디"
              value={auth.id}
              onChange={auth.handleIdChange}
              placeholder="아이디를 입력해주세요."
              success={auth.idCheckSuccess}
              error={auth.idError || auth.idCheckError}
              rightElement={<DuplicateCheckButton disabled={auth.id.length === 0} onClick={auth.handleDuplicateCheck} />}
            />
            <AuthInput
              name="userName"
              label="이름"
              value={auth.userName}
              onChange={auth.handleNameChange}
              placeholder="이름을 입력해주세요."
              error={auth.nameError}
            />
            <ResidentInput 
              label="주민등록번호"
              error={auth.residentError} 
              onResidentChange={(front, back) => auth.handleResidentChange(front, back)}
            />
            <div className="flex flex-col w-full">
              <AuthInput
                name="userPw"
                label="비밀번호"
                type="password"
                value={auth.pw}
                onChange={auth.handlePwChange}
                placeholder="비밀번호를 입력해주세요."
                error={auth.pwError}
                isDouble={true}
              />
              <AuthInput
                name="confirmPw"
                type="password"
                value={auth.confirmPw}
                onChange={auth.handleConfirmPwChange}
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                error={auth.confirmPwError}
                success={auth.confirmPwSuccess}
              />
            </div>
          </div>
        )}

        {/* 💡 STEP 2: 인증 및 약관 동의 */}
        {step === 2 && (
          <div>
            <AuthInput
              name="userEmail"
              label="이메일"
              value={auth.email}
              onChange={auth.handleEmailChange}
              placeholder="이메일을 입력해주세요."
              error={auth.emailError}
              width='full'
            />
            <AuthInput
              name="verifyCode"
              label="인증번호"
              value={auth.verifyCode}
              onChange={auth.handleVerifyCodeChange}
              placeholder="인증번호를 입력해주세요."
              width="withButton"
              success={auth.verifySuccess}
              error={auth.verifyError}
              readOnly={auth.isVerified}
              timer={auth.isRequested ? auth.formatTime() : "03:00"}
              onFocus={() => { if (!auth.isRequested) auth.startVerification(); }}
              rightElement={
                <AuthRequestButton 
                 disabled={!auth.canResend} 
                 onClick={auth.startVerification}
                />
              }
            />
            <div className="w-full mt-4">
              <TermsAgreement onRequirementChange={(isValid) => setIsTermsValid(isValid)} />
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="w-full flex items-center justify-center mt-8">
        {step === 1 ? (
          <LoginButton
            text="다음으로"
            className={cn(
              'border-none rounded-[8px]',
              !isStep1Valid ? 'bg-neutral-20 text-neutral-40' : 'bg-atomic-yellow-50 text-neutral-100'
            )}
            disabled={!isStep1Valid}
            onClick={() => setStep(2)} // 💡 2단계로 이동
          />
        ) : (
          <LoginButton
            text="회원가입하기"
            className={cn(
              'border-none rounded-[8px]',
              !isStep2Valid ? 'bg-neutral-20 text-neutral-40' : 'bg-atomic-yellow-50 text-neutral-100'
            )}
            disabled={!isStep2Valid}
            onClick={handleSignUpSubmit} // 💡 최종 제출
          />
        )}
      </div>
    </div>
  );
};

export default SignUpContainer;