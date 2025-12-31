import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../Typography';
import nullIconUrl from '@/assets/icons/Null.svg';

export interface KakaoContinueButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'white';
  text?: string;
}

const KakaoContinueButton: React.FC<KakaoContinueButtonProps> = ({
  className,
  variant = 'primary',
  text = '카카오 계정으로 계속하기',
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center',
        'w-[343px] h-[48px]',
        'rounded-[8px]',
        variant === 'primary' ? 'bg-primary-normal' : 'bg-neutral-0 border border-neutral-20',
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center mr-[8px]">
        <img src={nullIconUrl} width="18" height="18" alt="icon" />
      </span>

      <Typography
        variant="body-1"
        weight="semi-bold"
        className={cn('text-center', 'text-neutral-90')}
        fontFamily="pretendard"
      >
        {text}
      </Typography>
    </button>
  );
};

export default KakaoContinueButton;
