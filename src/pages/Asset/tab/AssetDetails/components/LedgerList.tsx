import { AssetDailyHeader } from './AssetDailyHeader';
import { AssetItemList } from './AssetItemList';
import { TransactionGroup } from '@/features/asset/constants/account';

interface LedgerListProps {
  transactionHistory: TransactionGroup[];
}

export const LedgerList = ({ transactionHistory }: LedgerListProps) => {
  return (
    <div className="flex flex-col gap-[12px]">
      {transactionHistory.map((group, index) => (
        <div key={index} className="flex flex-col">
          <AssetDailyHeader date={group.date} dailyTotal={group.dailyTotal} />

          <div className="flex flex-col gap-[8px]">
            {group.items.map((tx) => (
              <AssetItemList
                key={tx.id}
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
