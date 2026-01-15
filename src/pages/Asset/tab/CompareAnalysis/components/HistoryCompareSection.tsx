import { Typography } from '@/components/typography';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { CompareBar } from './CompareBar';
import { formatCurrency } from '@/utils/formatCurrency';

export const HistoryCompareSection = () => {
  // 1. 각 월별 기준 날짜 생성 (2026년 기준)
  const dateJan = new Date(2026, 0, 1); // 1월
  const dateDec = new Date(2025, 11, 1); // 12월
  const dateNov = new Date(2025, 10, 1); // 11월
  const dateOct = new Date(2025, 9, 1); // 10월

  // 2. 훅을 4번 호출해서 월별 총 지출액 가져오기 (이미 만든 훅이 효자네요! ㅋ)
  const { totalExpense: totalJan } = useGetAssetAnalysis(dateJan);
  const { totalExpense: totalDec } = useGetAssetAnalysis(dateDec);
  const { totalExpense: totalNov } = useGetAssetAnalysis(dateNov);
  const { totalExpense: totalOct } = useGetAssetAnalysis(dateOct);

  // 3. 텍스트용: 지난달(12월)과 이번 달(1월) 비교
  const diffAmount = Math.abs(totalJan - totalDec);
  const isReduced = totalJan < totalDec;

  // 4. 차트 비율을 위한 최대값 (전체 중 가장 큰 금액 기준)
  const maxAmount = Math.max(totalOct, totalNov, totalDec, totalJan, 150000);

  return (
    <section className="px-5 py-8 bg-white pb-24">
      <Typography variant="headline-3" weight="bold" color="neutral-90" className="mb-1">
        소비내역 비교
      </Typography>
      <Typography variant="body-3" color="neutral-60" className="mb-10 leading-relaxed">
        소비내역이 지난 달보다 <span className="font-bold text-neutral-90">{formatCurrency(diffAmount)}</span>{' '}
        {isReduced ? '줄었어요' : '늘었어요'}
      </Typography>

      {/* 4개월치 바 차트: 간격을 적절히 띄워서 4개가 다 보이게 배치 ㅋ */}
      <div className="flex justify-between items-end gap-2 h-44 px-2">
        <CompareBar label="10월" amount={totalOct} maxAmount={maxAmount * 1.2} />
        <CompareBar label="11월" amount={totalNov} maxAmount={maxAmount * 1.2} />
        <CompareBar label="12월" amount={totalDec} maxAmount={maxAmount * 1.2} />
        <CompareBar label="이번 달" amount={totalJan} isHighlight={true} maxAmount={maxAmount * 1.2} />
      </div>
    </section>
  );
};
