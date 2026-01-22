import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { SectorListItem } from './components/SectorListItem';
import { CATEGORY_LABELS } from '@/features/asset/constants/category';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { transformToCategoryGroups, SectorData } from './utils/sectorUtils';

export const SectorFullListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 데이터 기준 날짜 가져오기 (2026년 기준)
  const selectedDate = location.state?.selectedDate || new Date();

  // 2. 해당 월의 데이터 로드 및 변환
  const { totalExpense, transactions } = useGetAssetAnalysis(selectedDate);
  const allSectors = transformToCategoryGroups(transactions, totalExpense);

  // 3. 필터 로직 ("그외" 항목인 경우 7번째 아이템부터 표시)
  const isFilterOthers = location.state?.filter === 'others';
  const displayItems = isFilterOthers ? allSectors.slice(5) : allSectors;

  // 4. 동적 타이틀 설정
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
            title={title}
            onBack={() => navigate('/asset/sector', { state: { selectedDate } })} // 💡 단순 -1 이동이 더 안전합니다
          />
        </div>

        {/* 분야별 리스트 영역 */}
        <div className={cn('flex-1 flex flex-col px-[20px] gap-[12px] mt-[20px] no-scrollbar pb-10')}>
          {displayItems.map((item: SectorData) => {
            const categoryKey = item.key || 'default';

            return (
              <SectorListItem
                key={categoryKey} // 💡 index 없이 key만으로 유니크하게 설정
                data={item}
                label={CATEGORY_LABELS[categoryKey] || CATEGORY_LABELS.default}
                onClick={() => {
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
