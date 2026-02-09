import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Hamburger from '@/assets/icons/Hamburger.svg';
import GoalBottomSheet from '@/components/goal/GoalBottonSheet';
import { paths } from '@/router/paths';
import { MobileLayout } from '@/components/layout/MobileLayout';
import GoalProgressGauge from '@/components/goal/detail/GoalProgressGauge';
import GoalSummaryCard from '@/components/goal/detail/GoalSummaryCard';
import AmountAchievedLedgerList from '@/components/goal/detail/AmountAchievedLedgerList';
import { useGoalDetail, useGoalLedgers } from '@/features/goal';
import { getBankDisplayName } from '@/features/connection/constants/organizationCodes';
import { ledgerToTransactionItem, type TransactionItem } from '@/utils/goal/ledgerHelpers';

const AmountAchievedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const goalId = id ? Number(id) : 0;

  const [sortBy, setSortBy] = useState<'latest' | 'achieve'>('latest');
  const [selectedItem, setSelectedItem] = useState<TransactionItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 목표 상세 + 계좌 정보 (계좌 라벨 생성용)
  const { data: goalDetailData } = useGoalDetail(goalId);
  const accountLabel =
    goalDetailData?.result?.account != null
      ? `${getBankDisplayName(goalDetailData.result.account.bankName)} ${goalDetailData.result.account.accountNumber}`
      : '';

  // 목표 거래내역 API 연동
  const { data: ledgersData, isLoading: ledgersLoading } = useGoalLedgers(goalId, {
    page: 0,
    size: 20,
  });

  const transactions: TransactionItem[] =
    ledgersData?.result?.content?.map((ledger) => ledgerToTransactionItem(ledger, accountLabel)) ?? [];
  const isCurrentActive = location.pathname === paths.goal.amountAchieved(id || '');
  const isPastActive = location.pathname === paths.goal.savingsSimulation(id || '');

  const handleItemClick = (item: TransactionItem) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  return (
    <MobileLayout>
      <div className="relative flex flex-col w-full min-h-screen bg-white">
        {/* 헤더 및 탭 섹션 */}
        <div className="sticky top-0 z-20 bg-white">
          <div className="flex items-center justify-between px-5 py-5">
            <h1 className="text-xl font-bold text-gray-900">목표</h1>
            <button type="button" className="p-1">
              <img src={Hamburger} alt="menu" className="w-6 h-6" />
            </button>
          </div>

          {/* 탭 메뉴 */}
          <div className="flex w-full border-b border-gray-200">
            <button
              onClick={() => id && navigate(paths.goal.amountAchieved(id))}
              className={`flex-1 py-4 text-center text-base transition-all ${
                isCurrentActive ? 'font-bold text-gray-900 border-b-2 border-gray-900' : 'font-medium text-gray-400'
              }`}
            >
              달성 금액
            </button>
            <button
              onClick={() => id && navigate(paths.goal.savingsSimulation(id))}
              className={`flex-1 py-4 text-center text-base transition-all ${
                isPastActive ? 'font-bold text-gray-900 border-b-2 border-gray-900' : 'font-medium text-gray-400'
              }`}
            >
              절약 시뮬레이션
            </button>
          </div>
        </div>

        <GoalProgressGauge goalId={Number(id)} />
        <div className="px-5">
          <GoalSummaryCard goalId={Number(id)} />
        </div>

        {/* 구분선 */}
        <div className="h-0.5 bg-gray-100" />

        <div className="flex flex-col gap-4 p-5">
          <AmountAchievedLedgerList
            transactions={transactions}
            isLoading={ledgersLoading}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onItemClick={handleItemClick}
          />
        </div>

        <GoalBottomSheet isOpen={isSheetOpen} item={selectedItem} onClose={() => setIsSheetOpen(false)} />
      </div>
    </MobileLayout>
  );
};

export default AmountAchievedPage;
