import { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageIcon from '@/assets/icons/BackPage.svg';
import MoreIcon from '@/assets/icons/goal/MoreIcon.svg';
import TotalSection from '@/components/goal/TotalSection';
import { paths } from '@/router/Router';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import SavingList from '@/components/goal/detail/SavingList';
import GoalMoreActionsBottomSheet from '@/components/goal/detail/GoalMoreActionsBottomSheet';
import { useGoalDetail, useDeleteGoal } from '@/features/goal';

const SavingSimulationPage = () => {
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const deleteGoalMutation = useDeleteGoal();

  const goalId = Number(id);
  const { data: goalDetail, isLoading: isGoalLoading, error: goalError } = useGoalDetail(goalId);

  const isCurrentActive = location.pathname === paths.goal.amountAchieved(id || '');
  const isPastActive = location.pathname === paths.goal.savingsSimulation(id || '');

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
    bankIcon: ExBank,
    progress: detail.achievementRate,
    title: detail.title,
    targetAmount: detail.targetAmount,
    remainingDays: detail.remainingDays,
    goalId: goalId,
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

  return (
    <MobileLayout>
      <div className="relative flex flex-col w-full min-h-screen bg-white overflow-x-hidden">
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
        </div>

        <div className="text-xl font-bold pb-5 px-6">목표 계산기</div>

        <SavingList />
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

export default SavingSimulationPage;
