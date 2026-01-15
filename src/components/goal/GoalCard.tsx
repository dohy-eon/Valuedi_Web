import { useNavigate } from 'react-router-dom';
import MoneyIcon from '@/assets/icons/goal/MoneyIcon.svg';
import CalendarIcon from '@/assets/icons/goal/CalendarIcon.svg';
import { paths } from '@/router/Router';

interface GoalCardProps {
  goal: {
    id: number;
    bankIcon: string;
    title: string;
    progress: number;
    targetAmount: number;
    remainingDays: number;
  };
  type?: 'current' | 'past';
}

const GoalCard = ({ goal, type = 'current' }: GoalCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(paths.goal.amountAchieved(goal.id))}
      className={`w-full cursor-pointer bg-white p-7 shadow-sm transition-colors rounded-2xl active:bg-gray-50 ${
        type === 'past' ? 'opacity-70' : ''
      }`}
    >
      {/* 상단 섹션*/}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-15 h-15">
          <img src={goal.bankIcon} alt="bank" className="w-8 h-8" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-gray-900">{goal.title}</span>
          <div className="whitespace-nowrap rounded-full bg-yellow-300 px-3 py-1 text-[13px] font-bold text-gray-900">
            {goal.progress}% 달성
          </div>
        </div>
      </div>

      {/* 목표 금액 및 남은 일자 */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-400">
            <img src={MoneyIcon} alt="money" className="w-6 h-6 opacity-40" />
            <span className="text-sm font-medium">목표금액</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{goal.targetAmount.toLocaleString()}원</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-400">
            <img src={CalendarIcon} alt="calendar" className="w-6 h-6 opacity-40" />
            <span className="text-sm font-medium">남은일자</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{goal.remainingDays}일</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
