import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import { useGetProfile } from '@/hooks/MyPage/useGetProfile';
import { TROPHY_ICONS } from '@/features/mypage/constants/trophyIcons';
import DaySpendIcon from '@/assets/icons/trophy/day_spend.svg?react';
import { formatCurrency } from '@/utils/formatCurrency';

const MyTrophy = () => {
  const { myTrophies, trophyGuide } = useGetProfile();

  return (
    <div className={cn('flex flex-col gap-[48px]')}>
      <div className={cn('flex flex-col gap-[20px]')}>
        <Typography style="text-body-1-16-semi-bold" className={cn('text-neutral-90')}>
          나의 트로피
        </Typography>

        <div className={cn('flex flex-col gap-[8px]')}>
          {myTrophies.map((trophy) => {
            const IconComponent = TROPHY_ICONS[trophy.iconKey];
            return (
              <div
                key={trophy.id}
                className={cn('flex flex-col px-[12px] py-[16px] rounded-[8px] shadow-trophy-card gap-[20px]')}
              >
                <div className={cn('flex items-center gap-[8px]')}>
                  <div className={cn('w-[32px] h-[32px]')}>
                    <IconComponent />
                  </div>

                  <Typography style="text-body-1-16-semi-bold" className={cn('text-neutral-90')}>
                    {trophy.title}
                  </Typography>

                  <div className={cn('flex px-[8px] py-[4px] bg-primary-normal rounded-full')}>
                    <Typography style="text-caption-2-11-medium" className={cn('text-neutral-90')}>
                      {trophy.badge}
                    </Typography>
                  </div>
                </div>

                <div className={cn('flex justify-between gap-[8px]')}>
                  <div className={cn('flex items-center')}>
                    <div className={cn('w-[24px] h-[24px] items-center justify-center flex')}>
                      <DaySpendIcon />
                    </div>
                    <Typography style="text-body-2-14-regular" className={cn('text-neutral-70')}>
                      {trophy.label}
                    </Typography>
                  </div>
                  <Typography style="text-body-2-14-semi-bold" className={cn('text-neutral-90')}>
                    {formatCurrency(trophy.currentValue)}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>

        {trophyGuide.map((guide) => {
          const IconComponent = TROPHY_ICONS[guide.iconKey];

          return (
            <div
              key={guide.id}
              className={cn('flex flex-col px-[12px] py-[16px] rounded-[8px] shadow-trophy-card gap-[20px]')}
            >
              <div className={cn('flex gap-[8px] items-center')}>
                <div className={cn('w-[32px] h-[32px]')}>
                  <IconComponent />
                </div>
                <Typography style="text-body-1-16-semi-bold" className={cn('text-neutral-50')}>
                  {guide.title}
                </Typography>
              </div>
              <Typography style="text-body-2-14-regular" className={cn('text-neutral-50')}>
                {guide.description}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTrophy;
