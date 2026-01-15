import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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

// 정석 타입 및 유틸 임포트
import {
  TransactionWithDetails,
  SectorTransactionGroup,
  transformToDateGroups,
  transformToCategoryGroups,
  SectorData, // 💡 전달받을 데이터 타입
} from './components/sectorUtils';

export const SectorDetailPage = () => {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 💡 1. 상세 모달 상태
  const [selectedItem, setSelectedItem] = useState<TransactionWithDetails | null>(null);

  /**
   * 💡 2. 최적화 로직 (피드백 반영)
   * 부모(FullList)가 navigate state로 전달한 데이터가 있는지 확인합니다.
   */
  const stateData = location.state?.sectorData as SectorData | undefined;

  // 만약 state가 없다면(직접 링크 진입 등) 대비를 위해 훅을 호출합니다. (Fallback)
  const { transactions, totalExpense } = useGetSectorAnalysis();

  // stateData가 있으면 그것을 쓰고, 없으면 전체 데이터에서 찾습니다.
  const selectedCategory =
    stateData || transformToCategoryGroups(transactions, totalExpense).find((s) => s.key === categoryKey);

  // 데이터가 아예 없으면 렌더링하지 않습니다.
  if (!selectedCategory || !selectedCategory.items) return null;

  const { key, amount: totalAmount, items } = selectedCategory;
  const style = CATEGORY_STYLES[key] || CATEGORY_STYLES.default;
  const label = CATEGORY_LABELS[key] || CATEGORY_LABELS.default;

  // 💡 3. 날짜별 그룹화 (이건 화면에 뿌리기 위해 꼭 필요하므로 실행)
  const historyData: SectorTransactionGroup[] = transformToDateGroups(items);

  return (
    <MobileLayout className="bg-neutral-0">
      <div className="flex flex-col min-h-screen bg-neutral-0 relative">
        {/* 1. 상단 헤더 */}
        <div className="sticky top-0 z-10 w-full bg-white border-b border-neutral-5">
          <BackPageGNB
            title="세부내역"
            onBack={() => navigate(-1)}
            text=""
            className="bg-white"
            titleColor="text-neutral-90"
          />
        </div>

        {/* 2. 요약 카드 (배경색 적용) */}
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
                {/* 날짜 헤더 */}
                <AssetDailyHeader date={group.date} dailyTotal={group.dailyTotal} />

                {/* 해당 날짜 아이템 리스트 */}
                <div className="flex flex-col gap-[8px] mt-[8px]">
                  {group.items.map((item: TransactionWithDetails) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="cursor-pointer active:bg-neutral-5 rounded-lg transition-colors"
                    >
                      <AssetItemList
                        title={item.title}
                        subTitle={item.sub}
                        amount={item.amount}
                        type={item.type}
                        category={key || 'default'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 거래 상세 정보 모달 */}
        {selectedItem && <TransactionDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </div>
    </MobileLayout>
  );
};
