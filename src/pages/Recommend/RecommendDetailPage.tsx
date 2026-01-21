import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Typography } from '@/components/typography';
import { cn } from '@/utils/cn';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { BANNER } from '@/features/recommend/constants/banner';
import { getColorToken } from '@/styles/design-system';
import { InterestCalculator } from './components/InterestCalculator';
import { InterestRateList } from './components/InterestRateList';
import { ProductInfoList } from './components/ProductInfoList';
import { LoginButton } from '@/components/buttons';
import { useGetRecommendDetail } from '@/hooks/Recommend/useGetRecommendDetail';

export const RecommendDetailPage = () => {
  const navigate = useNavigate();

  const { productInfo, preferentialRates, productDetailInfo } = useGetRecommendDetail();

  const targetBank = BANNER.find((bank) => bank.id === productInfo.bankId);
  const backgroundColor = targetBank ? getColorToken(targetBank.color) : getColorToken('neutral-10');

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <MobileLayout className="bg-white">
      <div className={cn('sticky top-0 z-10 w-full')}>
        <BackPageGNB
          className={cn('bg-neutral-0')}
          text=""
          titleColor="text-neutral-90"
          title="추천"
          onBack={handleBack}
        />
      </div>

      <div className={cn('flex flex-col gap-[20px] px-[20px] ')}>
        <div className={cn('flex flex-col gap-[12px] py-[20px]')}>
          <div
            style={{ backgroundColor: backgroundColor }}
            className={cn('w-[32px] h-[32px] flex items-center justify-center rounded-[8px]')}
          >
            {targetBank ? (
              <img src={targetBank.icon} alt={targetBank.name} className={cn('w-[18px] h-[18px] object-cover')} />
            ) : (
              <div className="w-full h-full bg-neutral-10" />
            )}
          </div>

          <div className={cn('flex flex-col gap-[4px]')}>
            <Typography style="text-caption-1-12-regular" className={cn('text-neutral-70')}>
              {productInfo.bankName}
            </Typography>

            <Typography style="text-headline-1-22-bold" className={cn('text-neutral-90')}>
              {productInfo.productName}
            </Typography>
          </div>
        </div>
        <div className={cn('flex flex-col gap-[8px]')}>
          <Typography style="text-body-1-16-semi-bold" className={cn('text-neutral-90')}>
            우대조건
          </Typography>

          <div className={cn('flex flex-col gap-[8px] px-[12px] py-[16px] rounded-[8px] bg-neutral-10')}>
            <div className={cn('flex justify-between items-center')}>
              <Typography style="text-body-2-14-regular" className={cn('text-neutral-90')}>
                최고 금리
              </Typography>
              <div className={cn('flex gap-[2px]')}>
                <Typography style="text-body-2-14-semi-bold" className={cn('text-neutral-90')}>
                  {productInfo.maxRate}
                </Typography>
                <Typography style="text-body-2-14-regular" className={cn('text-neutral-90')}>
                  %
                </Typography>
              </div>
            </div>

            <div className={cn('flex justify-between items-center')}>
              <Typography style="text-body-2-14-regular" className={cn('text-neutral-70')}>
                기본 금리 (60개월 기준)
              </Typography>
              <div className={cn('flex gap-[2px]')}>
                <Typography style="text-body-2-14-semi-bold" className={cn('text-neutral-90')}>
                  {productInfo.basicRate}
                </Typography>
                <Typography style="text-body-2-14-regular" className={cn('text-neutral-90')}>
                  %
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('h-[8px] bg-neutral-10 mx-[-20px]')} />

        <InterestCalculator />

        <InterestRateList items={preferentialRates} />

        <div className={cn('h-[8px] bg-neutral-10 mx-[-20px]')} />

        <ProductInfoList items={productDetailInfo} initialCount={3} />

        <div className={cn('flex flex-col gap-[8px] rounded-[8px]')}>
          <Typography style="text-caption-1-12-regular" className={cn('text-neutral-50 whitespace-pre-wrap')}>
            {`제공되는 정보는 금융감독원 23.06.15일 공시된 내용 기반으로 작성되었으며, 금융상품 광고가 아닙니다.\n실제 상품 가입 시점에 변동될 수 있으므로 상품 가입 시 꼭 다시 확인하시기 바랍니다.`}
          </Typography>

          <Typography style="text-caption-1-12-regular" className={cn('text-neutral-50 whitespace-pre-wrap')}>
            {`• 본 페이지는 밸류디에서 대가 관계 없이 정보제공 목적으로\n   자체 제작한 게시물입니다.\n• 밸류디는 최신 정보 업데이트에 최선을 다하고 있습니다.\n• 해당 금융사 홈페이지 등에서 상품 정보와 이용 조건을 확인\n   하고 신청하시길 바랍니다.`}
          </Typography>
        </div>
      </div>

      <div className={cn('px-[20px] pb-[20px] mt-[47px]')}>
        <LoginButton text="신청하기" />
      </div>
    </MobileLayout>
  );
};

export default RecommendDetailPage;
