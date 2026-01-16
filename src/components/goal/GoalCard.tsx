import { useNavigate } from 'react-router-dom';
import { paths } from '@/router/Router';
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

  // 클릭 시 paths 객체의 함수를 사용하여 이동
  const handleClick = () => {
    navigate(paths.goal.amountAchieved(goal.id));
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full transition-colors bg-white shadow-sm cursor-pointer p-7 rounded-xl active:bg-gray-50 ${
        type === 'past' ? 'opacity-70' : ''
      }`}
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
  );
};

export default GoalCard;
