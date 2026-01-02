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
  width?: 'full' | 'withButton' | string; 
  isGrayBg?: boolean;
  isDouble?: boolean; 
  readOnly?: boolean; // 💡 추가됨
}

const AuthInput = ({
  label,
  placeholder,
  type = 'text',
  value = "",
  name,
  error,
  success,
  onChange,
  rightElement,
  className,
  width,
  isGrayBg,
  isDouble,
  readOnly,
}: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderClass = () => {
    if (error) return 'border-status-error';
    if (isFocused) return 'border-text-title';
    return 'border-neutral-40';
  };

  const getBgClass = () => {
    // 💡 readOnly이거나 isGrayBg일 때 회색 배경 적용
    if ((isGrayBg || readOnly) && !isFocused) return 'bg-neutral-20';
    return 'bg-white';
  };

  const resolvedWidth = (() => {
    if (width === 'full') return '320px';
    if (width === 'withButton') return '232px';
    if (width) return width;
    return rightElement ? '232px' : '320px';
  })();

  return (
    <div className={cn('flex flex-col text-left justify-start transition-all w-full', className)}>
      {label && (
        <div className="h-[28px] flex items-start">
          <Typography variant="body-2" weight="semi-bold" className="text-text-body">
            {label}
          </Typography>
        </div>
      )}

      <div className="flex items-center gap-2 h-[48px]">
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => !readOnly && setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={readOnly}
          style={{ width: resolvedWidth }}
          className={cn(
            'h-full px-[12px] border rounded-[8px] outline-none transition-all text-[14px] font-pretendard',
            'placeholder:text-text-body',
            getBgClass(),
            getBorderClass(),
            readOnly && "cursor-not-allowed opacity-70"
          )}
        />
        {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
      </div>

      {(error || success) ? (
        <div className="my-1.5 ml-2 flex items-start">
          <Typography variant="caption-2" weight="medium" className={error ? "text-status-error" : "text-status-abled"}>
            {error || success}
          </Typography>
        </div>
      ) : (
        <div className={cn(isDouble ? "h-[8px]" : "h-[24px]")} />
      )}
    </div>
  );
};

export default AuthInput;