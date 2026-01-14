import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalGNB from '@/components/goal/GoalGNB';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import DropDown from '@/assets/icons/goal/Dropdown.svg';
import MoneyIcon from '@/assets/icons/goal/MoneyIcon.svg';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import CalendarIcon from '@/assets/icons/goal/CalendarIcon.svg';

/* 목데이터 */
const mockGoals = [
  { id: 1, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
  { id: 2, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
  { id: 3, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
  { id: 4, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
  { id: 5, bankIcon: ExBank, title: '목표진행입니다', progress: 32, targetAmount: 10000000, remainingDays: 91 },
];

export const GoalPage = () => {
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
          {/* 정렬 필터 */}
          <div className="flex items-center gap-2 px-1 text-[13px] font-medium">
            <button
              onClick={() => setSortBy('latest')}
              className={`${sortBy === 'latest' ? 'text-[#171714]' : 'text-[#999999]'}`}
            >
              최신순
            </button>
            <span className="text-[#E0E0E0]">·</span>
            <button
              onClick={() => setSortBy('achieve')}
              className={`${sortBy === 'achieve' ? 'text-[#171714]' : 'text-[#999999]'}`}
            >
              달성순
            </button>
          </div>

          {/* 목표 카드 리스트 */}
          {mockGoals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => navigate(`/goal/detail/${goal.id}/amountAchieved`)}
              className="w-full transition-colors bg-white shadow-sm cursor-pointer p-7 rounded-xl active:bg-gray-50"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#E8EFFF] rounded-[14px]">
                  <img src={goal.bankIcon} alt="bank" className="w-8 h-8" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-bold text-[#171714] tracking-tight">{goal.title}</span>
                  <div className="px-3 py-1 bg-[#FFE500] rounded-full text-[13px] font-bold text-[#171714] whitespace-nowrap">
                    {goal.progress}% 달성
                  </div>
                </div>
              </div>

              {/* 목표 상세 정보 */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#999999]">
                    <img src={MoneyIcon} alt="money" className="w-6 h-6 opacity-40" />
                    <span className="text-sm font-medium">목표금액</span>
                  </div>
                  <span className="text-sm font-bold text-[#171714]">{goal.targetAmount.toLocaleString()}원</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#999999]">
                    <img src={CalendarIcon} alt="calendar" className="w-6 h-6 opacity-40" />
                    <span className="text-sm font-medium">남은일자</span>
                  </div>
                  <span className="text-sm font-bold text-[#171714]">{goal.remainingDays}일</span>
                </div>
              </div>
            </div>
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

export default GoalPage;
