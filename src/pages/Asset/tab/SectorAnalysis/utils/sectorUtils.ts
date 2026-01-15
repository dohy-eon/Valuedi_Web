import { TransactionItem, TransactionGroup } from '@/features/asset/constants/account';
import { SectorData } from '../components/SectorListItem';

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
 */
export interface SectorTransactionGroup extends Omit<TransactionGroup, 'items'> {
  items: TransactionWithDetails[];
}

/**
 * 💡 4. 카테고리별 그룹화 (가로형 막대 차트 및 메인 리스트용)
 */
export const transformToCategoryGroups = (
  transactions: TransactionWithDetails[],
  totalExpense: number
): SectorData[] => {
  // 카테고리별로 금액 합산
  const sectorMap = transactions.reduce<Record<string, SectorData>>((acc, item) => {
    // 지출(expense) 데이터만 합산 로직에 포함
    if (item.type !== 'expense') return acc;

    const cat = item.category || 'others'; // 카테고리 없으면 '그외'로 분류 ㅋ

    if (!acc[cat]) {
      acc[cat] = {
        key: cat,
        amount: 0,
        percentage: 0,
        category: cat,
        items: [],
      };
    }

    acc[cat].amount += Math.abs(item.amount);
    acc[cat].items?.push(item);

    return acc;
  }, {});

  // 최종 배열 변환 및 비율(percentage) 계산
  return (
    Object.values(sectorMap)
      .map((sector) => ({
        ...sector,
        // 💡 가로 막대 차트의 정밀한 너비를 위해 소수점까지 유지 (Math.round 제외)
        percentage: totalExpense > 0 ? (sector.amount / totalExpense) * 100 : 0,
      }))
      // 금액이 큰 순서대로 정렬 (차트와 리스트가 시각적으로 안정감 있게 보임 ㅋ)
      .sort((a, b) => b.amount - a.amount)
  );
};

/**
 * 💡 5. 날짜별 그룹화 (상세 페이지용)
 */
export const transformToDateGroups = (items: TransactionWithDetails[]): SectorTransactionGroup[] => {
  return items.reduce<SectorTransactionGroup[]>((acc, item) => {
    const dateStr = item.date || '날짜 정보 없음';
    let group = acc.find((g) => g.date === dateStr);

    if (!group) {
      group = { date: dateStr, dailyTotal: 0, items: [] };
      acc.push(group);
    }

    group.items.push(item);

    if (item.type === 'expense') {
      group.dailyTotal += Math.abs(item.amount);
    }

    return acc;
  }, []);
};

export type { SectorData };
