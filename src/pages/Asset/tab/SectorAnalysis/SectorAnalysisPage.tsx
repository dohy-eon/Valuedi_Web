import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { SectorSummarySection } from './sections/SectorSummarySection';
import { SectorListSection } from './sections/SectorListSection';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { transformToCategoryGroups } from './utils/sectorUtils';

export const SectorAnalysis = () => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date>(
    location.state?.selectedDate ? new Date(location.state.selectedDate) : new Date()
  );
  // 💡 1. 이번 달 데이터 가져오기
  const { totalExpense, transactions } = useGetAssetAnalysis(selectedDate);
  const sectorData = transformToCategoryGroups(transactions, totalExpense);

  // 💡 2. 지난달 데이터 가져오기 (지출 차액 계산용)
  const lastMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
  const { totalExpense: lastMonthTotal } = useGetAssetAnalysis(lastMonthDate);

  // 💡 3. 차액 계산 로직
  const diff = totalExpense - lastMonthTotal;
  const isMore = diff > 0;
  const diffAmountText = Math.abs(diff).toLocaleString(); // 100,000원 형태

  // 날짜 핸들러 (예전 코드 방식 적용 ㅋ)
  const handlePrevMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  const handleNextMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));

  return (
    <MobileLayout className="overflow-hidden shadow-none">
      <div className="flex flex-col">
        <SectorSummarySection
          selectedDate={selectedDate}
          totalAmount={totalExpense}
          sectorData={sectorData}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          // 💡 차액 정보 전달
          diffAmountText={diffAmountText}
          isMore={isMore}
        />
        <SectorListSection data={sectorData} />
      </div>
    </MobileLayout>
  );
};
