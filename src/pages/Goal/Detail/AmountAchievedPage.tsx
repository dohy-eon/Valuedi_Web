import ExBank from '@/assets/icons/goal/ExBank.svg';
import TotalSection from '@/components/goal/TotalSection';
import GoalBottomSheet from '@/components/goal/GoalBottonSheet';
import GoalMoreActionsBottomSheet from '@/components/goal/detail/GoalMoreActionsBottomSheet';
import GoalDeleteConfirmModal from '@/components/goal/detail/GoalDeleteConfirmModal';
import GoalDetailPageHeader from '@/components/goal/detail/GoalDetailPageHeader';
import AmountAchievedLedgerList from '@/components/goal/detail/AmountAchievedLedgerList';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useAmountAchievedPage } from '@/hooks/Goal/useAmountAchievedPage';
import { useGoalDetailSheetInitials } from '@/hooks/Goal/useGoalDetailActions';

const AmountAchievedPage = () => {
  const {
    id,
    isGoalLoading,
    goalError,
    goalDetail,
    detail,
    goal,
    transactions,
    ledgersLoading,
    sortBy,
    setSortBy,
    isSheetOpen,
    setIsSheetOpen,
    moreSheetOpen,
    setMoreSheetOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    isCurrentActive,
    isPastActive,
    selectedItem,
    handleItemClick,
    handleDeleteGoalClick,
    handleDeleteConfirm,
    handleEditGoal,
    handleIconChangeConfirm,
  } = useAmountAchievedPage();
  const { initialColorId, initialIconId } = useGoalDetailSheetInitials(detail);

  if (isGoalLoading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-400">로딩 중...</div>
        </div>
      </MobileLayout>
    );
  }

  if (goalError || !goalDetail?.result || !detail || !goal) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">목표를 찾을 수 없습니다.</div>
        </div>
      </MobileLayout>
    );
  }

  const goalWithIcon = { ...goal, bankIcon: ExBank };

  return (
    <MobileLayout>
      <div className="relative flex flex-col w-full min-h-screen bg-white">
        <GoalDetailPageHeader
          goalId={id}
          isAmountAchievedActive={isCurrentActive}
          isSavingsSimulationActive={isPastActive}
          onMoreClick={() => setMoreSheetOpen(true)}
        />

        <div className="flex flex-col gap-4 p-5">
          <TotalSection goal={goalWithIcon} />

          <div className="-mx-5 h-0.5 w-[calc(100%+2.5rem)] bg-gray-100" />

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
