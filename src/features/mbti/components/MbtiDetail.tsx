import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import { MbtiDetailChart } from './MbtiDetailChart';
import { MbtiResultType } from '../constants/results';
import { MbtiCard } from '@/components/mbti';

interface MbtiDetailProps {
  result: MbtiResultType;
  scores: Record<string, number>;
}

export const MbtiDetail = ({ result, scores }: MbtiDetailProps) => {
  return (
    <div className={cn('flex flex-col min-h-screen bg-neutral-0')}>
      <div className={cn('px-[20px]')}>
        <div className={cn('flex flex-col items-center')}>
          <MbtiCard
            mbtiType={result.mbtiType}
            subTitle={result.subTitle}
            description=""
            icon={result.icon}
            className="mt-[20px]"
          />

          <div className={cn('w-[320px] rounded-[12px] p-[12px] bg-neutral-10')}>
            <Typography style="text-body-2-14-regular" className={cn('text-neutral-70 whitespace-pre-line')}>
              {result.detailDescription}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-[32px] mt-[48px]">
          <div className="flex flex-col gap-[4px]">
            <Typography style="text-caption-1-12-regular" className="text-neutral-50">
              회원님의 MBTI 세부사항은?
            </Typography>
            <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90">
              {result.detailTitle}
            </Typography>
          </div>

          <div className="flex flex-col gap-[24px]">
            {result.traits.map((trait) => {
              const score = scores[trait.key] ?? 0;

              return (
                <MbtiDetailChart
                  key={trait.key}
                  leftLabel={trait.leftLabel}
                  rightLabel={trait.rightLabel}
                  leftScore={score}
                  descriptionTitle={trait.descriptionTitle}
                  description={trait.description}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-[69px] px-[20px] py-[12px] bg-neutral-10 gap-[8px] ">
        <Typography style="text-caption-2-11-regular" className="text-neutral-70 gap-[8px]">
          제공되는 정보는 금융감독원 23.06.15일 공시된 내용을 기반으로 작성되었으며, 어쩌구가 아니랍니다~~
          <br />
          실제 사용자의 금융정보와 차이가 있을 수 있으므로 꼭 다시 확인하시기 바랍니다.
        </Typography>
      </div>
    </div>
  );
};
