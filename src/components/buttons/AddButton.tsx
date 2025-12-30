import React from 'react';
import { cn } from '@/utils/cn';

export interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ className, ...props }) => {
  const barBaseStyle = 'absolute bg-neutral-90 rounded-full';
  const barWidth = 'w-[3.14px]';
  const barHeight = 'h-[22px]';

  return (
    <button
      type="button"
      className={cn(
        'relative flex items-center justify-center',
        'w-[54px] h-[54px]',
        'rounded-full',
        'bg-primary-normal',
        'shadow-[4px_4px_4px_0_rgba(153,153,153,0.08)]',
        className
      )}
      {...props}
    >
      <span className={cn(barBaseStyle, barWidth, barHeight)} />
      <span className={cn(barBaseStyle, barWidth, barHeight, 'rotate-90')} />
    </button>
  );
};

export default AddButton;
