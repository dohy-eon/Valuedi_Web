import { useNavigate } from 'react-router-dom';
import { SectorListItem, SectorData } from '../components/SectorListItem';
import { CATEGORY_LABELS } from '@/features/asset/constants/category';
import { Skeleton } from '@/components/skeleton/Skeleton'; // 💡 1. 스켈레톤 임포트

// 💡 2. interface에 isLoading 추가
interface SectorListSectionProps {
  data: SectorData[];
  isLoading?: boolean;
  selectedDate: Date;
}

export const SectorListSection = ({ 
  data, 
  isLoading = false, // 💡 3. props에서 꺼내기
  selectedDate
}: SectorListSectionProps) => {
  const navigate = useNavigate();

  const topSectors = data.slice(0, 5);
  const otherSectors = data.slice(5);

  const otherCount = otherSectors.length;
  const otherTotalAmount = otherSectors.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="px-5 bg-white pb-10">
      <div className="flex flex-col">
        {/* 💡 4. 로딩 중일 때 보여줄 리스트 스켈레톤 (5개) */}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" /> {/* 아이콘 자리 */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-20 h-4 rounded" /> {/* 카테고리명 자리 */}
                  <Skeleton className="w-12 h-3 rounded" /> {/* 퍼센트 자리 */}
                </div>
              </div>
              <Skeleton className="w-24 h-5 rounded" /> {/* 금액 자리 */}
            </div>
          ))
        ) : (
          <>
            {/* Top 5 리스트 */}
            {topSectors.map((item) => (
              <SectorListItem
                key={item.key}
                data={{ ...item, percentage: Math.floor(item.percentage) }}
                label={CATEGORY_LABELS[item.key] || CATEGORY_LABELS.default}
                onClick={() => {
                  navigate(`/asset/sector/${item.key}`, { state: { sectorData: item, selectedDate: selectedDate.toISOString() } });
                }}
              />
            ))}

            {/* 그외 N개 로직 */}
            {otherCount > 0 && (
              <SectorListItem
                data={{
                  key: 'others',
                  amount: otherTotalAmount,
                  percentage: 0,
                  category: 'others',
                  items: [],
                }}
                label={`그외 ${otherCount}개`}
                onClick={() => navigate('/asset/sector-full', { state: { filter: 'others', selectedDate: selectedDate.toISOString() } })}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};