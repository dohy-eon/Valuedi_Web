import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Hamburger from '@/assets/icons/Hamburger.svg';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import TotalSection from '@/components/goal/TotalSection';
import GoalBottomSheet from '@/components/goal/GoalBottonSheet';

interface TransactionItem {
  id: number;
  type: string;
  amount: string;
  time: string;
  category: string;
  balanceAfter: string;
  account: string;
  isPositive: boolean;
}

interface TransactionGroup {
  date: string;
  dailyBalance: string;
  items: TransactionItem[];
}

// --- 목데이터 ---
const mockTransactions: TransactionGroup[] = [
  {
    date: '19일 오늘',
    dailyBalance: '23,000 원',
    items: [
      {
        id: 101,
        type: '입금',
        amount: '3,000 원',
        time: '2025.12.03 18:44:44',
        category: '일반이체',
        balanceAfter: '23,000원',
        account: '국민은행 592802-04-170725',
        isPositive: true,
      },
      {
        id: 102,
        type: '출금',
        amount: '- 13,000 원',
        time: '2025.12.03 15:20:10',
        category: '카드결제',
        balanceAfter: '10,000원',
        account: '우리은행 1002-123-456789',
        isPositive: false,
      },
    ],
  },
  {
    date: '18일 어제',
    dailyBalance: '230,000 원',
    items: [
      {
        id: 201,
        type: '입금',
        amount: '3,000 원',
        time: '2025.12.02 10:00:00',
        category: '일반이체',
        balanceAfter: '230,000원',
        account: '국민은행 592802-04-170725',
        isPositive: true,
      },
    ],
  },
];

const mockGoals = [
  { id: 1, bankIcon: ExBank, title: '테야테야유럽갈테야', progress: 32, targetAmount: 10000000, remainingDays: 91 },
];

const AmountAchievedPage = () => {
  const [sortBy, setSortBy] = useState<'latest' | 'achieve'>('latest');
  const [selectedItem, setSelectedItem] = useState<TransactionItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const goal = mockGoals.find((g) => g.id === Number(id)) || mockGoals[0];
  const isCurrentActive = location.pathname.includes('amountAchieved');
  const isPastActive = location.pathname.includes('savingsimulation');

  const handleItemClick = (item: TransactionItem) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-white">
      {/* 헤더 및 탭 */}
      <div className="sticky top-0 z-20 bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h1 className="text-[20px] font-bold text-[#171714]">목표</h1>
          <img src={Hamburger} alt="menu" className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="flex w-full border-b border-[#E0E0E0]">
          <button
            onClick={() => navigate(`/goal/detail/${id}/amountAchieved`)}
            className={`flex-1 py-4 text-center text-[16px] transition-all ${isCurrentActive ? 'font-bold text-[#171714] border-b-2 border-[#171714]' : 'font-medium text-[#999999]'}`}
          >
            달성 금액
          </button>
          <button
            onClick={() => navigate(`/goal/detail/${id}/savingsimulation`)}
            className={`flex-1 py-4 text-center text-[16px] transition-all ${isPastActive ? 'font-bold text-[#171714] border-b-2 border-[#171714]' : 'font-medium text-[#999999]'}`}
          >
            절약 시뮬레이션
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <TotalSection goal={goal} />
        <div className="h-0.5 bg-[#F2F4F6] mx-[-1.25rem] w-[calc(100%+2.5rem)]" />
        {/* 목록 리스트 */}
        <div className="py-2">
          <div className="mb-2 text-lg font-bold">저금 목록</div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#999999] mb-4">
            <button onClick={() => setSortBy('latest')} className={sortBy === 'latest' ? 'text-[#171714]' : ''}>
              최신순
            </button>
            <span>·</span>
            <button onClick={() => setSortBy('achieve')} className={sortBy === 'achieve' ? 'text-[#171714]' : ''}>
              달성순
            </button>
          </div>

          {mockTransactions.map((group) => (
            <div key={group.date} className="flex flex-col mb-4">
              <div className="flex justify-between py-3 border-b border-[#F2F4F6] text-sm text-[#8B95A1]">
                <span>{group.date}</span>
                <span>{group.dailyBalance}</span>
              </div>
              {group.items.map((item) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item)}
                  onClick={() => handleItemClick(item)}
                  className="flex justify-between px-1 py-5 transition-colors cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                >
                  <span className="text-[16px] text-[#4E5968] font-medium">{item.type}</span>
                  <span className={`text-[16px] font-bold ${item.isPositive ? 'text-[#191F28]' : 'text-[#665c00]'}`}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <GoalBottomSheet isOpen={isSheetOpen} item={selectedItem} onClose={() => setIsSheetOpen(false)} />
    </div>
  );
};

export default AmountAchievedPage;
