import { Typography } from '@/components/typography';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { CompareBar } from './CompareBar';
import { formatCurrency } from '@/utils/formatCurrency';
import { Skeleton } from '@/components/skeleton/Skeleton'; // 💡 1. 추가
import { CompareBarSkeleton } from './CompareBarSkeleton'; // 💡 2. 추가

// 💡 3. 인터페이스 추가
interface HistoryCompareSectionProps {
  isLoading?: boolean;
}

export const HistoryCompareSection = ({ isLoading = false }: HistoryCompareSectionProps) => {
  // 1. 월별 기준 날짜 생성
  const dateJan = new Date(2026, 0, 1);
  const dateDec = new Date(2025, 11, 1);
  const dateNov = new Date(2025, 10, 1);
  const dateOct = new Date(2025, 9, 1);

  // 2. 데이터 가져오기
  const { totalExpense: totalJan } = useGetAssetAnalysis(dateJan);
  const { totalExpense: totalDec } = useGetAssetAnalysis(dateDec);
  const { totalExpense: totalNov } = useGetAssetAnalysis(dateNov);
  const { totalExpense: totalOct } = useGetAssetAnalysis(dateOct);

  const diffAmount = Math.abs(totalJan - totalDec);
  const isReduced = totalJan < totalDec;
  const maxAmount = Math.max(totalOct, totalNov, totalDec, totalJan, 150000);

  return (
    <section className="px-5 py-8 bg-white pb-24">
      <Typography variant="headline-3" weight="bold" color="neutral-90" className="mb-1">
        소비내역 비교
      </Typography>

      {/* 💡 4. 문구 로딩 처리 */}
      {isLoading ? (
        <Skeleton className="w-56 h-4 mb-10 rounded" />
      ) : (
        <Typography variant="body-3" color="neutral-60" className="mb-10 leading-relaxed">
          소비내역이 지난 달보다 <span className="font-bold text-neutral-90">{formatCurrency(diffAmount)}</span>{' '}
          {isReduced ? '줄었어요' : '늘었어요'}
        </Typography>
      )}

      {/* 💡 5. 4개월치 바 차트 스켈레톤/실제 데이터 */}
      <div className="flex justify-between items-end gap-2 h-44 px-2">
        {isLoading ? (
          <>
            <CompareBarSkeleton />
            <CompareBarSkeleton />
            <CompareBarSkeleton />
            <CompareBarSkeleton/>
          </>
        ) : (
          <>
            <CompareBar label="10월" amount={totalOct} maxAmount={maxAmount * 1.2} />
            <CompareBar label="11월" amount={totalNov} maxAmount={maxAmount * 1.2} />
            <CompareBar label="12월" amount={totalDec} maxAmount={maxAmount * 1.2} />
            <CompareBar label="이번 달" amount={totalJan} isHighlight={true} maxAmount={maxAmount * 1.2} />
          </>
        )}
      </div>
    </section>
  );
};