import { useState, useMemo, useRef } from 'react';
import { Typography } from '@/components/typography';
import { formatCurrency } from '@/utils/formatCurrency';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { PEER_AVERAGE_DATA } from '../constants/mockData';
import { CompareBar } from './CompareBar';
import { cn } from '@/utils/cn';
import { Skeleton } from '@/components/skeleton/Skeleton'; // 💡 1. 추가
import { CompareBarSkeleton } from './CompareBarSkeleton'; // 💡 2. 추가

const DISPLAY_NAMES: Record<string, string> = {
  traffic: '교통',
  transfer: '금융',
  food: '식비',
  living: '주거/통신',
  shopping: '쇼핑',
  leisure: '문화생활',
};

const TARGET_CATEGORIES = Object.keys(DISPLAY_NAMES);

// 💡 3. 인터페이스 추가
interface CategoryCompareSectionProps {
  isLoading?: boolean;
}

export const CategoryCompareSection = ({ isLoading = false }: CategoryCompareSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('traffic');
  const scrollRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const { transactions } = useGetAssetAnalysis(now);

  const handleCategoryClick = (catKey: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(catKey);
    const container = scrollRef.current;
    const target = e.currentTarget;

    if (container && target) {
      const containerWidth = container.offsetWidth;
      const targetOffset = target.offsetLeft;
      const targetWidth = target.offsetWidth;
      const scrollTo = Math.max(0, targetOffset - containerWidth / 2 + targetWidth / 2);

      container.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const myCategoryTotal = useMemo(() => {
    return transactions
      .filter((item) => item.category === selectedCategory && item.type === 'expense')
      .reduce((sum, item) => sum + Math.abs(item.amount), 0);
  }, [transactions, selectedCategory]);

  const peerCategoryTotal = PEER_AVERAGE_DATA.categories[selectedCategory] || 0;

  return (
    <section className="px-5 py-8 bg-white border-b-[8px] border-neutral-5">
      <Typography variant="headline-3" weight="semi-bold" color="neutral-90" className="mb-6">
        카테고리별 비교
      </Typography>

      {/* 💡 4. 칩 영역 로딩 처리 */}
      <div
        ref={scrollRef}
        className="flex gap-2 mb-10 overflow-x-auto pb-1 no-scrollbar scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {isLoading ? (
          // 로딩 중일 땐 칩 모양 스켈레톤 5개 표시 ㅋ
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="min-w-[60px] h-8 rounded-full flex-shrink-0" />
          ))
        ) : (
          TARGET_CATEGORIES.map((catKey) => {
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={(e) => handleCategoryClick(catKey, e)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all duration-200 h-fit flex items-center justify-center',
                  isSelected
                    ? 'bg-atomic-yellow-50 text-neutral-90 font-bold'
                    : 'bg-neutral-10 text-neutral-70 font-normal'
                )}
              >
                {DISPLAY_NAMES[catKey]}
              </button>
            );
          })
        )}
      </div>

      {/* 💡 5. 바 차트 영역 로딩 처리 */}
      <div className="flex justify-center items-end gap-14 px-10 h-44 mb-10">
        {isLoading ? (
          <>
            <CompareBarSkeleton />
            <CompareBarSkeleton />
          </>
        ) : (
          <>
            <CompareBar
              label="또래 평균"
              amount={peerCategoryTotal}
              maxAmount={Math.max(myCategoryTotal, peerCategoryTotal, 100000) * 1.2}
            />
            <CompareBar
              label="김휘주님"
              amount={myCategoryTotal}
              isHighlight={true}
              maxAmount={Math.max(myCategoryTotal, peerCategoryTotal, 100000) * 1.2}
            />
          </>
        )}
      </div>

      {/* 💡 6. 하단 요약 카드 로딩 처리 */}
      <div className="bg-neutral-10 rounded-xl p-5 space-y-3">
        {isLoading ? (
          <>
            <div className="flex justify-between"><Skeleton className="w-16 h-4 rounded" /><Skeleton className="w-24 h-5 rounded" /></div>
            <div className="flex justify-between"><Skeleton className="w-16 h-4 rounded" /><Skeleton className="w-24 h-5 rounded" /></div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <Typography variant="body-3" color="neutral-90">내 소비</Typography>
              <Typography variant="body-2" weight="semi-bold">{formatCurrency(myCategoryTotal)}</Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="body-3" color="neutral-70">또래 평균</Typography>
              <Typography variant="body-2" weight="semi-bold">{formatCurrency(peerCategoryTotal)}</Typography>
            </div>
          </>
        )}
      </div>
    </section>
  );
};