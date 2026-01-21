import { useEffect } from 'react';
import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import MbtiIcon from '@/assets/icons/Mbti.svg?react';
import { useMbtiActions } from '@/hooks/Mbti/useMbtiStore';

export const MbtiLoading = () => {
  const { setStep } = useMbtiActions();
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('result');
    }, 2500);
    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <div className={cn('flex flex-col h-full min-h-screen bg-neutral-0')}>
      <div className={cn('flex flex-col flex-1 px-[20px]')}>
        <div className={cn('flex flex-col gap-[12px] mt-[20px]')}>
          <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90')}>
            회원님의 금융 MBTI를
            <br />
            분석중이에요
          </Typography>
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-70 whitespace-pre-line')}>
            검사결과지를 바탕으로 MBTI를 분석 중이에요
            <br />
            잠시만 기다려 주세요.
          </Typography>
        </div>

        <div className={cn('flex items-center justify-center mt-[81px]')}>
          <MbtiIcon />
        </div>
      </div>
    </div>
  );
};
