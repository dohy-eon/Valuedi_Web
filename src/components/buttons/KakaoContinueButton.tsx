import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../Typography';
import nullIconUrl from '@/assets/icons/Null.svg';

export interface KakaoContinueButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'white';
}

const KakaoContinueButton: React.FC<KakaoContinueButtonProps> = ({ className, variant = 'primary', ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center',
        'w-[360px] h-[48px]',
        'rounded-[8px]',
        variant === 'primary' ? 'bg-primary-normal' : 'bg-white border border-neutral-20',
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
        카카오 계정으로 계속하기
      </Typography>
    </button>
  );
};

export default KakaoContinueButton;
