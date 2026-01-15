import { TransactionItem, TransactionGroup } from '@/features/asset/constants/account';
import { SectorData } from './SectorListItem';

/**
 * 💡 1. 기초 상세 항목 타입 (모달용)
 */
export interface TransactionDetail {
  label: string;
  value: string;
  isBold?: boolean;
}

/**
 * 💡 2. 완성형 거래 내역 타입
 * 기존 TransactionItem에 날짜(date)와 모달용 상세정보(displayDetails)를 합침
 */
export type TransactionWithDetails = TransactionItem & {
  date: string;
  displayDetails?: TransactionDetail[];
};

/**
 * 💡 3. 유틸리티 전용 그룹 타입
 * TransactionGroup의 items를 우리가 만든 TransactionWithDetails로 교체
 */
export interface SectorTransactionGroup extends Omit<TransactionGroup, 'items'> {
  items: TransactionWithDetails[];
}

/**
 * 1. 카테고리별 그룹화 (메인/전체리스트용)
 */
export const transformToCategoryGroups = (
  transactions: TransactionWithDetails[],
  totalExpense: number
): SectorData[] => {
  const sectorMap = transactions.reduce<Record<string, SectorData>>((acc, item) => {
    const cat = item.category || 'default';

    if (!acc[cat]) {
      acc[cat] = {
        key: cat,
        amount: 0,
        percentage: 0,
        category: cat,
        items: [],
      };
    }

    if (item.type === 'expense') {
      acc[cat].amount += Math.abs(item.amount);
    }

    // 💡 이제 any 없이 안전하게 push 가능!
    acc[cat].items?.push(item);
    return acc;
  }, {});

  return Object.values(sectorMap)
    .map((sector) => ({
      ...sector,
      percentage: totalExpense > 0 ? Math.round((sector.amount / totalExpense) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

/**
 * 2. 날짜별 그룹화 (상세 페이지용)
 */
export const transformToDateGroups = (items: TransactionWithDetails[]): SectorTransactionGroup[] => {
  return items.reduce<SectorTransactionGroup[]>((acc, item) => {
    const dateStr = item.date || '날짜 정보 없음';
    let group = acc.find((g) => g.date === dateStr);

    if (!group) {
      group = { date: dateStr, dailyTotal: 0, items: [] };
      acc.push(group);
    }

    // 💡 items가 TransactionWithDetails[] 타입이므로 any 없이 push!
    group.items.push(item);

    if (item.type === 'expense') {
      group.dailyTotal += Math.abs(item.amount);
    }

    return acc;
  }, []);
};
