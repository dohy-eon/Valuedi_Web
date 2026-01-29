import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/typography';
import { SectorChart } from '../components/SectorChart';
import { SectorChartSkeleton } from '../components/SectorChartSkeleton'; // 💡 1. 스켈레톤 임포트 추가!
import { SectorData } from '../utils/sectorUtils';
import { Skeleton } from '@/components/skeleton/Skeleton'; // 💡 2. 텍스트용 스켈레톤

interface SectorSummarySectionProps {
  selectedDate: Date;
  totalAmount: number;
  sectorData: SectorData[];
  onPrev: () => void;
  onNext: () => void;
  diffAmountText: string;
  isMore: boolean;
  isLoading?: boolean;
}

export const SectorSummarySection = ({
  selectedDate,
  totalAmount,
  sectorData,
  onPrev,
  onNext,
  diffAmountText,
  isMore,
  isLoading = false, // 💡 3. 여기서 isLoading을 꼭 꺼내주세요!
}: SectorSummarySectionProps) => {
  const navigate = useNavigate();

  // ... (중간 데이터 가공 로직은 동일) ...
  const top5 = sectorData.slice(0, 5);
  const others = sectorData.slice(5);
  const otherTotalAmount = others.reduce((sum, item) => sum + item.amount, 0);
  const otherPercentage = others.reduce((sum, item) => sum + item.percentage, 0);

  const chartData = [
    ...top5,
    ...(otherTotalAmount > 0
      ? [{ key: 'others', amount: otherTotalAmount, percentage: otherPercentage, category: 'others', items: [] }]
      : []),
  ];

  const monthDisplay = `${selectedDate.getMonth() + 1}월`;

  return (
    <section className="px-5 pt-5 pb-5 bg-white flex flex-col items-start">
      {/* 📅 날짜 선택 */}
      <div className="flex items-center gap-1 mb-4">
        <button onClick={onPrev} className="text-neutral-40 px-1 text-xl">
          ◀
        </button>
        <Typography variant="body-1" weight="bold" color="neutral-90">
          {monthDisplay}
        </Typography>
        <button onClick={onNext} className="text-neutral-40 px-1 text-xl">
          ▶
        </button>
      </div>

      {/* 💰 이번 달 총 지출 금액 섹션 */}
      <div
        onClick={() => !isLoading && navigate('/asset/sector-full', { state: { selectedDate } })}
        className="cursor-pointer active:opacity-70 transition-opacity"
      >
        {/* 💡 4. 로딩 중일 때는 금액 대신 스켈레톤 표시 */}
        {isLoading ? (
          <Skeleton className="w-32 h-8 mb-2 rounded" />
        ) : (
          <Typography variant="headline-1" weight="bold" color="neutral-90" className="mb-1">
            {totalAmount.toLocaleString()}원
          </Typography>
        )}
      </div>

      {/* 📉 지난달 비교 문구 섹션 */}
      {isLoading ? (
        <Skeleton className="w-48 h-4 mb-5 rounded" />
      ) : (
        <Typography variant="body-3" color="neutral-50" className="mb-4">
          지난 달 같은 기간보다 <span className="text-neutral-90 font-bold text-[13px]">{diffAmountText}원</span>
          {isMore ? ' 더 ' : ' 덜 '} 썼어요
        </Typography>
      )}

      {/* 📊 차트 섹션 */}
      <div className="w-full flex justify-center mb-0">
        {/* 💡 5. 로딩 중일 때는 차트 대신 아까 만든 차트 스켈레톤 표시! */}
        {isLoading ? <SectorChartSkeleton /> : <SectorChart data={chartData} />}
      </div>
    </section>
  );
};
