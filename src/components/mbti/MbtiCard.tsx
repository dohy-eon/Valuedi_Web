import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '../typography';

export interface MbtiCardProps {
  mbtiType?: string;
  subDetail?: string;
  description?: string;
  className?: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const MbtiCard: React.FC<MbtiCardProps> = ({ mbtiType, subDetail, description, className, icon: Icon }) => {
  return (
    <div className={cn('w-[320px]', 'flex flex-col gap-[48px]', 'bg-neutral-0', className)}>
      <div className={cn('w-full flex flex-col gap-[12px]')}>
        <div className={cn('flex flex-col gap-[4px]')}>
          <Typography style="text-caption-1-12-regular" fontFamily="pretendard" className={cn('text-neutral-70')}>
            회원님의 결과는?
          </Typography>
          <Typography style="text-headline-3-18-semi-bold" fontFamily="pretendard" className={cn('text-neutral-90')}>
            {mbtiType}
          </Typography>
        </div>

        <Typography style="text-body-2-14-regular" fontFamily="pretendard" className={cn('text-neutral-70')}>
          {subDetail}
        </Typography>
      </div>

      <div className={cn('flex justify-center')}>{Icon && <Icon />}</div>

      {description && (
        <Typography style="text-body-2-14-regular" fontFamily="pretendard" className={cn('text-neutral-70')}>
          {description}
        </Typography>
      )}
    </div>
  );
};

export default MbtiCard;
