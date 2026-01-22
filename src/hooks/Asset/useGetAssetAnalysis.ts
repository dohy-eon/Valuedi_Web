import { useState, useEffect, useMemo } from 'react';
import { transformToCategoryGroups, TransactionWithDetails } from '@/pages/Asset/tab/SectorAnalysis/utils/sectorUtils';
import { useGetAccountDetail } from '@/hooks/Asset/useGetAccountDetail';
import { ASSET_ANALYSIS_RAW_DATA } from '@/features/asset/constants/mockData'; // 💡 데이터 소스 임포트

export const useGetAssetAnalysis = (selectedDate: Date = new Date()) => {
  const { accountInfo } = useGetAccountDetail();
  const accountDisplay = accountInfo?.accountNumber || '국민은행 592802-04-170725';

  // 💡 1. 로딩 상태 관리 (스켈레톤 제어용)
  const [isLoading, setIsLoading] = useState(true);

  // 💡 2. 날짜 변경 시 0.8초 동안 로딩 상태 유지
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedDate]);

  // 💡 3. 선택된 연/월에 맞는 데이터 필터링
  const filteredData = useMemo(() => {
    const targetYear = selectedDate.getFullYear();
    const targetMonth = selectedDate.getMonth();

    return ASSET_ANALYSIS_RAW_DATA.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === targetYear && 
        itemDate.getMonth() === targetMonth
      );
    });
  }, [selectedDate]);

  // 💡 4. 상세 정보를 포함한 트랜잭션 데이터 가공
  const mockTransactions = useMemo((): TransactionWithDetails[] => {
    // 임시 시작 잔액
    let tempBalance = 5230450;
    return filteredData.map((item) => {
      const simpleType = item.sub.includes('|') ? item.sub.split('|')[1].trim() : item.sub;
      const currentBalance = tempBalance;
      tempBalance -= item.amount; // 다음 아이템을 위해 역산 (리스트가 최신순일 경우)
      
      return {
        ...item,
        displayDetails: [
          { label: '거래시간', value: `${item.date.replace(/-/g, '.')} 18:44:44` },
          { label: '거래구분', value: simpleType },
          { label: '거래금액', value: `${Math.abs(item.amount).toLocaleString()}원`, isBold: true },
          { label: '거래 후 잔액', value: `${currentBalance.toLocaleString()}원` },
          { label: '입금계좌', value: accountDisplay },
        ],
      };
    });
  }, [filteredData, accountDisplay]);

  // 💡 5. 총 지출액 계산
  const totalExpense = useMemo(
    () =>
      mockTransactions
        .filter((item) => item.type === 'expense')
        .reduce((sum, item) => sum + Math.abs(item.amount), 0),
    [mockTransactions]
  );

  // 💡 6. 카테고리별 그룹화 데이터 생성
  const allSectors = useMemo(
    () => transformToCategoryGroups(mockTransactions, totalExpense),
    [mockTransactions, totalExpense]
  );

  return {
    isLoading, // 💡 부모에게 로딩 상태 전달
    totalExpense,
    transactions: mockTransactions,
    allSectors,
    topSectors: allSectors.slice(0, 6),
    otherSectors: allSectors.slice(6),
    otherCount: Math.max(0, allSectors.length - 6),
    otherTotalAmount: allSectors.slice(6).reduce((sum, s) => sum + s.amount, 0),
  };
};