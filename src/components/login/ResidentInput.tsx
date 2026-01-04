import { useState, ChangeEvent } from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components';

interface ResidentInputProps {
  label?: string;
  error?: string;
  onResidentChange?: (front: string, back: string) => void;
}

const ResidentInput = ({ label = "주민등록번호", error, onResidentChange }: ResidentInputProps) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // 💡 입력 중이거나 포커스된 상태인지 확인
  const isEditing = isFocused || front.length > 0 || back.length > 0;

  const handleFrontChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setFront(val);
    onResidentChange?.(val, back);
    if (val.length === 6) document.getElementById('resident-back')?.focus();
  };

  const handleBackChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
    setBack(val);
    onResidentChange?.(front, val);
  };

  return (
    <div className="flex flex-col text-left justify-start w-[320px] h-[120px]">
      <div className="h-[28px] flex items-start">
        <Typography variant="body-2" weight="semi-bold" className="text-text-body">
          {label}
        </Typography>
      </div>

      <div 
        className={cn(
          "relative flex items-center h-[48px] px-[12px] border rounded-[8px] transition-all bg-white cursor-text",
          error ? "border-status-error" : isFocused ? "border-text-title" : "border-neutral-40"
        )}
        onClick={() => !isEditing && document.getElementById('resident-front')?.focus()}
      >
        {/* 💡 1. 기본 상태: 통으로 플레이스홀더만 보여줌 */}
        {!isEditing && (
          <span className="absolute left-[12px] text-[14px] text-neutral-40 font-pretendard pointer-events-none">
            주민등록번호 앞 7자리
          </span>
        )}

        {/* 💡 2. 클릭 시/입력 시: 앞자리 - 뒷자리 형식 등장 */}
        <div className={cn("flex items-center w-full", !isEditing && "opacity-0")}>
          <input
            id="resident-front"
            type="text"
            value={front}
            onChange={handleFrontChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-[80px] outline-none text-[14px] font-pretendard bg-transparent"
          />
          
          <span className="mx-1 text-neutral-40">-</span>

          <input
            id="resident-back"
            type="text"
            value={back}
            onChange={handleBackChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-[20px] outline-none text-[14px] font-pretendard bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        {error ? (
          <div className="mt-1.5 ml-2 h-[18px] flex items-start">
            <Typography variant="caption-2" weight="medium" className="text-status-error">
              {error}
            </Typography>
          </div>
        ) : (
          <div className="h-[44px]" />
        )}
      </div>
    </div>
  );
};

export default ResidentInput;