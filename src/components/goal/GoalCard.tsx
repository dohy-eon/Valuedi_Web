import { useNavigate } from 'react-router-dom';
import { paths } from '@/router/paths';
import MoneyIcon from '@/assets/icons/goal/MoneyIcon.svg';
import CalendarIcon from '@/assets/icons/goal/CalendarIcon.svg';

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
  const handleClick = () => {
    navigate(paths.goal.amountAchieved(goal.id));
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full transition-colors bg-white shadow-sm cursor-pointer p-5 rounded-xl active:bg-gray-50 ${
        type === 'past' ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-10 h-10 bg-neutral-10 rounded-xl">
          <img src={goal.bankIcon} alt="bank" className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-[#171714]">{goal.title}</span>
          <div className="px-2.5 py-0.5 bg-primary-normal rounded-full text-xs font-bold text-[#171714] whitespace-nowrap">
            {goal.progress}% 달성
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-50">
            <img src={MoneyIcon} alt="money" className="w-5 h-5 opacity-40" />
            <span className="text-sm font-medium">목표 금액</span>
          </div>
          <span className="text-sm font-bold text-[#171714]">{goal.targetAmount.toLocaleString()}원</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-50">
            <img src={CalendarIcon} alt="calendar" className="w-5 h-5 opacity-40" />
            <span className="text-sm font-medium">남은 일자</span>
          </div>
          <span className="text-sm font-bold text-[#171714]">{goal.remainingDays}일</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
