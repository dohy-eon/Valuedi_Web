import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalGNB from '@/components/goal/GoalGNB';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import DropDown from '@/assets/icons/goal/Dropdown.svg';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import GoalCard from '@/components/goal/GoalCard';

/* 목데이터 */
const mockGoals = [
  { id: 1, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
  { id: 2, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
  { id: 3, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
  { id: 4, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
  { id: 5, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
];

export const CurrentGoalPage = () => {
  const [sortBy, setSortBy] = useState<'latest' | 'achieve'>('latest');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#F2F4F6] flex flex-col">
      <div className="sticky top-0 z-20 w-full bg-white">
        <GoalGNB />
        <div className="flex w-full border-b border-[#E0E0E0]"></div>
      </div>

      <main className="flex-1 pb-24 overflow-y-auto">
        <div className="flex flex-col gap-5 p-5">
          {/* 목표 추가 버튼 */}
          <div
            onClick={() => navigate('/goal/create')}
            className="flex items-center w-full gap-4 p-6 transition-colors bg-white shadow-sm cursor-pointer rounded-xl active:bg-gray-50"
          >
            <div className="flex items-center justify-center w-12 h-12 border border-[#E0E0E0] rounded-full text-[#999999]">
              <span className="text-3xl font-light">+</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] text-[#999999]">또 다른 목표가 있나요?</span>
              <span className="text-[18px] font-bold text-[#171714]">목표 추가하기</span>
            </div>
          </div>

          {/* 정렬 필터 UI */}
          <div className="flex items-center gap-2 px-1 text-[13px] font-medium">
            <button onClick={() => setSortBy('latest')} className={sortBy === 'latest' ? 'text-[#171714]' : 'text-[#999999]'}>최신순</button>
            <span className="text-[#E0E0E0]">·</span>
            <button onClick={() => setSortBy('achieve')} className={sortBy === 'achieve' ? 'text-[#171714]' : 'text-[#999999]'}>달성순</button>
          </div>

          {/* GoalCard 사용 */}
          {mockGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} type="current" />
          ))}

          <button className="flex items-center justify-center gap-1 py-6 text-[15px] text-[#999999] font-medium">
            목록 더 보기
            <img src={DropDown} alt="dropdown" className="w-4 h-4 opacity-40" />
          </button>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E0E0E0] z-30">
        <BottomNavigation activeItem="goal" />
      </footer>
    </div>
  );
};

export default CurrentGoalPage;