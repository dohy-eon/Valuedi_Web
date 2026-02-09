import { useState } from 'react';
import GoalGNB from '@/components/goal/GoalGNB';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import DropDown from '@/assets/icons/goal/Dropdown.svg';
import GoalCard from '@/components/goal/GoalCard';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useCompletedGoals } from '@/features/goal';

export const PastGoalPage = () => {
  const [sortBy, setSortBy] = useState<'latest' | 'achieve'>('latest');

  // API 연결
  const sortParam = sortBy === 'latest' ? 'TIME_DESC' : 'PROGRESS_DESC';
  const { data, isLoading, error } = useCompletedGoals(sortParam);
  const goals = data?.result.goals || [];

  return (
    <MobileLayout>
      <div className="flex flex-col w-full min-h-screen bg-gray-50">
        <div className="sticky top-0 z-20 w-full bg-white">
          <GoalGNB />
        </div>

        <main className="flex-1 pb-24">
          <div className="flex flex-col gap-5 p-5">
            {/* 정렬 필터 UI */}
            <div className="flex items-center gap-2 px-1 text-[13px] font-medium">
              <button
                onClick={() => setSortBy('latest')}
                className={`transition-colors ${sortBy === 'latest' ? 'text-gray-900' : 'text-gray-400'}`}
              >
                최신순
              </button>
              <span className="text-gray-200">·</span>
              <button
                onClick={() => setSortBy('achieve')}
                className={`transition-colors ${sortBy === 'achieve' ? 'text-gray-900' : 'text-gray-400'}`}
              >
                달성순
              </button>
            </div>

            {/* Goal 리스트: type="past" 적용 */}
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <div className="text-center text-gray-400">로딩 중...</div>
              ) : error ? (
                <div className="text-center text-red-500">목표를 불러오는데 실패했습니다.</div>
              ) : goals.length === 0 ? (
                <div className="text-center text-gray-400">지난 목표가 없습니다.</div>
              ) : (
                goals.map((goal) => (
                  <GoalCard
                    key={goal.goalId}
                    goal={{
                      id: goal.goalId,
                      title: goal.title,
                      progress: goal.achievementRate,
                      targetAmount: goal.savedAmount,
                      remainingDays: goal.remainingDays,
                      colorCode: goal.colorCode,
                      iconId: goal.iconId,
                    }}
                    type="past"
                  />
                ))
              )}
            </div>

            <button className="flex items-center justify-center gap-1 py-6 text-sm font-medium text-gray-400 transition-opacity active:opacity-50">
              지난 목록 더 보기
              <img src={DropDown} alt="dropdown" className="w-4 h-4 opacity-40" />
            </button>
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100">
          <BottomNavigation activeItem="goal" />
        </footer>
      </div>
    </MobileLayout>
  );
};
