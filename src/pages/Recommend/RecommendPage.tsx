import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import { Typography } from '@/components/typography';
import { cn } from '@/utils/cn';
import { RecommendListItem } from './components/RecommendListItem';
import { HomeGNB } from '@/components/gnb/HomeGNB';
import { RecommendBannerCard } from './components/RecommendBannerCard';
import { CategoryButton } from '@/components/buttons';
import CheckDownIcon from '@/assets/icons/CheckDown.svg?react';
import { useSavingsRecommendations, useCreateSavingsRecommendations } from '@/features/recommend/recommend.hooks';

export type ProductType = 'all' | 'free' | 'fixed';

export const categoryList = [
  { type: 'all' as ProductType, label: '전체' },
  { type: 'free' as ProductType, label: '자유적금' },
  { type: 'fixed' as ProductType, label: '정기적금' },
] as const;

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

  const [filter, setFilter] = useState<ProductType>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // 필터에 따라 rsrvType 결정: 'free' -> 'F', 'fixed' -> 'S', 'all' -> undefined
  const rsrvType = useMemo(() => {
    if (filter === 'free') return 'F' as const;
    if (filter === 'fixed') return 'S' as const;
    return undefined;
  }, [filter]);

  const { data: recommendationsData, isLoading, isError } = useSavingsRecommendations(rsrvType);
  const createRecommendationsMutation = useCreateSavingsRecommendations();

  // API 응답에서 products 추출
  const products = recommendationsData?.products || [];

  // 필터링 (API에서 이미 필터링되지만, 안전을 위해 클라이언트에서도 필터링)
  const filteredList = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter((item) => {
      if (filter === 'free') return item.rsrvType === 'F';
      if (filter === 'fixed') return item.rsrvType === 'S';
      return true;
    });
  }, [products, filter]);

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
            {isLoading && (
              <Typography style="text-body-2-14-regular" className="text-neutral-70 text-center py-[20px]">
                추천 상품을 불러오는 중...
              </Typography>
            )}
            {isError && (
              <div className="flex flex-col gap-[8px] py-[20px]">
                <Typography style="text-body-2-14-regular" className="text-neutral-70 text-center">
                  추천 상품을 불러오는데 실패했습니다.
                </Typography>
                <button
                  onClick={() => createRecommendationsMutation.mutate()}
                  disabled={createRecommendationsMutation.isPending}
                  className={cn(
                    'px-[16px] py-[8px] bg-primary-60 text-white rounded-[4px] text-body-2-14-semi-bold',
                    createRecommendationsMutation.isPending && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {createRecommendationsMutation.isPending ? '추천 생성 중...' : '새로 추천 받기'}
                </button>
              </div>
            )}
            {!isLoading && !isError && filteredList.length === 0 && (
              <div className="flex flex-col gap-[8px] py-[20px]">
                <Typography style="text-body-2-14-regular" className="text-neutral-70 text-center">
                  추천 상품이 없습니다.
                </Typography>
                <button
                  onClick={() => createRecommendationsMutation.mutate()}
                  disabled={createRecommendationsMutation.isPending}
                  className={cn(
                    'px-[16px] py-[8px] bg-primary-60 text-white rounded-[4px] text-body-2-14-semi-bold',
                    createRecommendationsMutation.isPending && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {createRecommendationsMutation.isPending ? '추천 생성 중...' : '추천 받기'}
                </button>
              </div>
            )}
            {!isLoading && !isError && filteredList.length > 0 && (
              <>
                <div className={cn('flex flex-col gap-[4px]')}>
                  {(isExpanded ? filteredList : filteredList.slice(0, 6)).map((product) => (
                    <RecommendListItem
                      key={product.finPrdtCd}
                      bankName={product.korCoNm}
                      productName={product.finPrdtNm}
                      description={`${product.rsrvTypeNm} | ${product.korCoNm}`}
                      onClick={() => navigate(`/recommend/detail/${product.finPrdtCd}`)}
                    />
                  ))}
                </div>
              </>
            )}

            {!isLoading && !isError && filteredList.length > 6 && (
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
            )}
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
