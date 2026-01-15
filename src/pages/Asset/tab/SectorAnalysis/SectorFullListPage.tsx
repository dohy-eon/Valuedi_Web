import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { SectorListItem, SectorData } from './components/SectorListItem';
import { CATEGORY_LABELS } from '@/features/asset/constants/category';
import { useGetSectorAnalysis } from '@/hooks/Asset/useGetSectorAnalysis';
import { transformToCategoryGroups } from './components/sectorUtils';

export const SectorFullListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 데이터 불러오기 및 가공
  const { totalExpense, transactions } = useGetSectorAnalysis();
  const allSectors = transformToCategoryGroups(transactions, totalExpense);

  // 2. "그외" 필터 확인
  const isFilterOthers = location.state?.filter === 'others';

  // 3. 디스플레이 아이템 결정
  const displayItems = isFilterOthers ? allSectors.slice(6) : allSectors;
  const title = isFilterOthers ? `그외 ${displayItems.length}개` : '분야별 전체내역';

  return (
    <MobileLayout className="bg-neutral-0 shadow-none">
      <div className={cn('flex flex-col min-h-screen bg-neutral-0')}>
        {/* 상단 GNB */}
        <div className={cn('sticky top-0 z-10 w-full bg-white border-b border-neutral-5')}>
          <BackPageGNB
            className={cn('bg-white')}
            text=""
            titleColor="text-neutral-90"
            title={title}
            onBack={() => navigate(-1)}
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
                  // 💡 [최적화 핵심] 상세 페이지로 이동할 때 이미 계산된 item(SectorData)을 state로 전달합니다.
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
