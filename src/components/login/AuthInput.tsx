import { ChangeEvent, useState, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../typography';

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
  timer?: string;
  className?: string;
  width?: 'full' | 'withButton';
  isGrayBg?: boolean;
  isDouble?: boolean;
  readOnly?: boolean;
}

const AuthInput = ({
  label,
  placeholder,
  type = 'text',
  value = '',
  name,
  error,
  success,
  onChange,
  rightElement,
  timer,
  className,
  width = 'full',
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
    if ((isGrayBg || readOnly) && !isFocused) return 'bg-neutral-20';
    return 'bg-white';
  };

  const inputId = `auth-input-${name}`;

  const inputBaseClass = cn(
    'h-12 px-3 border rounded-lg outline-none transition-all text-sm font-pretendard',
    'placeholder:text-text-body',
    getBgClass(),
    getBorderClass(),
    readOnly && 'cursor-not-allowed opacity-70'
  );

  return (
    <div className={cn('flex flex-col text-left justify-start transition-all w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="h-7 flex items-start">
          <Typography variant="body-2" weight="semi-bold" className="text-text-body" as="span">
            {label}
          </Typography>
        </label>
      )}

      {width === 'withButton' ? (
        <div className="flex w-full items-center gap-3">
          {/* ✅ input + timer를 같은 박스 안에 넣고 싶으면 relative */}
          <div className="relative flex-1 min-w-0">
            <input
              id={inputId}
              name={name}
              type={type}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              onFocus={() => !readOnly && setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              readOnly={readOnly}
              aria-label={label || placeholder || name}
              className={cn('w-full pr-14', inputBaseClass)}
            />
            {timer && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-60">{timer}</span>
            )}
          </div>

          {rightElement && <div className="shrink-0 whitespace-nowrap">{rightElement}</div>}
        </div>
      ) : (
        <div className="w-full">
          <input
            id={inputId}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={() => !readOnly && setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            readOnly={readOnly}
            aria-label={label || placeholder || name}
            className={cn('w-full', inputBaseClass)}
          />
        </div>
      )}

      {error || success ? (
        <div className="my-1.5 ml-2 flex items-start">
          <Typography variant="caption-2" weight="medium" className={error ? 'text-status-error' : 'text-status-abled'}>
            {error || success}
          </Typography>
        </div>
      ) : (
        <div className={cn(isDouble ? 'h-2' : 'h-6')} />
      )}
    </div>
  );
};

export default AuthInput;
