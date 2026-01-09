import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import { MoreViewButton } from '@/components/buttons';

interface MbtiDetailChartProps {
  leftLabel: string;
  rightLabel: string;
  leftScore: number;
  descriptionTitle: string;
  description: string;
}

export const MbtiDetailChart = ({
  leftLabel,
  rightLabel,
  leftScore,
  descriptionTitle,
  description,
}: MbtiDetailChartProps) => {
  return (
    <div className={cn('flex flex-col w-full gap-[8px]')}>
      <div className={cn('flex flex-col gap-[4px]')}>
        <div className={cn('flex justify-between items-center')}>
          <Typography style="text-body-1-16-semi-bold" className={cn('text-neutral-90')}>
            {leftLabel}
          </Typography>
          <Typography style="text-body-1-16-regular" className={cn('text-neutral-50')}>
            {rightLabel}
          </Typography>
        </div>

        <div className={cn('flex items-center')}>
          <Typography style="text-body-2-14-semi-bold" className={cn('text-neutral-90 w-[48px]')}>
            {leftScore}%
          </Typography>

          <div className={cn('flex-1 h-[8px] w-full bg-neutral-10 rounded-full gap-[10px]')}>
            <div className={cn('h-[8px] bg-primary-normal rounded-full')} style={{ width: `${leftScore}%` }} />
          </div>

          <Typography style="text-body-2-14-regular" className={cn('text-neutral-50 w-[48px] text-right')}>
            {100 - leftScore}%
          </Typography>
        </div>
      </div>

      <div className={cn('flex flex-col rounded-[8px] px-[8px] py-[12px] gap-[12px] bg-neutral-10')}>
        <Typography style="text-caption-1-12-semi-bold" className={cn('text-neutral-90')}>
          {descriptionTitle}
        </Typography>

        <div className={cn('flex flex-col gap-[8px]')}>
          <Typography style="text-caption-1-12-regular" className={cn('text-neutral-70')}>
            {description}
          </Typography>

          <div className={cn('flex gap-[4px]')}>
            <Typography style="text-caption-1-12-regular" className={cn('text-neutral-50')}>
              자세히보기
            </Typography>
            <MoreViewButton className={cn('rotate-90')} />
          </div>
        </div>
      </div>
    </div>
  );
};
