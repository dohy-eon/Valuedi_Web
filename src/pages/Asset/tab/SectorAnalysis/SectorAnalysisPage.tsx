import { useState, useMemo } from 'react'; // 💡 useMemo 추가
import { useLocation } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { SectorSummarySection } from './sections/SectorSummarySection';
import { SectorListSection } from './sections/SectorListSection';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { transformToCategoryGroups } from './utils/sectorUtils';

export const SectorAnalysis = () => {
  const location = useLocation();

  // 선택된 날짜 상태 관리
  const [selectedDate, setSelectedDate] = useState<Date>(
    location.state?.selectedDate ? new Date(location.state.selectedDate) : new Date()
  );

  /**
   * 💡 [성능 최적화] 무한 로딩 방지를 위해 날짜 객체 참조 고정
   * selectedDate가 바뀔 때만 새로운 Date 객체를 생성하도록 합니다.
   */
  const memoizedDate = useMemo(() => new Date(selectedDate), [selectedDate]);

  // 💡 1. 이번 달 데이터 가져오기 (isLoading 추가!)
  const { totalExpense, transactions, isLoading } = useGetAssetAnalysis(memoizedDate);
  const sectorData = transformToCategoryGroups(transactions, totalExpense);

  // 💡 2. 지난달 데이터 가져오기 (지출 차액 계산용)
  const lastMonthDate = useMemo(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1),
    [selectedDate]
  );
  const { totalExpense: lastMonthTotal } = useGetAssetAnalysis(lastMonthDate);

  // 💡 3. 차액 계산 로직
  const diff = totalExpense - lastMonthTotal;
  const isMore = diff > 0;
  const diffAmountText = Math.abs(diff).toLocaleString();

  // 날짜 핸들러
  const handlePrevMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  const handleNextMonth = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));

  return (
    <MobileLayout className="overflow-hidden shadow-none">
      <div className="flex flex-col">
        {/* 상단 요약 섹션 (날짜, 총액, 차트) */}
        <SectorSummarySection
          selectedDate={selectedDate}
          totalAmount={totalExpense}
          sectorData={sectorData}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          diffAmountText={diffAmountText}
          isMore={isMore}
          isLoading={isLoading} // 💡 isLoading 전달!
        />

        {/* 하단 리스트 섹션 (지출 상세) */}
        {/* 💡 SectorListSection 내부 인터페이스에 isLoading? 추가하셔야 빨간줄 사라져요! */}
        <SectorListSection
          data={sectorData}
          isLoading={isLoading} // 💡 isLoading 전달!
          selectedDate={selectedDate} // 💡 selectedDate 전달!
        />
      </div>
    </MobileLayout>
  );
};
