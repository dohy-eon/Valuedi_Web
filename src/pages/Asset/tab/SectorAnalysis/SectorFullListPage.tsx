import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { SectorListItem, SectorData } from './components/SectorListItem';
import { CATEGORY_LABELS } from '@/features/asset/constants/category';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { transformToCategoryGroups } from './components/sectorUtils';

export const SectorFullListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 💡 1. [수정] 메인 페이지에서 넘겨준 selectedDate를 가져옵니다.
  // 직접 진입했을 때를 대비해 오늘 날짜를 기본값으로 둡니다.
  const selectedDate = location.state?.selectedDate || new Date();

  // 💡 2. [수정] 훅에 selectedDate를 전달하여 해당 월의 데이터를 불러옵니다.
  const { totalExpense, transactions } = useGetAssetAnalysis(selectedDate);
  const allSectors = transformToCategoryGroups(transactions, totalExpense);

  // 3. "그외" 필터 확인
  const isFilterOthers = location.state?.filter === 'others';

  // 4. 디스플레이 아이템 결정
  const displayItems = isFilterOthers ? allSectors.slice(6) : allSectors;

  const title = isFilterOthers ? `그외 ${displayItems.length}개` : `분야별 전체내역`;

  return (
    <MobileLayout className="bg-neutral-0 shadow-none">
      <div className={cn('flex flex-col min-h-screen bg-neutral-0')}>
        {/* 상단 GNB */}
        <div className={cn('sticky top-0 z-10 w-full bg-white border-b border-neutral-5')}>
          <BackPageGNB
            className={cn('bg-white')}
            text=""
            titleColor="text-neutral-90"
            title={title} // 💡 수정된 타이틀 적용
            onBack={() => navigate('/asset/sector', { state: { selectedDate } })}
          />
        </div>

        {/* 리스트 영역 */}
        <div className={cn('flex-1 flex flex-col px-[20px] gap-[12px] mt-[20px] no-scrollbar pb-10')}>
          {displayItems.map((item: SectorData, index: number) => {
            const categoryKey = item.key || item.category || 'default';

            return (
              <SectorListItem
                key={`${categoryKey}-${index}`}
                data={item}
                label={CATEGORY_LABELS[categoryKey] || CATEGORY_LABELS.default}
                onClick={() => {
                  // 상세 페이지로 이동할 때도 데이터 전달 (최적화 유지)
                  navigate(`/asset/sector/${categoryKey}`, {
                    state: { sectorData: item },
                  });
                }}
              />
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};
