import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import MbtiIcon from '@/assets/icons/Mbti.svg?react';
import { LoginButton } from '@/components/buttons';
import BackPageGNB from '@/components/gnb/BackPageGNB';

interface MbtiIntroProps {
  onStart: () => void;
  onBack: () => void;
}

export const MbtiIntro = ({ onStart, onBack }: MbtiIntroProps) => {
  return (
    <div className={cn('flex flex-col h-full min-h-screen bg-neutral-0')}>
      <BackPageGNB onBack={onBack} title="" text="" />
      <div className={cn('flex flex-col flex-1 px-[20px]')}>
        <div className={cn('flex flex-col gap-[12px] mt-[20px]')}>
          <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90')}>
            나의 금융 MBTI를
            <br />
            찾아볼까요?
          </Typography>
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-70')}>
            사용자의 소비행태를 분석해요
          </Typography>
        </div>

        <div className={cn('flex items-center justify-center mt-[81px]')}>
          <MbtiIcon />
        </div>

        <div className={cn('flex flex-col items-center justify-center mt-[81px]')}>
          <button type="button" onClick={() => alert('준비 중')} className={cn('cursor-pointer px-[10px] py-[8px]')}>
            <Typography style="text-body-2-14-regular" className={cn('text-neutral-50')}>
              나중에 할게요
            </Typography>
          </button>
          <LoginButton text="검사 시작하기" onClick={onStart} />
        </div>
      </div>
    </div>
  );
};
