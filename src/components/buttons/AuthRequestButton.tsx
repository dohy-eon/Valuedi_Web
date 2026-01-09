import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../typography';

export interface AuthRequestButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const AuthRequestButton: React.FC<AuthRequestButtonProps> = ({ className, disabled, ...props }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex items-center justify-center',
        'w-[80px]', // 💡 이미지 비율에 맞춘 너비
        'h-[48px]', // 💡 요청하신 높이 수치
        'rounded-[8px]', // 💡 border-radius: 8px
        'transition-all outline-none',
        // 💡 이미지 속 '재전송' 버튼 스타일 반영
        disabled
          ? 'bg-neutral-10 cursor-not-allowed border-none' // 비활성화 시 연한 회색
          : 'bg-neutral-20 cursor-pointer border-none hover:bg-neutral-30 active:bg-neutral-40', // 활성화 시 스타일
        className
      )}
      {...props}
    >
      <Typography
        variant="body-2"
        weight="semi-bold"
        className={cn(
          'text-center whitespace-nowrap',
          // 💡 이미지 속 글자색 반영
          disabled ? 'text-neutral-40' : 'text-neutral-60'
        )}
      >
        재전송
      </Typography>
    </button>
  );
};

export default AuthRequestButton;
