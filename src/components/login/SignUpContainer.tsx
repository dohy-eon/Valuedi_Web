import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components';
import { useNavigate } from 'react-router-dom';
import AuthInput from '@/components/login/AuthInput';
import { useAuthForm } from '@/hooks/SignUp/useAuthForm';
import DuplicateCheckButton from '@/components/buttons/DuplicateCheckButton';
import { LoginButton } from '../buttons';

interface SignUpContainerProps {
  className?: string;
}

const SignUpContainer: React.FC<SignUpContainerProps> = () => {
  const navigate = useNavigate();
  const auth = useAuthForm();

  const isFormValid = !!(
    auth.id &&
    !auth.idError &&
    !auth.idCheckError &&
    auth.idCheckSuccess &&
    !auth.nameError &&
    auth.rrnFront.length === 7 &&
    !auth.rrnError &&
    auth.pw &&
    !auth.pwError &&
    auth.confirmPw &&
    !auth.confirmPwError
  );
  return (
    <div className={cn('flex flex-col items-center bg-white justify-center')}>
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
          success={auth.idCheckSuccess}
          error={auth.idError || auth.idCheckError}
          rightElement={<DuplicateCheckButton disabled={auth.id.length === 0} onClick={auth.handleDuplicateCheck} />}
          name={''}
        />

        {/* 이름 */}
        <AuthInput
          label="이름"
          value={auth.userName}
          onChange={auth.handleNameChange}
          placeholder="이름을 입력해주세요."
          error={auth.nameError}
          name={''}
        />

        {/* 전화번호 인증 섹션 */}
        {/* <div className="flex flex-col w-full">
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
          /> */}
        {/* <AuthInput
            name="auth_code"
            value={auth.verifyCode}
            width="withButton"
            isGrayBg={!auth.isRequested || auth.isVerified}
            onChange={auth.handleVerifyCodeChange}
            readOnly={auth.isVerified}
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
        </div> */}

        {/*주민등록번호 입력 폼*/}
        <div className="flex flex-col w-full">
          <AuthInput
            label="주민등록번호"
            type="text"
            value={auth.rrnFront}
            onChange={auth.handleRrnFrontChange}
            placeholder="주민등록번호 앞 7자리"
            error={auth.rrnError}
            isDouble={true}
            name={''}
          />
        </div>

        {/* 비밀번호 설정 */}
        <div className="flex flex-col w-full">
          <AuthInput
            label="비밀번호"
            type="password"
            value={auth.pw}
            onChange={auth.handlePwChange}
            placeholder="비밀번호를 입력해주세요."
            error={auth.pwError}
            isDouble={true}
            name={''}
          />
          <AuthInput
            type="password"
            value={auth.confirmPw}
            onChange={auth.handleConfirmPwChange}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            error={auth.confirmPwError}
            success={auth.confirmPwSuccess}
            name={''}
          />
        </div>
      </div>

      {/* 5. 회원가입 버튼 영역 */}
      <div className="w-full mt-8">
        <LoginButton
          text="다음으로"
          className={cn(
            'border-none rounded-[8px]',
            !isFormValid
              ? 'bg-atomic-yellow-70 cursor-not-allowed text-neutral-40'
              : 'bg-atomic-yellow-50 hover:bg-atomic-yellow-40 text-neutral-100'
          )}
          disabled={!isFormValid}
          onClick={() => navigate('/signup/email')}
        />
      </div>
    </div>
  );
};

export default SignUpContainer;
