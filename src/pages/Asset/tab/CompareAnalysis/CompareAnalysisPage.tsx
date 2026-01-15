import { MobileLayout } from '@/components/layout/MobileLayout';
import { PeerCompareSection } from './components/PeerCompareSection';
import { CategoryCompareSection } from './components/CategoryCompareSection'; // 나중에 추가
import { HistoryCompareSection } from './components/HistoryCompareSection'; // 나중에 추가

export const CompareAnalysis = () => {
  return (
    <MobileLayout className="bg-neutral-0 shadow-none">
      <div className="flex flex-col min-h-screen bg-neutral-0">
        {/* 1. 또래별 비교 섹션 */}
        <PeerCompareSection />

        {/* 2. 카테고리별 비교 섹션 (구현 전이면 주석 처리) */}
        <div className="h-2 bg-neutral-5" />
        <CategoryCompareSection />

        {/* 3. 소비내역 비교 섹션 (구현 전이면 주석 처리) */}
        <div className="h-2 bg-neutral-5" />
        <HistoryCompareSection />

        {/* 바닥 여백을 위해 추가 */}
        <div className="pb-20" />
      </div>
    </MobileLayout>
  );
};
