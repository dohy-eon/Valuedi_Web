interface GoalProgressGaugeProps {
  progress: number;
}

const GoalProgressGauge = ({ progress }: GoalProgressGaugeProps) => (
  <div className="relative overflow-hidden bg-white min-h-[220px] flex flex-col justify-end p-8 mx-[-1.25rem] w-[calc(100%+2.5rem)] shadow-sm">
    <div
      className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out bg-primary-normal"
      style={{ height: `${progress}%` }}
    />

    <div className="relative z-10">
      <div className="px-1 mb-2 text-sm font-medium text-gray-600">총 모인 금액</div>

      <div className="flex items-center gap-4 px-1 pb-4">
        <span className="text-4xl font-extrabold text-black leading-tight">526,387원</span>

        <div className="px-3 py-1 bg-primary-normal rounded-full text-xs font-bold text-[#171714]">
          {progress}% 달성
        </div>
      </div>
    </div>
  </div>
);

export default GoalProgressGauge;
