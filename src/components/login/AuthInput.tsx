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
  isDouble?: boolean; // 💡 비밀번호 확인 칸처럼 다음 인풋과 밀착시켜야 할 때 사용
  readOnly?: boolean;
  timer?: string;
  onFocus?: () => void;
}

const AuthInput = ({
  label, placeholder, type = 'text', value = '', name, error, success,
  onChange, rightElement, className, width, isGrayBg, isDouble, readOnly, timer, onFocus
}: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderClass = () => {
    if (error) return 'border-status-error';
    if (isFocused) return 'border-text-title';
    return 'border-neutral-40';
  };

  const getBgClass = () => {
    if ((isGrayBg || readOnly) && !isFocused) return 'bg-neutral-20';
    return 'bg-white';
  };

  const resolvedWidth = width === 'full' ? '320px' : width === 'withButton' ? '232px' : width || (rightElement ? '232px' : '320px');
  const inputId = `auth-input-${name}`;

  return (
    <div className={cn('flex flex-col text-left justify-start transition-all w-full', className)}>
      {/* 💡 1. 라벨 영역: label 프롭이 있을 때만 28px 공간을 차지함 */}
      {label && (
        <div className="h-[28px] flex items-start">
          <label htmlFor={inputId}>
            <Typography variant="body-2" weight="semi-bold" className="text-text-body" as="span">
              {label}
            </Typography>
          </label>
        </div>
      )}

      {/* 💡 2. 입력창 영역: 고정 48px */}
      <div className="flex items-center gap-2 h-[48px]">
        <div className="relative flex items-center h-full" style={{ width: resolvedWidth }}>
          <input
            id={inputId}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={() => {
              if (!readOnly) {
                setIsFocused(true);
                onFocus?.();
              }
            }}
            onBlur={() => setIsFocused(false)}
            readOnly={readOnly}
            className={cn(
              'h-full w-full px-[12px] border rounded-[8px] outline-none transition-all text-[14px] font-pretendard bg-white',
              getBgClass(), getBorderClass(),
              readOnly && 'cursor-not-allowed opacity-70',
              timer && 'pr-[52px]'
            )}
          />
          
          {/* 타이머 표시: 포커스 시점이나 값이 있을 때 색상 강조 */}
          {timer && !success && (
            <span className={cn(
              "absolute right-[12px] top-1/2 -translate-y-1/2 z-50 text-[14px] font-medium pointer-events-none",
              isFocused || value.length > 0 ? "text-neutral-100" : "text-neutral-40"
            )}>
              {timer}
            </span>
          )}
        </div>
        
        {rightElement && <div className="flex-shrink-0 h-full flex items-center">{rightElement}</div>}
      </div>

      {/* 💡 3. 메시지 및 하단 여백 영역 */}
      <div className="flex flex-col">
        {/* 에러나 성공 메시지가 있을 때만 공간 차지 (mt-1.5 + h-18) */}
        {error || success ? (
          <div className="mt-1.5 ml-2 h-[18px]">
            <Typography variant="caption-2" weight="medium" className={error ? 'text-status-error' : 'text-status-abled'}>
              {error || success}
            </Typography>
          </div>
        ) : null}

        {/* 💡 핵심: 메시지가 없을 때 isDouble 여부에 따라 다음 인풋과의 간격(Margin) 결정 */}
        {!error && !success && (
          <div className={cn(isDouble ? 'h-[8px]' : 'h-[44px]')} />
        )}
        
        {/* 메시지가 있더라도 이중 확인 칸이라면 좁은 간격 유지 */}
        {(error || success) && <div className={cn(isDouble ? 'h-[8px]' : 'h-[20px]')} />}
      </div>
    </div>
  );
};

export default AuthInput;