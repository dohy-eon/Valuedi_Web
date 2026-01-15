import { useMemo } from 'react';
import { TransactionItem } from '@/features/asset/constants/account';
import {
  transformToCategoryGroups,
  TransactionWithDetails,
} from '@/pages/Asset/tab/SectorAnalysis/components/sectorUtils';
import { useGetAccountDetail } from '@/hooks/Asset/useGetAccountDetail';

const rawData: (TransactionItem & { date: string })[] = [
  // --- 2026년 1월 (이번 달) ---
  {
    id: 101,
    title: '신한할인캐쉬백',
    sub: '금융수입 | 쏠편한 입출금통장',
    amount: 3000,
    type: 'income',
    category: 'transfer',
    date: '2026-01-19',
  },
  {
    id: 102,
    title: '김*주',
    sub: '내계좌이체 | KB국민ONE통장',
    amount: -30000,
    type: 'expense',
    category: 'transfer',
    date: '2026-01-19',
  },
  {
    id: 103,
    title: '스타벅스 사당점',
    sub: '식비 | 체크카드',
    amount: -4500,
    type: 'expense',
    category: 'food',
    date: '2026-01-19',
  },
  {
    id: 104,
    title: '아웃백 스테이크',
    sub: '식비 | 신용카드',
    amount: -150000,
    type: 'expense',
    category: 'food',
    date: '2026-01-19',
  },
  {
    id: 105,
    title: '카카오T_택시',
    sub: '교통 | 카카오뱅크 카드',
    amount: -15000,
    type: 'expense',
    category: 'traffic',
    date: '2026-01-19',
  },
  {
    id: 106,
    title: '올리브영 사당',
    sub: '쇼핑 | 화장품',
    amount: -30000,
    type: 'expense',
    category: 'shopping',
    date: '2026-01-19',
  },
  {
    id: 107,
    title: '한림대병원',
    sub: '의료 | 신용카드',
    amount: -5000,
    type: 'expense',
    category: 'medical',
    date: '2026-01-19',
  },
  {
    id: 108,
    title: '기타 지출',
    sub: '카테고리 없음',
    amount: -15000,
    type: 'expense',
    category: 'default',
    date: '2026-01-19',
  },

  // --- 1월 중순 내역 ---
  {
    id: 109,
    title: '맥도날드',
    sub: '식비 | 현금',
    amount: -78500,
    type: 'expense',
    category: 'food',
    date: '2026-01-18',
  },
  {
    id: 110,
    title: '교보문고',
    sub: '도서구입',
    amount: -23000,
    type: 'expense',
    category: 'default',
    date: '2026-01-18',
  },
  {
    id: 111,
    title: 'CU',
    sub: '편의점 | 체크카드',
    amount: -2500,
    type: 'expense',
    category: 'market',
    date: '2026-01-18',
  },
  {
    id: 112,
    title: 'SKT',
    sub: '통신 | 신용카드',
    amount: -20000,
    type: 'expense',
    category: 'living',
    date: '2026-01-17',
  },
  {
    id: 113,
    title: '메가커피',
    sub: '카페 | 체크카드',
    amount: -8000,
    type: 'expense',
    category: 'cafe',
    date: '2026-01-17',
  },
  {
    id: 114,
    title: '김*주',
    sub: '내계좌이체 | KB국민ONE통장',
    amount: -30000,
    type: 'expense',
    category: 'transfer',
    date: '2026-01-17',
  },
  {
    id: 115,
    title: '신한할인캐쉬백',
    sub: '금융수입 | 쏠편한 입출금통장',
    amount: 3000,
    type: 'income',
    category: 'transfer',
    date: '2026-01-17',
  },
  {
    id: 116,
    title: '카카오T_택시',
    sub: '교통 | 카카오뱅크 카드',
    amount: -15000,
    type: 'expense',
    category: 'traffic',
    date: '2026-01-17',
  },
  {
    id: 117,
    title: '올리브영 사당',
    sub: '쇼핑 | 화장품',
    amount: -30000,
    type: 'expense',
    category: 'shopping',
    date: '2026-01-17',
  },

  // --- 2025년 12월 (지난달) ---
  {
    id: 201,
    title: 'CGV 사당',
    sub: '여가 | 영화 예매',
    amount: -45000,
    type: 'expense',
    category: 'leisure',
    date: '2025-12-25',
  },
  {
    id: 202,
    title: '올리브영 사당',
    sub: '쇼핑 | 화장품',
    amount: -30000,
    type: 'expense',
    category: 'shopping',
    date: '2025-12-20',
  },
  {
    id: 203,
    title: '카카오T_택시',
    sub: '교통 | 카카오뱅크 카드',
    amount: -15000,
    type: 'expense',
    category: 'traffic',
    date: '2025-12-15',
  },
  {
    id: 204,
    title: '신한할인캐쉬백',
    sub: '금융수입',
    amount: 3000,
    type: 'income',
    category: 'transfer',
    date: '2025-12-10',
  },
  {
    id: 205,
    title: '신한할인캐쉬백',
    sub: '금융수입 | 쏠편한 입출금통장',
    amount: 3000,
    type: 'income',
    category: 'transfer',
    date: '2025-12-10',
  },

  // --- 2025년 11월 (지지난달) ---
  {
    id: 301,
    title: '유니클로',
    sub: '쇼핑 | 의류',
    amount: -89000,
    type: 'expense',
    category: 'shopping',
    date: '2025-11-15',
  },
  {
    id: 302,
    title: '지하철 정기권',
    sub: '교통 | 신용카드',
    amount: -55000,
    type: 'expense',
    category: 'traffic',
    date: '2025-11-15',
  },
  {
    id: 305,
    title: '올리브영 사당',
    sub: '쇼핑 | 화장품',
    amount: -30000,
    type: 'expense',
    category: 'shopping',
    date: '2025-11-02',
  },
  {
    id: 303,
    title: '김*주',
    sub: '내계좌이체 | KB국민ONE통장',
    amount: -30000,
    type: 'expense',
    category: 'transfer',
    date: '2025-11-01',
  },
  {
    id: 304,
    title: '신한할인캐쉬백',
    sub: '금융수입 | 쏠편한 입출금통장',
    amount: 3000,
    type: 'income',
    category: 'transfer',
    date: '2025-11-01',
  },
];

