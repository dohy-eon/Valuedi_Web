import { useEffect, useState } from 'react';

interface GoalDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    goalId: number;
    title: string;
    savedAmount: number;
    targetAmount: number;
    remainingDays: number;
    achievementRate: number;
    account: {
      bankName: string;
      accountNumber: string;
    };
    status: string;
    colorCode: string;
    iconId: number;
  };
}

interface GoalProgressGaugeProps {
  goalId: number;
}

const GoalProgressGauge = ({ goalId }: GoalProgressGaugeProps) => {
  const [goalData, setGoalData] = useState<GoalDetailResponse['result'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`https://api.valuedi.site/api/goals/${goalId}`, {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        });

        const data: GoalDetailResponse = await response.json();

        if (data.isSuccess && data.result) {
          setGoalData(data.result);
        } else {
          setError(data.message || '데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoalData();
  }, [goalId]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-white min-h-[220px] flex items-center justify-center p-8 mx-[-1.25rem] w-[calc(100%+2.5rem)] shadow-sm">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error || !goalData) {
    return (
      <div className="relative overflow-hidden bg-white min-h-[220px] flex items-center justify-center p-8 mx-[-1.25rem] w-[calc(100%+2.5rem)] shadow-sm">
        <p className="text-red-500">{error || '데이터를 불러올 수 없습니다.'}</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white min-h-[50px] flex flex-col justify-end p-8 mx-[-1.25rem] w-[calc(100%+2.5rem)] shadow-sm">
      <div
        className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out bg-primary-normal"
        style={{ height: `${goalData.achievementRate}%` }}
      />

      <div className="relative z-10">
        <div className="px-1 mb-2 text-sm font-medium text-gray-600">총 모인 금액</div>

        <div className="flex items-center gap-4 px-1 pb-4">
          <span className="text-2xl font-bold text-black leading-tight">{formatAmount(goalData.savedAmount)}원</span>

          <div className="px-3 py-1 bg-primary-normal rounded-full text-xs font-bold text-[#171714]">
            {goalData.achievementRate}% 달성
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalProgressGauge;
