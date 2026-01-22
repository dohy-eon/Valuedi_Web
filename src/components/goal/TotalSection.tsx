import WriteIcon from '@/assets/icons/goal/WriteIcon.svg';
import MoneyIcon from '@/assets/icons/goal/MoneyIcon.svg';
import CalendarIcon from '@/assets/icons/goal/CalendarIcon.svg';

type Goal = {
  bankIcon: string;
  progress: number;
  title: string;
  targetAmount: number;
  remainingDays: number;
};

interface GoalSummaryProps {
  goal: Goal;
}

const TotalSection = ({ goal }: GoalSummaryProps) => (
  <>
    <div className="flex items-center gap-3 px-1 mb-2">
      <div className="flex items-center justify-center w-[48px] h-[48px] flex-shrink-0">
        <img src={goal.bankIcon} alt="bank icon" className="w- h-9" />
      </div>

      <div className="text-[15px] text-gray-500 font-semibold whitespace-nowrap">하나카드 | 1213190120-42-12233</div>
    </div>

    {/* 달성 게이지 */}

    <div className="relative overflow-hidden bg-white min-h-[220px] flex flex-col justify-end p-8 mx-[-1.25rem] w-[calc(100%+2.5rem)] shadow-sm">
      <div
        className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out bg-primary-normal"
        style={{ height: `${goal.progress}%` }}
      />

      <div className="relative z-10">
        <div className="px-1 mb-2 text-base font-medium text-gray-600">총 모인 금액</div>

        <div className="flex items-center gap-4 px-1 pb-4">
          <span className="text-[40px] font-extrabold text-black leading-tight">526,387원</span>

          <div className="px-3 py-1 bg-primary-normal rounded-full text-[13px] font-bold text-[#171714]">
            {goal.progress}% 달성
          </div>
        </div>
      </div>
    </div>

    {/* 상세 카드 */}

    <div className="p-4 bg-white rounded-3xl">
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-lg font-bold text-black">{goal.title}</h1>

        <button className="p-1">
          <img src={WriteIcon} alt="edit goal" className="w-5 h-5 opacity-40" />
        </button>
      </div>

      <div className="p-8 space-y-6 bg-white rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500">
            <img src={MoneyIcon} alt="" className="w-5 h-5 opacity-50" />
            <span className="text-sm">목표금액</span>
          </div>

          <span className="text-sm font-bold">{goal.targetAmount.toLocaleString()}원</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500">
            <img src={CalendarIcon} alt="" className="w-5 h-5 opacity-50" />

            <span className="text-sm">남은일자</span>
          </div>

          <span className="text-sm font-bold">{goal.remainingDays}일</span>
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
  </>
);

export default TotalSection;
