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
}: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderClass = () => {
    if (error) return 'border-status-error';
    if (isFocused) return 'border-text-title';
    return 'border-neutral-40';
  };

  const getBgClass = () => {
    if (isGrayBg && !isFocused) return 'bg-neutral-20';
    return 'bg-white';
  };

  const resolvedWidth = (() => {
    if (width === 'full') return '320px';
    if (width === 'withButton') return '232px';
    if (width) return width;
    return rightElement ? '232px' : '320px';
  })();

  return (
    <div 
      className={cn(
        'flex flex-col text-left justify-start transition-all w-full', 
        className
      )}
    >
      {/* 1. 라벨 영역 */}
      {label && (
        <div className="h-[28px] flex items-start">
          <Typography variant="body-2" weight="semi-bold" className="text-text-body">
            {label}
          </Typography>
        </div>
      )}

      {/* 2. 입력창 영역 (48px) */}
      <div className="flex items-center gap-2 h-[48px]">
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={isGrayBg && !isFocused}
          style={{ width: resolvedWidth }}
          className={cn(
            'h-full px-[12px] border rounded-[8px] outline-none transition-all text-[14px] font-pretendard',
            'placeholder:text-text-body',
            getBgClass(),
            isFocused || value.length > 0 ? 'text-text-title' : 'text-text-title',
            getBorderClass()
          )}
        />
        {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
      </div>

      {/* 3. 메시지 및 간격 영역 */}
      {(error || success) ? (
        <div className="my-1.5 ml-2 flex items-start">
          <Typography 
            variant="caption-2" 
            weight="medium" 
            className={error ? "text-status-error" : "text-status-abled"}
          >
            {error || success}
          </Typography>
        </div>
      ) : (
        /* 메시지가 없을 때 */
        <div className={cn(isDouble ? "h-[8px]" : "h-[24px]")} />
      )}
    </div>
  );
};

export default AuthInput;