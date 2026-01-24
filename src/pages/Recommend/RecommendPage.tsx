import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import { Typography } from '@/components/typography';
import { cn } from '@/utils/cn';
import { useGetRecommendList, ProductType, categoryList } from '@/hooks/Recommend/useGetRecommendList';
import { RecommendListItem } from './components/RecommendListItem';
import { HomeGNB } from '@/components/gnb/HomeGNB';
import { RecommendBannerCard } from './components/RecommendBannerCard';
import { CategoryButton } from '@/components/buttons';
import CheckDownIcon from '@/assets/icons/CheckDown.svg?react';

export const RecommendPage = () => {
  const navigate = useNavigate();

  const handleNavClick = (item: 'home' | 'asset' | 'recommend' | 'goal') => {
    switch (item) {
      case 'home':
        navigate('/home');
        break;
      case 'asset':
        navigate('/asset');
        break;
      case 'recommend':
        navigate('/recommend');
        break;
      case 'goal':
        navigate('/goal');
        break;
    }
  };

  const { data } = useGetRecommendList();
  const [filter, setFilter] = useState<ProductType>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredList = data.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <MobileLayout className="bg-white">
      <div className="sticky top-0 z-10 w-full">
        <HomeGNB title="추천" />
      </div>

      <div className="mt-[20px] flex flex-col gap-[48px] pl-[20px] pb-[80px]">
        <div className={cn('flex gap-[12px] overflow-x-auto')}>
          <RecommendBannerCard title="새마을금고" subTitle="청년들을 위한 우대 금리" bankId="saemaul" />
          <RecommendBannerCard title="KB청년도약계좌" subTitle="내 집 마련의 꿈" bankId="kb" />
        </div>

        <div className={cn('flex flex-col gap-[12px] w-[320px]')}>
          <div className={cn('flex gap-[4px]')}>
            {categoryList.map((category) => (
              <CategoryButton
                key={category.type}
                text={category.label}
                isSelected={filter === category.type}
                onClick={() => {
                  setFilter(category.type);
                  setIsExpanded(false);
                }}
              />
            ))}
          </div>

          <div className={cn('flex flex-col gap-[12px]')}>
            <div className={cn('flex flex-col gap-[4px]')}>
              {(isExpanded ? filteredList : filteredList.slice(0, 6)).map((product) => (
                <RecommendListItem
                  key={product.id}
                  bankName={product.bankName}
                  productName={product.productName}
                  description={product.description}
                  onClick={() => navigate(`/recommend/detail/${product.id}`)}
                />
              ))}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                'flex items-center justify-center gap-[8px] border border-neutral-10 rounded-[4px] p-[8px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)] cursor-pointer'
              )}
            >
              <Typography style="text-body-2-14-regular" className="text-neutral-70 text-center">
                {isExpanded ? '목록 접기' : '목록 더 보기'}
              </Typography>
              <CheckDownIcon className={cn('text-neutral-70', isExpanded && 'rotate-180')} />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[360px]">
        <BottomNavigation activeItem="recommend" onItemClick={handleNavClick} />
      </div>
    </MobileLayout>
  );
};

export default RecommendPage;
