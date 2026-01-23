import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import { useGetMbtiTestResult } from '@/hooks/Mbti/useGetMbtiTestResult';
import { MBTI_AXES } from '@/features/mbti/constants/mbtiData';
import { MbtiCard } from '@/components/mbti';
import { MbtiDetailChart } from './MbtiDetailChart';

export const MbtiDetail = () => {
  const { data, scores } = useGetMbtiTestResult();
  const traits = [
    { ...MBTI_AXES.EMOTION, score: scores.emotion, title: '감정' },
    { ...MBTI_AXES.CONTROL, score: scores.control, title: '자기조절' },
    { ...MBTI_AXES.RISK, score: scores.risk, title: '위험신호' },
    { ...MBTI_AXES.DECISION, score: scores.decision, title: '의사결정' },
  ];

  return (
    <div className={cn('flex flex-col min-h-screen bg-neutral-0 px-[20px] gap-[48px] pb-[60px]')}>
      <div className={cn('flex flex-col items-center')}>
        <MbtiCard mbtiType={data.title} subDetail={data.subDetail} icon={data.icon} className="mt-[20px]" />
      </div>

      <div className={cn('flex flex-col gap-[12px]')}>
        <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90')}>
          세부사항
        </Typography>
        <div className={cn('w-full rounded-[12px] p-[12px] bg-neutral-10')}>
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-70 whitespace-pre-wrap')}>
            {data.detail}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[4px]">
          <Typography style="text-caption-1-12-regular" className="text-neutral-50">
            회원님의 MBTI 세부사항은?
          </Typography>
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90">
            {data.subTitle}
          </Typography>
        </div>
        <div className="flex flex-col gap-[24px]">
          {traits.map((trait) => (
            <MbtiDetailChart
              key={trait.key}
              title={trait.title}
              leftLabel={trait.leftLabel}
              rightLabel={trait.rightLabel}
              leftScore={trait.score}
              descriptionTitle={`${trait.leftLabel}이란?`}
              description="안정적인 성향은 크게 돈을 잃지 않아 좋지만 때론 큰 기회를 놓칠 수 있어요."
            />
          ))}
        </div>
      </div>

      <div className={cn('flex flex-col gap-[12px]')}>
        <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90">
          주의할 점
        </Typography>
        <div className={cn('flex flex-col gap-[8px] p-[12px] rounded-[12px] bg-neutral-10')}>
          <Typography style="text-body-2-14-regular" className="text-neutral-70 whitespace-pre-line">
            {data.caution.join('\n')}
          </Typography>
        </div>
      </div>

      <div className={cn('flex flex-col gap-[12px]')}>
        <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90">
          추천하는 행동 및 습관
        </Typography>
        <div className={cn('flex flex-col gap-[8px] p-[12px] rounded-[12px] bg-neutral-10')}>
          <Typography style="text-body-2-14-regular" className="text-neutral-70 whitespace-pre-line">
            {data.habits.join('\n')}
          </Typography>
        </div>
      </div>
    </div>
  );
};
