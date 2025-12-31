import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../Typography';

export interface CategoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  isSelected?: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ className, text = '전체', isSelected = false, ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center',
        'h-[32px]',
        'px-[12px] py-[8px]',
        'rounded-full',
        isSelected ? 'bg-primary-normal' : 'bg-neutral-10',
        className
      )}
      {...props}
    >
      <Typography
        variant="caption-1"
        weight={isSelected ? 'semi-bold' : 'regular'}
        className={cn('text-[12px] leading-[16px]', isSelected ? 'text-neutral-90' : 'text-neutral-70')}
        fontFamily="pretendard"
      >
        {text}
      </Typography>
    </button>
  );
};

export default CategoryButton;
