import type { TransactionItem } from '@/utils/goal/ledgerHelpers';

interface AmountAchievedLedgerListProps {
  transactions: TransactionItem[];
  isLoading: boolean;
  sortBy: 'latest' | 'achieve';
  onSortChange: (sort: 'latest' | 'achieve') => void;
  onItemClick: (item: TransactionItem) => void;
}

export default function AmountAchievedLedgerList({
  transactions,
  isLoading,
  sortBy,
  onSortChange,
  onItemClick,
}: AmountAchievedLedgerListProps) {
  return (
    <div className="py-2">
      <div className="mb-2 text-lg font-bold text-gray-900">저금 목록</div>

      <div className="mb-4 flex items-center gap-2 text-[13px] font-medium text-gray-400">
        <button
          onClick={() => onSortChange('latest')}
          className={`transition-colors ${sortBy === 'latest' ? 'text-gray-900' : ''}`}
        >
          최신순
        </button>
        <span className="text-gray-200">·</span>
        <button
          onClick={() => onSortChange('achieve')}
          className={`transition-colors ${sortBy === 'achieve' ? 'text-gray-900' : ''}`}
        >
          달성순
        </button>
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          <div className="py-8 text-center text-gray-400 text-sm">거래내역 로딩 중...</div>
        ) : transactions.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-sm">저금 내역이 없습니다.</div>
        ) : (
          transactions.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className="flex justify-between px-1 py-5 transition-colors cursor-pointer active:bg-gray-50 border-b border-gray-50"
            >
              <span className="text-base font-medium text-gray-600">{item.type}</span>
              <span className={`text-base font-bold ${item.isPositive ? 'text-gray-900' : 'text-primary-heavy'}`}>
                {item.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
