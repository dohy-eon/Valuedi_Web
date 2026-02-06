import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moreIcon from '@/assets/icons/goal/MoreIcon.svg';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import TotalSection from '@/components/goal/TotalSection';
import GoalBottomSheet from '@/components/goal/GoalBottonSheet';
import GoalMoreActionsBottomSheet from '@/components/goal/detail/GoalMoreActionsBottomSheet';
import GoalIconPickerBottomSheet from '@/components/goal/detail/GoalIconPickerBottomSheet';
import GoalDeleteConfirmModal from '@/components/goal/detail/GoalDeleteConfirmModal';
import { paths } from '@/router/Router';
import { MobileLayout } from '@/components/layout/MobileLayout';
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
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const goal = mockGoals.find((g) => g.id === Number(id)) || mockGoals[0];
  const isCurrentActive = location.pathname === paths.goal.amountAchieved(id || '');
  const isPastActive = location.pathname === paths.goal.savingsSimulation(id || '');

  const handleItemClick = (item: TransactionItem) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  return (
    <MobileLayout className="max-w-none shadow-none sm:max-w-[360px] sm:shadow-lg">
      <div className="relative flex flex-col w-full h-screen bg-white">
        <div className="sticky top-0 z-20 bg-white">
          <div className="flex items-center justify-between px-5 py-5">
            <h1 className="text-xl font-bold text-gray-900">목표</h1>
            <button type="button" className="p-1" onClick={() => setIsMoreOpen(true)}>
              <img src={moreIcon} alt="menu" className="w-6 h-6" />
            </button>
          </div>

          <div className="flex w-full border-b border-gray-200">
            <button
              onClick={() => id && navigate(paths.goal.amountAchieved(id))}
              className={`flex-1 py-4 text-center text-base transition-all ${
                isCurrentActive ? 'font-bold text-gray-900 border-b-2 border-gray-900' : 'font-medium text-gray-400'
              }`}
            >
              달성 금액
            </button>
            <button
              onClick={() => id && navigate(paths.goal.savingsSimulation(id))}
              className={`flex-1 py-4 text-center text-base transition-all ${
                isPastActive ? 'font-bold text-gray-900 border-b-2 border-gray-900' : 'font-medium text-gray-400'
              }`}
            >
              절약 시뮬레이션
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="flex flex-col gap-4 p-5">
            <TotalSection goal={goal} />

            <div className="-mx-5 h-0.5 w-[calc(100%+2.5rem)] bg-gray-100" />

            <div className="py-2">
              <div className="mb-2 text-lg font-bold text-gray-900">저금 목록</div>

              <div className="mb-4 flex items-center gap-2 text-[13px] font-medium text-gray-400">
                <button
                  onClick={() => setSortBy('latest')}
                  className={`transition-colors ${sortBy === 'latest' ? 'text-gray-900' : ''}`}
                >
                  최신순
                </button>
                <span className="text-gray-200">·</span>
                <button
                  onClick={() => setSortBy('achieve')}
                  className={`transition-colors ${sortBy === 'achieve' ? 'text-gray-900' : ''}`}
                >
                  달성순
                </button>
              </div>

              <div className="flex flex-col">
                {mockTransactions.map((group) => (
                  <div key={group.date} className="flex flex-col mb-4">
                    <div className="flex justify-between py-3 text-sm text-gray-400 border-b border-gray-50">
                      <span>{group.date}</span>
                      <span>{group.dailyBalance}</span>
                    </div>
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className="flex justify-between px-1 py-5 transition-colors cursor-pointer active:bg-gray-50"
                      >
                        <span className="text-base font-medium text-gray-600">{item.type}</span>
                        <span
                          className={`text-base font-bold ${item.isPositive ? 'text-gray-900' : 'text-primary-heavy'}`}
                        >
                          {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <GoalBottomSheet isOpen={isSheetOpen} item={selectedItem} onClose={() => setIsSheetOpen(false)} />
        <GoalMoreActionsBottomSheet
          isOpen={isMoreOpen}
          onClose={() => setIsMoreOpen(false)}
          onChangeIcon={() => setIsIconPickerOpen(true)}
          onEditGoal={() => {
            if (!id) return;
            navigate(paths.goal.edit(id));
          }}
          onDeleteGoal={() => setIsDeleteModalOpen(true)}
        />

        <GoalIconPickerBottomSheet
          isOpen={isIconPickerOpen}
          onClose={() => setIsIconPickerOpen(false)}
          onConfirm={(payload) => console.log('아이콘/색상 선택', payload)}
        />

        <GoalDeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            navigate(paths.goal.current);
          }}
        />
      </div>
    </MobileLayout>
  );
};

export default AmountAchievedPage;
