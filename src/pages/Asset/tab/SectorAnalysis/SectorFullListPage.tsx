import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { SectorListItem, SectorData } from './components/SectorListItem'; // 💡 SectorData 타입 임포트
import { CATEGORY_LABELS } from '@/features/asset/constants/category';
import { useGetSectorAnalysis } from '@/hooks/Asset/useGetSectorAnalysis';
import { transformToCategoryGroups } from './components/sectorUtils';

export const SectorFullListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. 데이터 스스로 불러오기
  const { totalExpense, transactions } = useGetSectorAnalysis();

  // 💡 transformToCategoryGroups가 이제 정석 타입을 반환하므로 allSectors는 SectorData[] 타입이 됩니다.
  const allSectors = transformToCategoryGroups(transactions, totalExpense);

  // 2. "그외" 클릭 시 보낸 filter 상태가 있는지 확인
  const isFilterOthers = location.state?.filter === 'others';

  // 3. 필터 상태에 따라 보여줄 데이터 결정
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
            // 💡 item이 SectorData 타입이므로 key, category 등에 안전하게 접근 가능합니다.
            const categoryKey = item.key || item.category || 'default';

            return (
              <SectorListItem
                key={`${categoryKey}-${index}`}
                data={item} // 💡 이미 item이 SectorData 규격에 맞으므로 가공 없이 바로 전달
                label={CATEGORY_LABELS[categoryKey] || CATEGORY_LABELS.default}
                onClick={() => {
                  // 상세 페이지로 이동
                  navigate(`/asset/sector/${categoryKey}`);
                }}
              />
            );
          })}
        </div>
      </div>
    </MobileLayout>
  );
};
