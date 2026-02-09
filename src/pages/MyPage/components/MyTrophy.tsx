import { useState, useMemo } from 'react';
import { Typography } from '@/components';
import { cn } from '@/utils/cn';
import { TROPHY_ICONS } from '@/features/mypage/constants/trophyIcons';
import DaySpendIcon from '@/assets/icons/trophy/day_spend.svg?react';
import { formatCurrency } from '@/utils/formatCurrency';
import { getTrophyIconByType } from '@/features/mypage/utils/trophyIconMapper';
import { useTrophies, useMyTrophies, type PeriodType } from '@/features/trophy';
import { SegmentedButton } from '@/components/buttons/SegmentedButton';

const MyTrophy = () => {
  const [periodType, setPeriodType] = useState<PeriodType>('MONTHLY');

  // periodKey 계산
  const periodKey = useMemo(() => {
    const now = new Date();
    if (periodType === 'MONTHLY') {
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    } else if (periodType === 'DAILY') {
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    } else {
      // LAST_30_DAYS
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
  }, [periodType]);

  // 전체 트로피 목록 조회
  const { data: allTrophies = [], isLoading: isLoadingAll, isError: isErrorAll } = useTrophies();

  // 내 트로피 현황 조회
  const { data: myTrophies = [], isLoading: isLoadingMy, isError: isErrorMy } = useMyTrophies({
    periodType,
    periodKey,
  });

  // 전체 트로피 목록에 획득 여부 정보 추가
  const allTrophiesWithStatus = useMemo(() => {
    if (!Array.isArray(allTrophies) || !Array.isArray(myTrophies)) return [];
    const myTrophyMap = new Map(myTrophies.map((t) => [t.trophyId, t]));
    return allTrophies.map((trophy) => {
      const myTrophy = myTrophyMap.get(trophy.trophyId);
      return {
        ...trophy,
        achievedCount: myTrophy?.achievedCount || 0,
        metricValue: myTrophy?.metricValue || null,
        isEarned: (myTrophy?.achievedCount || 0) > 0,
      };
    });
  }, [allTrophies, myTrophies]);

  const periodOptions = [
    { label: '일간', value: 'DAILY' as const },
    { label: '월간', value: 'MONTHLY' as const },
    { label: '최근 30일', value: 'LAST_30_DAYS' as const },
  ];

  const isLoading = isLoadingAll || isLoadingMy;

  return (
    <div className={cn('flex flex-col gap-[24px]')}>
      {/* 기간 선택 */}
      <div className={cn('flex flex-col gap-[12px]')}>
        <Typography style="text-body-2-14-regular" className={cn('text-neutral-70')}>
          조회 기간
        </Typography>
        <SegmentedButton<PeriodType> value={periodType} onChange={setPeriodType} options={periodOptions} />
      </div>

      {/* 전체 트로피 목록 */}
      <div className={cn('flex flex-col gap-[20px]')}>
        <Typography style="text-body-1-16-semi-bold" className={cn('text-neutral-90')}>
          트로피
        </Typography>

        {isLoading ? (
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-50')}>
            로딩 중...
          </Typography>
        ) : isErrorAll || isErrorMy ? (
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-50')}>
            트로피를 불러오는 중 오류가 발생했습니다.
          </Typography>
        ) : allTrophies.length === 0 ? (
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-50')}>
            트로피가 없습니다.
          </Typography>
        ) : (
          <div className={cn('flex flex-col gap-[8px]')}>
            {allTrophiesWithStatus.map((trophy) => {
              const iconKey = getTrophyIconByType(trophy.type);
              const IconComponent = TROPHY_ICONS[iconKey];
              const isEarned = trophy.isEarned;

              return (
                <div
                  key={trophy.trophyId}
                  className={cn(
                    'flex flex-col px-[12px] py-[16px] rounded-[8px] shadow-trophy-card gap-[20px]',
                    !isEarned && 'opacity-50' // 획득하지 않은 트로피는 흐리게 표시
                  )}
                >
                  <div className={cn('flex items-center gap-[8px]')}>
                    <div className={cn('w-[32px] h-[32px]', !isEarned && 'opacity-60')}>
                      <IconComponent />
                    </div>

                    <Typography
                      style="text-body-1-16-semi-bold"
                      className={cn(isEarned ? 'text-neutral-90' : 'text-neutral-50')}
                    >
                      {trophy.name}
                    </Typography>

                    {isEarned && trophy.achievedCount > 0 && (
                      <div className={cn('flex px-[8px] py-[4px] bg-primary-normal rounded-full')}>
                        <Typography style="text-caption-2-11-medium" className={cn('text-neutral-90')}>
                          {periodType === 'MONTHLY' ? `이번달 ${trophy.achievedCount}번 달성` : `${trophy.achievedCount}번 달성`}
                        </Typography>
                      </div>
                    )}
                  </div>

                  <Typography style="text-body-2-14-regular" className={cn(isEarned ? 'text-neutral-70' : 'text-neutral-50')}>
                    {trophy.description}
                  </Typography>

                  {isEarned && trophy.metricValue && (
                    <div className={cn('flex justify-between gap-[8px]')}>
                      <div className={cn('flex items-center')}>
                        <div className={cn('w-[24px] h-[24px] items-center justify-center flex')}>
                          <DaySpendIcon />
                        </div>
                        <Typography style="text-body-2-14-regular" className={cn('text-neutral-70')}>
                          지표 값
                        </Typography>
                      </div>
                      <Typography style="text-body-2-14-semi-bold" className={cn('text-neutral-90')}>
                        {trophy.metricValue}
                      </Typography>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrophy;
