import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BackPageIcon from '@/assets/icons/BackPage.svg';
import MoreIcon from '@/assets/icons/goal/MoreIcon.svg';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import TotalSection from '@/components/goal/TotalSection';
import GoalBottomSheet from '@/components/goal/GoalBottonSheet';
import GoalMoreActionsBottomSheet from '@/components/goal/detail/GoalMoreActionsBottomSheet';
import { paths } from '@/router/Router';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useGoalDetail, useGoalLedgers, useDeleteGoal } from '@/features/goal';
import type { LedgerItem } from '@/features/goal';

interface TransactionItem {
  id: number;
  type: string;
  amount: string;
  time: string;
  category: string;
  balanceAfter: string;
  account: string;
  isPositive: boolean;
}

function formatLedgerTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch {
    return iso;
  }
}

function ledgerToTransactionItem(ledger: LedgerItem, accountLabel: string): TransactionItem {
  const isIncome = ledger.type === 'INCOME';
  const amountStr = isIncome
    ? `${ledger.amount.toLocaleString('ko-KR')} 원`
    : `- ${Math.abs(ledger.amount).toLocaleString('ko-KR')} 원`;
  return {
    id: ledger.id,
    type: isIncome ? '입금' : '출금',
    amount: amountStr,
    time: formatLedgerTime(ledger.transactionAt),
    category: ledger.categoryName,
    balanceAfter: '-',
    account: accountLabel,
    isPositive: isIncome,
  };
}

const LEDGERS_PAGE_SIZE = 20;

const AmountAchievedPage = () => {
  const [sortBy, setSortBy] = useState<'latest' | 'achieve'>('latest');
  const [selectedItem, setSelectedItem] = useState<TransactionItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const goalId = Number(id);
  const { data: goalDetail, isLoading: isGoalLoading, error: goalError } = useGoalDetail(goalId);
  const { data: ledgersData, isLoading: ledgersLoading } = useGoalLedgers(goalId, {
    page: 0,
    size: LEDGERS_PAGE_SIZE,
  });
  const deleteGoalMutation = useDeleteGoal();

  const isCurrentActive = location.pathname === paths.goal.amountAchieved(id || '');
  const isPastActive = location.pathname === paths.goal.savingsSimulation(id || '');

  const accountLabel =
    goalDetail?.result?.account != null
      ? `${goalDetail.result.account.bankName} ${goalDetail.result.account.accountNumber}`
      : '';

  const transactions: TransactionItem[] =
    ledgersData?.result?.content?.map((ledger) => ledgerToTransactionItem(ledger, accountLabel)) ?? [];

  const handleItemClick = (item: TransactionItem) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  const handleDeleteGoal = () => {
    if (!window.confirm('이 목표를 삭제할까요?')) return;
    deleteGoalMutation.mutate(goalId, {
      onSuccess: () => {
        setMoreSheetOpen(false);
        navigate('/goal/current');
      },
      onError: () => {
        alert('목표 삭제에 실패했습니다.');
      },
    });
  };

  const handleEditGoal = () => {
    setMoreSheetOpen(false);
    id && navigate(paths.goal.edit(id));
  };

  if (isGoalLoading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-400">로딩 중...</div>
        </div>
      </MobileLayout>
    );
  }

  if (goalError || !goalDetail?.result) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">목표를 찾을 수 없습니다.</div>
        </div>
      </MobileLayout>
    );
  }

  const detail = goalDetail.result;
  const goal = {
    goalId: detail.goalId,
    bankIcon: ExBank,
    progress: detail.achievementRate,
    title: detail.title,
    targetAmount: detail.targetAmount,
    remainingDays: detail.remainingDays,
    savedAmount: detail.savedAmount,
    account: detail.account,
  };

  return (
    <MobileLayout>
      <div className="relative flex flex-col w-full min-h-screen bg-white">
        {/* 헤더 및 탭 섹션 */}
        <div className="sticky top-0 z-20 bg-white">
          <div className="flex items-center justify-between px-5 py-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 -ml-2"
              aria-label="뒤로가기"
            >
              <img src={BackPageIcon} alt="뒤로가기" className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">목표</h1>
            <button
              type="button"
              onClick={() => setMoreSheetOpen(true)}
              className="flex items-center justify-center w-10 h-10 p-1"
              aria-label="더보기"
            >
              <img src={MoreIcon} alt="더보기" className="w-6 h-6" />
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

        <div className="flex flex-col gap-4 p-5">
          <TotalSection goal={goal} />

          {/* 구분선 */}
          <div className="-mx-5 h-0.5 w-[calc(100%+2.5rem)] bg-gray-100" />

          {/* 목록 리스트 */}
          <div className="py-2">
            <div className="mb-2 text-lg font-bold text-gray-900">저금 목록</div>

            {/* 필터 버튼 */}
            <div className="mb-4 flex items-center gap-2 text-[13px] font-medium text-gray-400">
              <button
                onClick={() => setSortBy('latest')}
                className={`transition-colors ${sortBy === 'latest' ? 'text-gray-900' : ''}`}
              >
                최신순
              </button>
              <span className="text-gray-200">·</span>
              <button
                onClick={() => setSortBy('achieve')}
                className={`transition-colors ${sortBy === 'achieve' ? 'text-gray-900' : ''}`}
              >
                달성순
              </button>
            </div>

            {/* 리스트 렌더링 - GET /api/goals/{goalId}/ledgers */}
            <div className="flex flex-col">
              {ledgersLoading ? (
                <div className="py-8 text-center text-gray-400 text-sm">거래내역 로딩 중...</div>
              ) : transactions.length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-sm">저금 내역이 없습니다.</div>
              ) : (
                transactions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
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
        </div>

        <GoalBottomSheet isOpen={isSheetOpen} item={selectedItem} onClose={() => setIsSheetOpen(false)} />
        <GoalMoreActionsBottomSheet
          isOpen={moreSheetOpen}
          onClose={() => setMoreSheetOpen(false)}
          onEditGoal={handleEditGoal}
          onDeleteGoal={handleDeleteGoal}
        />
      </div>
    </MobileLayout>
  );
};

export default AmountAchievedPage;
