import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../Typography';

export interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className, disabled, ...props }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex items-center justify-center',
        'w-[360px] h-[48px]',
        'rounded-[8px]',
        disabled ? 'bg-neutral-20 cursor-not-allowed' : 'bg-primary-normal',
        className
      )}
      {...props}
    >
      <Typography
        variant="body-1"
        weight="semi-bold"
        className={cn('text-center', disabled ? 'text-neutral-60' : 'text-neutral-90')}
        fontFamily="pretendard"
      >
        로그인
      </Typography>
    </button>
  );
};

export default LoginButton;
