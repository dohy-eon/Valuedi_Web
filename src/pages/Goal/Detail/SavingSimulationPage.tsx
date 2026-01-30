import { MobileLayout } from '@/components/layout/MobileLayout';
import { useState } from 'react';
import moreIcon from '@/assets/icons/goal/moreIcon.png';
import TotalSection from '@/components/goal/TotalSection';
import { paths } from '@/router/Router';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import SavingList from '@/components/goal/detail/SavingList';
import GoalMoreActionsBottomSheet from '@/components/goal/detail/GoalMoreActionsBottomSheet';
import GoalIconPickerBottomSheet from '@/components/goal/detail/GoalIconPickerBottomSheet';
import GoalDeleteConfirmModal from '@/components/goal/detail/GoalDeleteConfirmModal';

const mockGoals = [
  { id: 1, bankIcon: ExBank, title: '테야테야유럽갈테야', progress: 32, targetAmount: 10000000, remainingDays: 91 },
];

const SavingSimulationPage = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const goal = mockGoals.find((g) => g.id === Number(id)) || mockGoals[0];
  const isCurrentActive = location.pathname === paths.goal.amountAchieved(id || '');
  const isPastActive = location.pathname === paths.goal.savingsSimulation(id || '');

  return (
    <MobileLayout className="max-w-none shadow-none sm:max-w-[360px] sm:shadow-lg">
      <div className="relative flex flex-col w-full min-h-screen bg-white overflow-x-hidden">
        {/* 헤더 및 탭 섹션 */}
        <div className="sticky top-0 z-20 bg-white">
          <div className="flex items-center justify-between px-5 py-5">
            <h1 className="text-xl font-bold text-gray-900">목표</h1>
            <button type="button" className="p-1" onClick={() => setIsMoreOpen(true)}>
              <img src={moreIcon} alt="menu" className="w-6 h-6" />
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
      </div>

      <GoalMoreActionsBottomSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onChangeIcon={() => setIsIconPickerOpen(true)}
        onEditGoal={() => {
          if (!id) return;
          navigate(paths.goal.edit(id));
        }}
        onDeleteGoal={() => setIsDeleteModalOpen(true)}
      />

      <GoalIconPickerBottomSheet
        isOpen={isIconPickerOpen}
        onClose={() => setIsIconPickerOpen(false)}
        onConfirm={(payload) => console.log('아이콘/색상 선택', payload)}
      />

      <GoalDeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          navigate(paths.goal.current);
        }}
      />
    </MobileLayout>
  );
};

export default SavingSimulationPage;
