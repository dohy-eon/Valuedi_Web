import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../Typography';

export interface SmallLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
}

const SmallLoginButton: React.FC<SmallLoginButtonProps> = ({ className, text = '로그인', ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center',
        'h-[34px]',
        'px-[12px]',
        'py-[8px]',
        'rounded-[4px]',
        'bg-primary-normal',
        className
      )}
      {...props}
    >
      <Typography variant="body-2" weight="semi-bold" className="text-neutral-90 text-center" fontFamily="pretendard">
        {text}
      </Typography>
    </button>
  );
};

export default SmallLoginButton;
