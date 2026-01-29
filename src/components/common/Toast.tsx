// src/components/common/Toast.tsx
import { Typography } from '@/components/typography';
import WarningIcon from '@/assets/icons/warning.svg';
import { cn } from '@/utils/cn';

export const Toast = ({ message, isOpen }: { message: string; isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[34px] w-full px-5 z-[9999]">
      <div
        className={cn(
          'flex items-center shadow-lg',
          'w-[320px] h-[48px] rounded-[8px] gap-2 px-[10px] py-3',
          'backdrop-blur-[8px]'
        )}
        style={{
          backgroundColor: 'rgba(23, 23, 20, 0.45)',
        }}
      >
        <img src={WarningIcon} alt="경고" className="w-6 h-6 flex-shrink-0" />

        <Typography variant="body-2" className="text-white flex-1 leading-[20px] text-[14px]">
          {message}
        </Typography>
      </div>
    </div>
  );
};
