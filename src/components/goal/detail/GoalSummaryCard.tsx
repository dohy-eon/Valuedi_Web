import { useEffect, useState } from 'react';
import MoneyIcon from '@/assets/icons/goal/MoneyIcon.svg';
import CalendarIcon from '@/assets/icons/goal/CalendarIcon.svg';

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

interface GoalSummaryCardProps {
  goalId: number;
}

const GoalSummaryCard = ({ goalId }: GoalSummaryCardProps) => {
  const [goalData, setGoalData] = useState<GoalDetailResponse['result'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');

        if (!token) {
          setError('로그인이 필요합니다.');
          setLoading(false);
          return;
        }

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

  const maskAccountNumber = (accountNumber: string) => {
    const parts = accountNumber.split('-');
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1]}-****${parts[2].slice(-2)}`;
    }
    return accountNumber;
  };

  if (loading) {
    return (
      <div className="p-3 bg-white rounded-3xl">
        <div className="p-5 space-y-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-center text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !goalData) {
    return (
      <div className="p-3 bg-white rounded-3xl">
        <div className="p-5 space-y-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-center text-red-500">{error || '데이터를 불러올 수 없습니다.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 bg-white rounded-3xl">
      <div className="flex items-center gap-2 mb-3"></div>

      <div className="p-5 space-y-4 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500">
            <img src={MoneyIcon} alt="" className="w-4 h-4 opacity-50" />
            <span className="text-xs">목표금액</span>
          </div>

          <span className="text-xs font-bold">{formatAmount(goalData.targetAmount)}원</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500">
            <img src={CalendarIcon} alt="" className="w-4 h-4 opacity-50" />
            <span className="text-xs">남은일자</span>
          </div>

          <span className="text-xs font-bold">{goalData.remainingDays}일</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500">
            <img src={MoneyIcon} alt="" className="w-4 h-4 opacity-50" />
            <span className="text-xs">저축계좌</span>
          </div>

          <span className="text-xs">
            {goalData.account.bankName} | {maskAccountNumber(goalData.account.accountNumber)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoalSummaryCard;
