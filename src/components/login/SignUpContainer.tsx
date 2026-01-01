import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/Typography';
import AuthInput from '@/components/login/AuthInput';
import { TermsAgreement } from '@/components/login/TermsAgreement';
import { useAuthForm } from '@/hooks/useAuthForm';
import DuplicateCheckButton from '@/components/buttons/DuplicateCheckButton';
import AuthRequestButton from '@/components/buttons/AuthRequestButton';
import AuthVerifyButton from '@/components/buttons/AuthVerifyButton';
import { LoginButton } from '../buttons';

interface SignUpContainerProps {
  className?: string;
  onSignUp?: (formData: any) => void;
}

const SignUpContainer: React.FC<SignUpContainerProps> = ({ onSignUp }) => {
  const auth = useAuthForm();

  // 💡 약관 동의 상태를 하위 컴포넌트로부터 받기 위한 상태 (또는 useAuthForm에 통합 권장)
  const [isTermsValid, setIsTermsValid] = useState(false);

  // 모든 필수 항목이 채워졌는지 확인 (버튼 활성화 로직)
    const isFormValid = !!(
  auth.id && !auth.idError &&
  auth.userName && !auth.nameError &&
  auth.isVerified &&
  auth.pw2 && !auth.pw2Error &&
  auth.confirmPw2Success &&
  isTermsValid
);

  return (
    <div 
      className={cn(
        'flex flex-col items-center bg-white justify-center',
      )}
    >
      {/* 2. 상단 헤더 영역 */}
      <div className="text-center space-y-4 my-4">
        <Typography variant="headline-1" weight="bold" className="text-neutral-100">
          회원가입
        </Typography>
        <Typography variant="body-2" className="text-neutral-60">
          당신을 위한 금융 서비스, 밸류디
        </Typography>
      </div>

      {/* 3. 입력 폼 리스트 */}
      <div className="flex flex-col w-full items-center mt-8">
        {/* 아이디 중복확인 */}
        <AuthInput
          label="아이디"
          value={auth.id}
          onChange={auth.handleIdChange}
          placeholder="아이디를 입력해주세요."
          error={auth.idError}
          rightElement={
            <DuplicateCheckButton 
              disabled={auth.id.length === 0} 
              onClick={() => console.log('중복확인')} 
            />
          }
        />

        {/* 이름 */}
        <AuthInput
          label="이름"
          value={auth.userName}
          onChange={auth.handleNameChange}
          placeholder="이름을 입력해주세요."
          error={auth.nameError}
        />

        {/* 전화번호 인증 섹션 */}
        <div className="flex flex-col w-full">
              <AuthInput
                label="전화번호"
                value={auth.phone}
                width="212px"
                onChange={auth.handlePhoneChange}
                placeholder="-없이 전화번호를 입력해주세요"
                isDouble={true}
                error={auth.phoneError}
                rightElement={
                  <AuthRequestButton 
                    disabled={auth.phone.length < 10 || !!auth.phoneError || auth.isVerified} 
                    isSent={auth.isRequested} 
                    onClick={() => auth.setIsRequested(true)} 
                  />
                }
              />
              <AuthInput
                name="auth_code"
                value={auth.verifyCode}
                width="232px" 
                isGrayBg={!auth.isRequested || auth.isVerified}
                onChange={(e) => auth.setVerifyCode(e.target.value)}
                placeholder="인증번호를 입력해주세요"
                error={auth.verifyError}
                success={auth.verifySuccess}
                rightElement={
                  <AuthVerifyButton 
                    disabled={!auth.isRequested || auth.verifyCode.length === 0 || auth.isVerified} 
                    onClick={auth.handleVerifyButtonClick} 
                  />
                }
              />
            </div>

        {/* 비밀번호 설정 */}
        <div className="flex flex-col w-full">
          <AuthInput
            label="비밀번호"
            type="password"
            value={auth.pw2}
            onChange={auth.handlePw2Change}
            placeholder="비밀번호를 입력해주세요."
            error={auth.pw2Error}
            isDouble={true}
          />
          <AuthInput
            type="password"
            value={auth.confirmPw2}
            onChange={auth.handleConfirmPw2Change}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            error={auth.confirmPw2Error}
            success={auth.confirmPw2Success}
          />
        </div>
      </div>

      {/* 4. 약관 동의 섹션: 320px 꽉 채움 및 구분선 적용 */}
      <div className="w-full">
        <TermsAgreement 
          onRequirementChange={(isValid) => setIsTermsValid(isValid)} 
        />
      </div>

      {/* 5. 회원가입 버튼 영역: mt-8(32px) 간격 및 320px 너비 */}
      <div className="w-full mt-8">
        <LoginButton
          text="회원가입하기"
          className={cn(
            'border-none rounded-[8px]',
            /* 💡 모든 필드 입력 + 필수 약관 동의 시 활성화 */
            !isFormValid 
              ? 'bg-atomic-yellow-70 cursor-not-allowed text-neutral-40' 
              : 'bg-atomic-yellow-50 hover:bg-atomic-yellow-40 text-neutral-100'
          )}
          disabled={!isFormValid}
          onClick={() => onSignUp?.(auth)}
        />
      </div>
    </div>
  );
};

export default SignUpContainer;