import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/typography';
import { formatCurrency } from '@/utils/formatCurrency';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { AssetDailyHeader } from '../AssetDetails/components/AssetDailyHeader';
import { AssetItemList } from '../AssetDetails/components/AssetItemList';
import { CATEGORY_STYLES, CATEGORY_LABELS } from '@/features/asset/constants/category';
import { useGetSectorAnalysis } from '@/hooks/Asset/useGetSectorAnalysis';
import { TransactionDetailModal } from './components/TransactionDetailModal';

// 💡 우리가 정립한 정석 타입들을 임포트합니다.
import {
  TransactionWithDetails,
  SectorTransactionGroup,
  transformToDateGroups,
  transformToCategoryGroups,
} from './components/sectorUtils';

export const SectorDetailPage = () => {
  const { categoryKey } = useParams();
  const navigate = useNavigate();

  // 💡 1. 상세 모달 상태에 정확한 타입을 부여합니다.
  const [selectedItem, setSelectedItem] = useState<TransactionWithDetails | null>(null);

  const { transactions, totalExpense } = useGetSectorAnalysis();

  // 💡 2. 가공된 데이터에서 현재 카테고리에 맞는 데이터를 찾습니다.
  const allSectors = transformToCategoryGroups(transactions, totalExpense);
  const selectedCategory = allSectors.find((s) => s.key === categoryKey);

  // 데이터가 없으면 렌더링하지 않습니다.
  if (!selectedCategory || !selectedCategory.items) return null;

  const { key, amount: totalAmount, items } = selectedCategory;
  const style = CATEGORY_STYLES[key] || CATEGORY_STYLES.default;
  const label = CATEGORY_LABELS[key] || CATEGORY_LABELS.default;

  // 💡 3. 날짜별 그룹화 데이터에 정석 타입을 적용합니다.
  const historyData: SectorTransactionGroup[] = transformToDateGroups(items);

  return (
    <MobileLayout className="bg-neutral-0">
      <div className="flex flex-col min-h-screen bg-neutral-0 relative">
        {/* 1. 헤더 */}
        <div className="sticky top-0 z-10 w-full bg-white border-b border-neutral-5">
          <BackPageGNB
            title="세부내역"
            onBack={() => navigate(-1)}
            text=""
            className="bg-white"
            titleColor="text-neutral-90"
          />
        </div>

        {/* 2. 요약 카드 */}
        <div className={cn('flex flex-col p-[20px] w-full h-[134px] gap-[12px]', style.bgColor)}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src={style.icon} alt={label} className="w-8 h-8 object-contain" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <Typography variant="caption-1" className="text-neutral-70">
              11월 {label} 총 금액
            </Typography>
            <Typography variant="headline-1" weight="bold" className="text-neutral-90">
              {formatCurrency(totalAmount)}
            </Typography>
          </div>
        </div>

        {/* 3. 리스트 영역 */}
        <div className="flex-1 flex flex-col px-[20px] mt-[20px] pb-10">
          <Typography variant="body-2" weight="semi-bold" className="text-neutral-90 mb-[12px]">
            총 {items.length}건
          </Typography>

          <div className="flex flex-col gap-[20px]">
            {historyData.map((group: SectorTransactionGroup) => (
              <div key={group.date} className="flex flex-col">
                <AssetDailyHeader date={group.date} dailyTotal={group.dailyTotal} />
                <div className="flex flex-col gap-[8px] mt-[8px]">
                  {group.items.map((item: TransactionWithDetails) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="cursor-pointer active:bg-neutral-5 rounded-lg transition-colors"
                    >
                      <AssetItemList
                        title={item.title}
                        subTitle={item.sub} // 💡 item.sub를 subTitle 프롭으로 전달!
                        amount={item.amount}
                        type={item.type}
                        category={key || 'default'} // useParams에서 가져온 key 사용
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 상세 정보 모달 (바텀 시트) */}
        {selectedItem && <TransactionDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </div>
    </MobileLayout>
  );
};
