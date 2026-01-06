import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import MbtiCard from '@/components/mbti/MbtiCard';
import { MBTI_RESULTS } from '../constants/results';
import { LoginButton } from '@/components/buttons';
import BackPageGNB from '@/components/gnb/BackPageGNB';

interface MbtiResultProps {
  scores: Record<string, number>;
  onHome: () => void;
  onDetail: () => void;
}

export const MbtiResult = ({ scores, onHome, onDetail }: MbtiResultProps) => {
  // 나중에 scores를 이용해서 MBTI 타입을 계산하는 로직을 여기에 넣으면 됩니당
  const result = MBTI_RESULTS['DEFAULT'];

  return (
    <div className={cn('flex flex-col h-full min-h-screen bg-neutral-0 overflow-y-auto')}>
      <BackPageGNB className="w-full" onBack={onHome} text="결과 공유하기" title="" />

      <div className={cn('flex-1 flex flex-col items-center px-[20px] pb-[40px]')}>
        <MbtiCard
          mbtiType={result.mbtiType}
          subTitle={result.subTitle}
          description={result.description}
          icon={result.icon}
          className="mt-[20px]"
        />

        <div className={cn('flex flex-col items-center justify-center mt-[81px]')}>
          <button type="button" onClick={onDetail} className={cn('cursor-pointer px-[10px] py-[8px]')}>
            <Typography style="text-body-2-14-regular" className={cn('text-neutral-50')}>
              자세히 보고싶어요
            </Typography>
          </button>

          <LoginButton text="홈으로" onClick={onHome} />
        </div>
      </div>
    </div>
  );
};
