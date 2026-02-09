import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import { useGetProfile } from '@/hooks/MyPage/useGetProfile';
import { MbtiDetailChart } from '@/pages/Mbti/components/MbtiDetailChart';
import { calculateMbtiScores } from '@/utils/calculateMbtiScore';
import { formatMbtiDescription } from '@/utils/formatMbtiText';

const MyMbti = () => {
  const { mbtiResult, userName, isLoading } = useGetProfile();

  if (isLoading || !mbtiResult) return null;

  const traits = calculateMbtiScores(mbtiResult);

  return (
    <div>
      <div className={cn('w-[320px] flex flex-col gap-[12px] px-[12px] py-[16px]')}>
        <div className={cn('w-full flex flex-col gap-[12px]')}>
          <div className={cn('flex flex-col gap-[4px]')}>
            <Typography style="text-caption-1-12-regular" className={cn('text-neutral-70')}>
              {userName}님의 MBTI 결과예요
            </Typography>
            <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90')}>
              {mbtiResult?.title}
            </Typography>
          </div>
        </div>

        <div className="w-full h-[146px] rounded-[4px] flex items-center justify-center overflow-hidden">
          <mbtiResult.icon />
        </div>

        <div>
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-70')}>
            {mbtiResult.tagline}
          </Typography>
        </div>
      </div>

      <div className={cn('flex flex-col gap-[48px] mt-[48px]')}>
        <div className={cn('flex flex-col gap-[12px]')}>
          <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90')}>
            세부사항
          </Typography>
          <div className={cn('w-full rounded-[12px] p-[12px] bg-neutral-10')}>
            <Typography style="text-body-2-14-regular" className={cn('text-neutral-70 whitespace-pre-wrap')}>
              {formatMbtiDescription(mbtiResult.detail)}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          {traits.map((trait) => (
            <MbtiDetailChart
              key={trait.title}
              title={trait.title}
              leftLabel={trait.leftLabel}
              rightLabel={trait.rightLabel}
              leftScore={trait.leftScore}
              description={trait.description}
              details={trait.details}
            />
          ))}
        </div>

        <div className={cn('flex flex-col gap-[12px]')}>
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90">
            주의할 점
          </Typography>
          <div className={cn('flex flex-col p-[12px] rounded-[12px] bg-neutral-10')}>
            {mbtiResult.cautions?.map((text, i) => (
              <Typography key={i} style="text-body-2-14-regular" className="text-neutral-70 whitespace-pre-wrap">
                {formatMbtiDescription(text)}
              </Typography>
            ))}
          </div>
        </div>

        <div className={cn('flex flex-col gap-[12px]')}>
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90">
            추천하는 행동 및 습관
          </Typography>
          <div className={cn('flex flex-col p-[12px] rounded-[12px] bg-neutral-10')}>
            {mbtiResult.recommendedActions?.map((text, i) => (
              <Typography key={i} style="text-body-2-14-regular" className="text-neutral-70 whitespace-pre-wrap">
                {formatMbtiDescription(text)}
              </Typography>
            ))}
          </div>
        </div>

        <div className={cn('flex gap-[8px] bg-neutral-10 px-[20px] py-[12px] -mx-[20px]')}>
          <Typography
            style="text-caption-2-11-regular"
            className="text-neutral-70 whitespace-pre-line text-center w-full"
          >
            {`본 금융 MBTI 결과는 참고용 분석 결과입니다.\n 설문 응답에 기반한 성향 추정이므로, 실제 개인의 금융 상황 및 투자 성과와는 차이가 있을 수 있습니다.\n 금융 의사결정 시에는 반드시 추가적인 정보 확인을 하시기 바랍니다.`}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MyMbti;
