import { ChangeEvent, useState, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../Typography';

interface AuthInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  value: string;
  name: string;
  error?: string;
  success?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rightElement?: ReactNode;
  className?: string;
  width?: string;
  isGrayBg?: boolean;
}

const AuthInput = ({
  label,
  placeholder,
  type = 'text',
  value,
  name,
  error,
  success,
  onChange,
  rightElement,
  className,
  width,
  isGrayBg,
}: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  // 보더 컬러 로직
  const getBorderClass = () => {
    if (error) return 'border-status-error';
    if (isFocused) return 'border-text-title';
    return 'border-neutral-40';
  };

  // 배경색 로직
  const getBgClass = () => {
    if (isGrayBg && !isFocused) return 'bg-neutral-20';
    return 'bg-white';
  };

  return (
    <div className={cn('flex flex-col text-left', className)}>
      {label && (
        <Typography 
          style="text-body-2-14-semi-bold"
          className="text-text-body mb-2"
        >
          {label}
        </Typography>
      )}

      <div className="flex items-center gap-2">
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ width: width || (rightElement ? '232px' : '320px') }}
          className={cn(
            'h-[48px] px-[12px] border rounded-[8px] outline-none transition-all text-[14px] font-pretendard',
            'placeholder:text-text-body',
            getBgClass(),
            isFocused || value.length > 0 ? 'text-text-title placeholder:text-text-title' : 'text-text-title',
            getBorderClass()
          )}
        />
        {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
      </div>

      {(error || success) && (
        <div className="mt-1.5 ml-1">
          {error ? (
            <Typography style="text-caption-2-11-medium" className="text-status-error">
              {error}
            </Typography>
          ) : (
            <Typography style="text-caption-2-11-medium" className="text-status-abled">
              {success}
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthInput;