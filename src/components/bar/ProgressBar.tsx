import React from 'react';
import { cn } from '@/utils/cn';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className, ...props }) => {
  const validPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div
      role="progressbar"
      aria-valuenow={validPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('w-[360px]', 'h-[1px]', 'bg-neutral-10', className)}
      {...props}
    >
      <div className={cn('h-full', 'bg-primary-normal', 'rounded-r-[4px]')} style={{ width: `${validPercentage}%` }} />
    </div>
  );
};

export default ProgressBar;
