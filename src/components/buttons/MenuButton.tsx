import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../Typography';

export interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isSelected?: boolean;
  text?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ className, isSelected = false, text = '목표', ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center',
        'w-[112px]',
        'h-[48px]',
        'px-[20px]',
        'py-[12px]',
        'rounded-[8px]',
        isSelected ? 'bg-neutral-10' : 'bg-neutral-0',
        className
      )}
      {...props}
    >
      <Typography
        variant="body-1"
        weight={isSelected ? 'semi-bold' : 'regular'}
        className={cn('text-center', isSelected ? 'text-neutral-90' : 'text-neutral-70')}
        fontFamily="pretendard"
      >
        {text}
      </Typography>
    </button>
  );
};

export default MenuButton;
