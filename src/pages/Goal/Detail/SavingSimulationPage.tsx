import { MobileLayout } from '@/components/layout/MobileLayout';
import TotalSection from '@/components/goal/TotalSection';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import SavingList from '@/components/goal/detail/SavingList';
import GoalMoreActionsBottomSheet from '@/components/goal/detail/GoalMoreActionsBottomSheet';
import GoalDeleteConfirmModal from '@/components/goal/detail/GoalDeleteConfirmModal';
import GoalDetailPageHeader from '@/components/goal/detail/GoalDetailPageHeader';
import { useGoalDetailActions, useGoalDetailSheetInitials } from '@/hooks/Goal/useGoalDetailActions';

const SavingSimulationPage = () => {
  const {
    id,
    isGoalLoading,
    goalError,
    goalDetail,
    detail,
    goal,
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
      <div className="relative flex flex-col w-full min-h-screen bg-white overflow-x-hidden">
        <GoalDetailPageHeader
          goalId={id}
          isAmountAchievedActive={isCurrentActive}
          isSavingsSimulationActive={isPastActive}
          onMoreClick={() => setMoreSheetOpen(true)}
        />

        <div className="flex flex-col gap-4 p-5">
          <TotalSection goal={goalWithIcon} />
        </div>

        <div className="text-xl font-bold pb-5 px-6">목표 계산기</div>
        <SavingList />

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

export default SavingSimulationPage;
