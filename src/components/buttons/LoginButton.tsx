import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../Typography';

export interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className, disabled, text = '로그인', ...props }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex items-center justify-center',
        'w-[320px] h-[48px]',
        'rounded-[8px]',
        disabled ? 'bg-primary-light cursor-not-allowed' : 'bg-primary-normal active:bg-atomic-yellow-40',
        className
      )}
      {...props}
    >
      <Typography
        variant="body-1"
        weight="semi-bold"
        className={cn('text-center', disabled ? 'text-neutral-50' : 'text-neutral-90')}
        fontFamily="pretendard"
      >
        {text}
      </Typography>
    </button>
  );
};

export default LoginButton;
