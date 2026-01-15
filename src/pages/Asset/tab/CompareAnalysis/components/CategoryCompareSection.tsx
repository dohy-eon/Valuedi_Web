import { useState, useMemo, useRef } from 'react'; // 💡 useRef 추가
import { Typography } from '@/components/typography';
import { formatCurrency } from '@/utils/formatCurrency';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { PEER_AVERAGE_DATA } from '../constants/mockData';
import { CompareBar } from './CompareBar';
import { cn } from '@/utils/cn';

const DISPLAY_NAMES: Record<string, string> = {
  traffic: '교통',
  transfer: '금융',
  food: '식비',
  living: '주거/통신',
  shopping: '쇼핑',
  leisure: '문화생활',
};

const TARGET_CATEGORIES = Object.keys(DISPLAY_NAMES);

export const CategoryCompareSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('traffic');
  const scrollRef = useRef<HTMLDivElement>(null); // 💡 스크롤 컨테이너를 위한 Ref

  const now = new Date();
  const { transactions } = useGetAssetAnalysis(now);

  // 💡 클릭 시 카테고리 변경 + 부드러운 스크롤 이동
  const handleCategoryClick = (catKey: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(catKey);

    const container = scrollRef.current;
    const target = e.currentTarget;

    if (container && target) {
      const containerWidth = container.offsetWidth;
      const targetOffset = target.offsetLeft;
      const targetWidth = target.offsetWidth;

      // 클릭한 버튼이 가로 중앙에 오도록 계산 (범위 밖이면 알아서 벽에 붙음 ㅋ)
      const scrollTo = Math.max(0, targetOffset - containerWidth / 2 + targetWidth / 2);

      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth', // 💡 스르륵~
      });
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

      {/* 칩 영역 (ref 추가) */}
      <div
        ref={scrollRef} // 💡 Ref 연결
        className="flex gap-2 mb-10 overflow-x-auto pb-1 no-scrollbar scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TARGET_CATEGORIES.map((catKey) => {
          const isSelected = selectedCategory === catKey;
          return (
            <button
              key={catKey}
              onClick={(e) => handleCategoryClick(catKey, e)} // 💡 핸들러 연결
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
        })}
      </div>

      <div className="flex justify-center items-end gap-14 px-10 h-44 mb-10">
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
      </div>

      {/* 💡 하단 요약 카드: 이미지 디자인에 맞춰 선을 없애고 간격을 조정했습니다. */}
      <div className="bg-neutral-10 rounded-xl p-5 space-y-3">
        {/* 내 소비 행 */}
        <div className="flex justify-between items-center">
          <Typography variant="body-3" color="neutral-90" weight="regular">
            내 소비
          </Typography>
          <Typography variant="body-2" weight="semi-bold" color="neutral-90">
            {formatCurrency(myCategoryTotal)}
          </Typography>
        </div>

        {/* 또래 평균 행 */}
        <div className="flex justify-between items-center">
          <Typography variant="body-3" color="neutral-70" weight="regular">
            또래 평균
          </Typography>
          <Typography variant="body-2" weight="semi-bold" color="neutral-90">
            {formatCurrency(peerCategoryTotal)}
          </Typography>
        </div>
      </div>
    </section>
  );
};
