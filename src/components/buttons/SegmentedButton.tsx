import { cn } from '@/utils/cn';
import { Typography } from '@/components';

interface Option<T> {
  label: string;
  value: T;
}

interface SegmentedButtonProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  className?: string;
}

export const SegmentedButton = <T extends string>({ value, onChange, options, className }: SegmentedButtonProps<T>) => {
  return (
    <div className={cn('flex w-full p-[2px] rounded-[6px] bg-neutral-10', className)}>
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex-1 flex items-center justify-center px-[12px] py-[4px] gap-[10px] rounded-[4px] transition-all',
              isActive && 'bg-neutral-0 shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]'
            )}
          >
            <Typography
              style={isActive ? 'text-caption-1-12-medium' : 'text-caption-1-12-regular'}
              className={isActive ? 'text-neutral-90' : 'text-neutral-70'}
              fontFamily="pretendard"
            >
              {option.label}
            </Typography>
          </button>
        );
      })}
    </div>
  );
};
