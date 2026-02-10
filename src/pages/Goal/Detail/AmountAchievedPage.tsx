import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GoalDetailPageHeader from '@/components/goal/detail/GoalDetailPageHeader';
import GoalBottomSheet from '@/components/goal/GoalBottonSheet';
import GoalMoreActionsBottomSheet from '@/components/goal/detail/GoalMoreActionsBottomSheet';
import GoalDeleteConfirmModal from '@/components/goal/detail/GoalDeleteConfirmModal';
import { MobileLayout } from '@/components/layout/MobileLayout';
import GoalProgressGauge from '@/components/goal/detail/GoalProgressGauge';
import GoalSummaryCard from '@/components/goal/detail/GoalSummaryCard';
import AmountAchievedLedgerList from '@/components/goal/detail/AmountAchievedLedgerList';
import { useGoalDetail, useGoalLedgers } from '@/features/goal';
import { getBankDisplayName } from '@/features/connection/constants/organizationCodes';
import { ledgerToTransactionItem, type TransactionItem } from '@/utils/goal/ledgerHelpers';
import { useGoalDetailActions, useGoalDetailSheetInitials } from '@/hooks/Goal/useGoalDetailActions';

const AmountAchievedPage = () => {
  const { id } = useParams();
  const goalId = id ? Number(id) : 0;

  const [sortBy, setSortBy] = useState<'latest' | 'achieve'>('latest');
  const [selectedItem, setSelectedItem] = useState<TransactionItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    detail,
    moreSheetOpen,
    setMoreSheetOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    isCurrentActive,
    isPastActive,
    handleEditGoal,
    handleDeleteGoalClick,
    handleDeleteConfirm,
    handleIconChangeConfirm,
  } = useGoalDetailActions();

  const { initialColorId, initialIconId } = useGoalDetailSheetInitials(detail);

  const { data: goalDetailData } = useGoalDetail(goalId);
  const accountLabel =
    goalDetailData?.result?.account != null
      ? `${getBankDisplayName(goalDetailData.result.account.bankName)} ${goalDetailData.result.account.accountNumber}`
      : '';

  const { data: ledgersData, isLoading: ledgersLoading } = useGoalLedgers(goalId, {
    page: 0,
    size: 20,
  });

  const transactions: TransactionItem[] =
    ledgersData?.result?.content?.map((ledger) => ledgerToTransactionItem(ledger, accountLabel)) ?? [];

  const handleItemClick = (item: TransactionItem) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  return (
    <MobileLayout>
      <div className="relative flex flex-col w-full min-h-screen bg-white">
        <GoalDetailPageHeader
          goalId={id}
          isAmountAchievedActive={isCurrentActive}
          isSavingsSimulationActive={isPastActive}
          onMoreClick={() => setMoreSheetOpen(true)}
        />

        <GoalProgressGauge goalId={goalId} />
        <div className="px-5">
          <GoalSummaryCard goalId={goalId} />
        </div>
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
        <GoalMoreActionsBottomSheet
          isOpen={moreSheetOpen}
          onClose={() => setMoreSheetOpen(false)}
          onEditGoal={handleEditGoal}
          onDeleteGoal={handleDeleteGoalClick}
          onIconChangeConfirm={handleIconChangeConfirm}
          initialColorId={initialColorId}
          initialIconId={initialIconId}
        />
        <GoalDeleteConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </MobileLayout>
  );
};

export default AmountAchievedPage;
