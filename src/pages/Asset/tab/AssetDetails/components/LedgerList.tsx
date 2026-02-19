import { useGetAccountDetail } from '@/shared/hooks/Asset/useGetAccountDetail';
import { AssetDailyHeader } from './AssetDailyHeader';
import { AssetItemList } from './AssetItemList';
import { useMemo } from 'react';
import { useLedgerStore } from '@/shared/hooks/Asset/usetLedgerStore';

interface LedgerListProps {
  refreshKey?: number;
}

export const LedgerList = ({ refreshKey = 0 }: LedgerListProps) => {
  // 전역 스토어에서 월 가져오기
  const currentMonth = useLedgerStore((state) => state.currentMonth);

  // 훅에 전달할 yearMonth 계산
  const yearMonth = useMemo(() => {
    const year = new Date().getFullYear();
    return `${year}-${String(currentMonth).padStart(2, '0')}`;
  }, [currentMonth]);

  const { transactionHistory } = useGetAccountDetail({ yearMonth, refreshKey });
  return (
    <div className="flex flex-col gap-[12px]">
      {transactionHistory.length === 0 && (
        <div className="py-[24px] text-center text-neutral-50 text-body-3-13-medium">거래 내역이 없어요</div>
      )}
      {transactionHistory.map((group, index) => (
        <div key={index} className="flex flex-col">
          <AssetDailyHeader date={group.date} dailyTotal={group.dailyTotal} />

          <div className="flex flex-col gap-[8px]">
            {group.items.map((tx, idx) => (
              <AssetItemList
                key={`${group.day}-${tx.id}-${idx}`}
                title={tx.title}
                subTitle={tx.sub}
                amount={tx.amount}
                type={tx.type}
                category={tx.category}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
