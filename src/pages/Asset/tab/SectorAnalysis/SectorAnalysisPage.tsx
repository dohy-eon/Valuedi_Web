import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@/components/typography';
import { formatCurrency } from '@/utils/formatCurrency';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { SectorListItem, SectorData } from './components/SectorListItem';
import { CATEGORY_STYLES, CATEGORY_LABELS } from '@/features/asset/constants/category';
import { cn } from '@/utils/cn';

export const SectorAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    // location.state에 저장된 날짜 정보가 있는지 확인
    const savedDate = location.state?.selectedDate;
    if (savedDate) {
      return new Date(savedDate);
    }
    return new Date(); // 없으면 오늘 날짜
  });

  // 💡 1. 이번 달 데이터 가져오기
  const { totalExpense, topSectors, otherCount, otherTotalAmount, topTotalAmount } = useGetAssetAnalysis(currentDate);

  // 💡 2. 지난달 데이터 가져오기 (지출 차액 계산용)
  const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const { totalExpense: lastMonthTotal } = useGetAssetAnalysis(lastMonthDate);

  // 💡 3. 차액 텍스트와 상태 분리
  const diff = totalExpense - lastMonthTotal;
  const isMore = diff > 0;
  const diffAmountText = formatCurrency(Math.abs(diff));

  // 날짜 핸들러
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // 💡 4. 연도 없이 월만 표시
  const monthDisplay = `${currentDate.getMonth() + 1}월`;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white pb-10">
      {/* 상단 날짜 선택 (월만 표시) */}
      <div className="flex items-center justify-start px-5 py-5 gap-1">
        <button onClick={handlePrevMonth} className="text-neutral-40 px-1 text-xl">
          {' '}
          ◀{' '}
        </button>
        <Typography variant="body-1" weight="bold" color="neutral-90">
          {monthDisplay}
        </Typography>
        <button onClick={handleNextMonth} className="text-neutral-40 px-1 text-xl">
          {' '}
          ▶{' '}
        </button>
      </div>

      {/* 3. 총 지출 요약 */}
      <div
        className="px-5 mb-4 cursor-pointer"
        onClick={() =>
          navigate('/asset/sector-full', {
            state: { selectedDate: currentDate },
          })
        }
      >
        <Typography variant="headline-1" weight="bold" color="neutral-90">
          {formatCurrency(totalExpense)}
        </Typography>

        <div className="pt-2 flex items-center gap-1">
          <Typography variant="body-3" weight="medium" color="neutral-60">
            지난 달보다 <span className="font-bold text-neutral-90">{diffAmountText}</span>
            {isMore ? ' 더 썼어요' : ' 덜 썼어요'}
          </Typography>
        </div>
      </div>

      {/* 4. 가로형 바 차트 */}
      <div className="px-5 mb-6">
        <div className="flex h-6 w-full rounded overflow-hidden gap-[2px] bg-neutral-10">
          {topSectors.map((item: SectorData) => {
            const style = CATEGORY_STYLES[item.key] || CATEGORY_STYLES.default;
            const chartWidth = topTotalAmount > 0 ? (item.amount / topTotalAmount) * 100 : 0;

            return (
              <div
                key={item.key}
                className={cn('h-full transition-all duration-500', style.barColor)}
                style={{ width: `${chartWidth}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* 5. 리스트 영역 */}
      <div className="flex flex-col w-full px-5">
        {topSectors.map((data: SectorData) => (
          <SectorListItem
            key={data.key}
            data={data}
            label={CATEGORY_LABELS[data.key] || CATEGORY_LABELS.default}
            onClick={() => {
              // 💡 [최적화 반영] 상세 페이지 이동 시 이미 계산된 데이터를 state로 넘깁니다.
              navigate(`/asset/sector/${data.key}`, { state: { sectorData: data } });
            }}
          />
        ))}

        {/* 6. 그외 N개 클릭 시 */}
        {otherCount > 0 && (
          <SectorListItem
            data={
              {
                key: 'others',
                amount: otherTotalAmount,
                percentage: 0,
                category: 'others',
                items: [],
              } as SectorData
            }
            label={`그외 ${otherCount}개`}
            onClick={() => navigate('/asset/sector-full', { state: { filter: 'others' } })}
          />
        )}
      </div>
    </div>
  );
};
