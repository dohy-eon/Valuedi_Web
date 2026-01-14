import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarIcon from '@/assets/icons/goal/CalendarIcon.svg';
import MoneyIcon from '@/assets/icons/goal/MoneyIcon.svg';
import ExBank from '@/assets/icons/goal/ExBank.svg';
import WriteIcon from '@/assets/icons/goal/WriteIcon.svg';
import Hamburger from '@/assets/icons/Hamburger.svg';

// --- 인터페이스 정의 (TypeScript 에러 해결의 핵심) ---
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
  // useState에 제네릭 <TransactionItem | null> 추가하여 'never' 에러 해결
  const [selectedItem, setSelectedItem] = useState<TransactionItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const goal = mockGoals.find((g) => g.id === Number(id)) || mockGoals[0];
  const isCurrentActive = location.pathname.includes('amountAchieved');
  const isPastActive = location.pathname.includes('savingsimulation');

  // 파라미터에 타입 명시
  const handleItemClick = (item: TransactionItem) => {
    setSelectedItem(item);
    setIsSheetOpen(true);
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-white">
      {/* 1. 상단 헤더 및 탭 영역 */}
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

      {/* 2. 실 컨텐츠 영역 */}
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-3 px-1 mb-2">
          <div className="flex items-center justify-center w-[48px] h-[48px] flex-shrink-0">
            <img src={goal.bankIcon} alt="bank icon" className="w-7 h-7" />
          </div>
          <div className="text-[15px] text-[#4E5968] font-semibold whitespace-nowrap">
            하나카드 <span className="mx-1 text-[#E0E0E0]">|</span> 1213190120-42-12233
          </div>
        </div>

        <div className="relative overflow-hidden bg-white min-h-[220px] flex flex-col justify-end p-8 mx-[-1.25rem] w-[calc(100%+2.5rem)] shadow-sm">
          <div
            className="absolute bottom-0 left-0 w-full bg-[#FFF500] transition-all duration-1000 ease-out"
            style={{ height: `${goal.progress}%` }}
          />
          <div className="relative z-10">
            <div className="px-1 mb-2 text-base font-medium text-[#4E5968]">총 모인 금액</div>
            <div className="flex items-center gap-4 px-1 pb-4">
              <span className="text-[40px] font-extrabold text-[#191F28] leading-tight">526,387원</span>
              <div className="px-3 py-1 bg-[#FFE500] rounded-full text-[13px] font-bold text-[#171714]">
                {goal.progress}% 달성
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-3xl">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-lg font-bold text-[#191F28]">{goal.title}</h1>
            <button className="p-1">
              <img src={WriteIcon} alt="edit goal" className="w-5 h-5 opacity-40" />
            </button>
          </div>
          <div className="space-y-6 bg-[#F9FAFB] p-8 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#8B95A1]">
                <img src={MoneyIcon} alt="" className="w-5 h-5 opacity-50" />
                <span className="text-sm">목표금액</span>
              </div>
              <span className="text-sm">{goal.targetAmount.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#8B95A1]">
                <img src={CalendarIcon} alt="" className="w-5 h-5 opacity-50" />
                <span className="text-sm">남은일자</span>
              </div>
              <span className="text-sm">{goal.remainingDays}일</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[#8B95A1]">
                <img src={MoneyIcon} alt="" className="w-5 h-5 opacity-50" />
                <span className="text-sm">저축계좌</span>
              </div>
              <span className="text-sm">청년주택드림청약통장</span>
            </div>
          </div>
        </div>

        <div className="h-0.5 bg-[#F2F4F6] mx-[-1.25rem] w-[calc(100%+2.5rem)]" />

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

      <AnimatePresence>
        {isSheetOpen && selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
              className="fixed inset-0 bg-black/40 z-[100]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[101] px-8 pt-12 pb-10 shadow-2xl"
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#E5E8EB] rounded-full" />
              <h2 className="text-2xl font-bold text-[#191F28] mb-8">{selectedItem.type}</h2>
              <div className="relative mb-3 border rounded-xl border-[#E0E0E0] p-2 py-4">
                <input
                  type="text"
                  placeholder="메모를 남겨주세요 (최대 20자)"
                  className="w-full text-[16px] outline-none placeholder:text-[#ADB5BD]"
                />
                <img src={WriteIcon} alt="edit memo" className="absolute w-5 h-5 right-4 top-4 opacity-40" />
              </div>
              <div className="mb-12 space-y-6">
                <div className="flex justify-between text-[15px]">
                  <span className="text-[#8B95A1]">거래시간</span>
                  <span className="text-[#4E5968]">{selectedItem.time}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-[#8B95A1]">거래구분</span>
                  <span className="text-[#4E5968]">{selectedItem.category}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-[#8B95A1]">거래금액</span>
                  <span className="text-[#191F28] font-bold">{selectedItem.amount.replace('-', '')}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-[#8B95A1]">거래 후 잔액</span>
                  <span className="text-[#191F28] font-bold">{selectedItem.balanceAfter}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-[#8B95A1]">입금계좌</span>
                  <span className="text-[#4E5968]">{selectedItem.account}</span>
                </div>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="w-full bg-[#FFE500] py-5 rounded-2xl font-bold text-lg active:scale-[0.98] transition-transform"
              >
                확인하기
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AmountAchievedPage;
