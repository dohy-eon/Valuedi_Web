import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/typography';
import { formatCurrency } from '@/utils/formatCurrency';
import { useGetSectorAnalysis } from '@/hooks/Asset/useGetSectorAnalysis';
import { SectorListItem, SectorData } from './components/SectorListItem'; // 💡 SectorData 타입 임포트
import { CATEGORY_STYLES, CATEGORY_LABELS } from '@/features/asset/constants/category';
import { cn } from '@/utils/cn';

export const SectorAnalysis = () => {
  const navigate = useNavigate();

  // 1. 훅에서 모든 가공 데이터를 가져옵니다.
  // (이미 훅 내부에서 TransactionWithDetails 기반으로 정교하게 계산된 데이터들입니다)
  const { totalExpense, topSectors, otherCount, otherTotalAmount, topTotalAmount } = useGetSectorAnalysis();

  const [currentDate, setCurrentDate] = useState(new Date());

  // 날짜 핸들러
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  const monthDisplay = `${currentDate.getMonth() + 1}월`;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white pb-10">
      {/* 2. 상단 날짜 선택 */}
      <div className="flex items-center justify-start px-5 py-5 gap-1">
        <button onClick={handlePrevMonth} className="text-neutral-40 px-1 hover:bg-neutral-5 rounded transition-colors">
          ◀
        </button>
        <Typography variant="body-1" weight="bold" color="neutral-90">
          {monthDisplay}
        </Typography>
        <button onClick={handleNextMonth} className="text-neutral-40 px-1 hover:bg-neutral-5 rounded transition-colors">
          ▶
        </button>
      </div>

      {/* 3. 총 지출 요약 -> 전체 내역 주소로 이동 */}
      <div className="px-5 mb-4 cursor-pointer group" onClick={() => navigate('/asset/sector-full')}>
        <Typography variant="headline-1" weight="bold" color="neutral-90">
          {formatCurrency(totalExpense)}
        </Typography>
        <div className="pt-2 flex items-center gap-1">
          <Typography variant="body-3" weight="medium" color="neutral-60">
            지난 달보다 <span className="font-bold text-neutral-90">10만원</span> 덜 썼어요
          </Typography>
        </div>
      </div>

      {/* 4. 가로형 바 차트 */}
      <div className="px-5 mb-6">
        <div className="flex h-6 w-full rounded overflow-hidden gap-[2px] bg-neutral-10">
          {topSectors.map((item: SectorData) => {
            // 💡 item이 SectorData 타입이므로 key, amount에 안전하게 접근합니다.
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
            onClick={() => navigate(`/asset/sector/${data.key}`)}
          />
        ))}

        {/* 6. 그외 N개 클릭 시 -> filter: 'others' 상태를 들고 이동 */}
        {otherCount > 0 && (
          <SectorListItem
            data={
              {
                key: 'others',
                amount: otherTotalAmount,
                percentage: 0,
                category: 'others',
                items: [], // 💡 빈 배열을 넣어 SectorData 규격을 완벽히 맞춥니다.
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
