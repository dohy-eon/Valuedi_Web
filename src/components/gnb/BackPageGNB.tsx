import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/Typography';
import BackPageIcon from '@/assets/icons/BackPage.svg';

export interface BackPageGNBProps {
  className?: string;
  title?: string;
  text?: string;
  onBack?: () => void;
  onSkip?: () => void;
}

const BackPageGNB: React.FC<BackPageGNBProps> = ({
  className,
  title = '목표 설정하기',
  text = '건너뛰기',
  onBack,
  onSkip,
}) => {
  return (
    <header className={cn('flex items-center justify-between w-[360px] h-[50px] px-[20px] bg-neutral-10', className)}>
      <div className="flex items-center justify-start">
        <button type="button" onClick={onBack} className="flex items-center justify-center cursor-pointer w-[24px]">
          <img src={BackPageIcon} alt="뒤로가기" />
        </button>
      </div>

      <Typography
        style="text-body-1-16-medium"
        fontFamily="pretendard"
        className={cn('text-center text-neutral-70 flex-1')}
      >
        {title}
      </Typography>

      <div className="flex items-center justify-end ">
        <button type="button" onClick={onSkip}>
          <Typography style="text-body-3-13-regular" fontFamily="pretendard" className="text-neutral-70 underline">
            {text}
          </Typography>
        </button>
      </div>
    </header>
  );
};

export default BackPageGNB;
