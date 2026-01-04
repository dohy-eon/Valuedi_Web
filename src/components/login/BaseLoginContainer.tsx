import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/Typography';
import AuthInput from '@/components/login/AuthInput';
import LoginButton from '@/components/buttons/LoginButton';
import { useAuthForm } from '@/hooks/useAuthForm';

interface BaseLoginContainerProps {
  className?: string;
  onLogin?: (id: string, pw: string) => void;
}

const BaseLoginContainer: React.FC<BaseLoginContainerProps> = ({ className, onLogin }) => {
  const auth = useAuthForm();

  const isFormValid = auth.id.length > 0 && auth.pw.length > 0 && !auth.idError && !auth.pwError;

  return (
    <div className={cn('flex flex-col items-center bg-white ', className)}>
      {/* 1. 상단 텍스트 영역 */}
      <div className="text-center space-y-4 my-4">
        <div className="space-y-1">
          <Typography variant="headline-2" weight="bold" className="text-neutral-100">
            로그인하고
          </Typography>
          <Typography variant="headline-2" weight="bold" className="text-neutral-100">
            금융 목표를 이뤄보세요.
          </Typography>
        </div>
        <Typography variant="body-2" className="text-neutral-60">
          당신을 위한 금융 서비스, 밸류디
        </Typography>
      </div>

      {/* 2. 입력 폼 영역 */}
      <div className="flex flex-col gap-3 w-full items-center mt-8">
        <AuthInput
          label="아이디"
          name="id"
          value={auth.id}
          onChange={auth.handleIdChange}
          placeholder="아이디를 입력해주세요."
          error={auth.idError}
          width="full"
        />
        <AuthInput
          label="비밀번호"
          name="pw"
          type="password"
          value={auth.pw}
          onChange={auth.handlePwChange}
          placeholder="비밀번호를 입력해주세요."
          error={auth.pwError}
          width="full"
        />
      </div>

      {/* 3. 로그인 버튼 영역 */}
      <div className="w-full">
        <LoginButton
          text="로그인"
          className={cn(
            'border-none rounded-[8px]',
            !isFormValid ? 'bg-atomic-yellow-70 cursor-not-allowed' : 'bg-atomic-yellow-50 hover:bg-atomic-yellow-40'
          )}
          disabled={!isFormValid}
          onClick={() => onLogin?.(auth.id.toLowerCase(), auth.pw)}
        />
      </div>

      {/* 4. 하단 유틸리티 링크 */}
      <div className="flex items-center justify-between w-full mt-2">
        <div className="flex items-center gap-2">
          <button type="button" className="hover:underline text-neutral-60">
            <Typography variant="caption-1">아이디 찾기</Typography>
          </button>
          <div className="w-[1px] h-[10px] bg-neutral-20" />
          <button type="button" className="hover:underline text-neutral-60">
            <Typography variant="caption-1">비밀번호 찾기</Typography>
          </button>
        </div>
        <button type="button" className="hover:underline text-neutral-80">
          <Typography variant="caption-1">회원가입</Typography>
        </button>
      </div>
    </div>
  );
};

export default BaseLoginContainer;
