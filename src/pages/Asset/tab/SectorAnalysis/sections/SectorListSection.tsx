import { useNavigate } from 'react-router-dom';
import { SectorListItem, SectorData } from '../components/SectorListItem';
import { CATEGORY_LABELS } from '@/features/asset/constants/category';

export const SectorListSection = ({ data }: { data: SectorData[] }) => {
  const navigate = useNavigate();

  // 💡 1. 상위 6개와 나머지 데이터 분리
  const topSectors = data.slice(0, 5);
  const otherSectors = data.slice(5);

  const otherCount = otherSectors.length;
  const otherTotalAmount = otherSectors.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="px-5 bg-white">
      <div className="flex flex-col">
        {/* Top 5 리스트 */}
        {topSectors.map((item) => (
          <SectorListItem
            key={item.key}
            // 💡 퍼센트 소수점 제거 로직 적용
            data={{ ...item, percentage: Math.floor(item.percentage) }}
            label={CATEGORY_LABELS[item.key] || CATEGORY_LABELS.default}
            onClick={() => {
              navigate(`/asset/sector/${item.key}`, { state: { sectorData: item } });
            }}
          />
        ))}

        {/* 💡 2. 그외 N개 로직 반영 */}
        {otherCount > 0 && (
          <SectorListItem
            data={{
              key: 'others',
              amount: otherTotalAmount,
              percentage: 0, // '그외'는 보통 퍼센트 표시를 안 하거나 시안에 맞춰 조정 ㅋ
              category: 'others',
              items: [],
            }}
            label={`그외 ${otherCount}개`}
            onClick={() => navigate('/asset/sector-full', { state: { filter: 'others' } })}
          />
        )}
      </div>
    </section>
  );
};