export const useGetAssetAnalysis = (selectedDate: Date = new Date()) => {
  const { accountInfo } = useGetAccountDetail();
  const accountDisplay = accountInfo?.accountNumber || '국민은행 592802-04-170725';

  const filteredData = useMemo(() => {
    const targetYear = selectedDate.getFullYear();
    const targetMonth = selectedDate.getMonth();

    return rawData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === targetYear && itemDate.getMonth() === targetMonth;
    });
  }, [selectedDate]); // ✅ rawData는 외부에 있으므로 selectedDate만 의존성 배열에 넣으면 됩니다.

  const mockTransactions = useMemo((): TransactionWithDetails[] => {
    return filteredData.map((item) => {
      const simpleType = item.sub.includes('|') ? item.sub.split('|')[1].trim() : item.sub;
      return {
        ...item,
        displayDetails: [
          { label: '거래시간', value: `${item.date.replace(/-/g, '.')} 18:44:44` },
          { label: '거래구분', value: simpleType },
          { label: '거래금액', value: `${Math.abs(item.amount).toLocaleString()}원`, isBold: true },
          { label: '입금계좌', value: accountDisplay },
        ],
      };
    });
  }, [filteredData, accountDisplay]);

  const totalExpense = useMemo(
    () =>
      mockTransactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + Math.abs(item.amount), 0),
    [mockTransactions]
  );

  const allSectors = useMemo(
    () => transformToCategoryGroups(mockTransactions, totalExpense),
    [mockTransactions, totalExpense]
  );

  return {
    totalExpense,
    transactions: mockTransactions,
    allSectors,
    topSectors: allSectors.slice(0, 6),
    otherSectors: allSectors.slice(6),
    otherCount: Math.max(0, allSectors.length - 6),
    otherTotalAmount: allSectors.slice(6).reduce((sum, s) => sum + s.amount, 0),
    topTotalAmount: allSectors.slice(0, 6).reduce((sum, s) => sum + s.amount, 0),
  };
};
