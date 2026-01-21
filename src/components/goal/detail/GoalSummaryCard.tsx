import WriteIcon from '@/assets/icons/goal/WriteIcon.svg';
import MoneyIcon from '@/assets/icons/goal/MoneyIcon.svg';
import CalendarIcon from '@/assets/icons/goal/CalendarIcon.svg';

interface GoalSummaryCardProps {
  title: string;
  targetAmount: number;
  remainingDays: number;
}

const GoalSummaryCard = ({ title, targetAmount, remainingDays }: GoalSummaryCardProps) => (
  <div className="p-3 bg-white rounded-3xl">
    <div className="flex items-center gap-2 mb-3">
      <h1 className="text-lg font-bold text-black">{title}</h1>

      <button className="p-1">
        <img src={WriteIcon} alt="edit goal" className="w-5 h-5 opacity-40" />
      </button>
    </div>

    <div className="p-8 space-y-6 bg-gray-100 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-500">
          <img src={MoneyIcon} alt="" className="w-5 h-5 opacity-50" />
          <span className="text-sm">목표금액</span>
        </div>

        <span className="text-sm font-bold">{targetAmount.toLocaleString()}원</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-500">
          <img src={CalendarIcon} alt="" className="w-5 h-5 opacity-50" />

          <span className="text-sm">남은일자</span>
        </div>

        <span className="text-sm font-bold">{remainingDays}일</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-500">
          <img src={MoneyIcon} alt="" className="w-5 h-5 opacity-50" />

          <span className="text-sm">저축계좌</span>
        </div>

        <span className="text-sm">청년주택드림청약통장</span>
      </div>
    </div>
  </div>
);

export default GoalSummaryCard;

