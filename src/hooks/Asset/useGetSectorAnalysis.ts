import { TransactionItem } from '@/features/asset/constants/account';
import { transformToCategoryGroups } from '@/pages/Asset/tab/SectorAnalysis/components/sectorUtils';
import { useGetAccountDetail } from '@/hooks/Asset/useGetAccountDetail'; // 💡 계좌 정보 훅 임포트

export const useGetSectorAnalysis = () => {
  // 계좌 상세 정보 가져오기
  const { accountInfo } = useGetAccountDetail();
  const accountDisplay = accountInfo?.accountNumber || '국민은행 592802-04-170725';

  // 1. 원본 데이터 (이름을 rawData로 바꿔서 중복을 피합니다)
  const rawData: (TransactionItem & { date: string })[] = [
    {
      id: 101,
      title: '신한할인캐쉬백',
      sub: '금융수입 | 쏠편한 입출금통장(저축예금)',
      amount: 3000,
      type: 'income',
      category: 'transfer',
      date: '19일 오늘',
    },
    {
      id: 102,
      title: '김*주',
      sub: '내계좌이체 | KB국민ONE통장',
      amount: -30000,
      type: 'expense',
      category: 'transfer',
      date: '19일 오늘',
    },
    {
      id: 103,
      title: '김*주',
      sub: '내계좌이체 | KB국민ONE통장',
      amount: -30000,
      type: 'expense',
      category: 'transfer',
      date: '18일 어제',
    },
    {
      id: 104,
      title: '신한할인캐쉬백',
      sub: '금융수입 | 쏠편한 입출금통장(저축예금)',
      amount: 3000,
      type: 'income',
      category: 'transfer',
      date: '18일 어제',
    },
    {
      id: 105,
      title: '신한할인캐쉬백',
      sub: '금융수입 | 쏠편한 입출금통장(저축예금)',
      amount: 3000,
      type: 'income',
      category: 'transfer',
      date: '17일 금요일',
    },
    {
      id: 106,
      title: '신한할인캐쉬백',
      sub: '금융수입 | 쏠편한 입출금통장(저축예금)',
      amount: 3000,
      type: 'income',
      category: 'transfer',
      date: '17일 금요일',
    },
    {
      id: 107,
      title: '김*주',
      sub: '내계좌이체 | KB국민ONE통장',
      amount: -30000,
      type: 'expense',
      category: 'transfer',
      date: '17일 금요일',
    },
    {
      id: 201,
      title: '스타벅스 사당점',
      sub: '식비 | 체크카드',
      amount: -4500,
      type: 'expense',
      category: 'food',
      date: '19일 오늘',
    },
    {
      id: 202,
      title: '아웃백 스테이크',
      sub: '식비 | 신용카드',
      amount: -150000,
      type: 'expense',
      category: 'food',
      date: '19일 오늘',
    },
    {
      id: 203,
      title: '맥도날드',
      sub: '식비 | 현금',
      amount: -78500,
      type: 'expense',
      category: 'food',
      date: '18일 어제',
    },
    {
      id: 301,
      title: '카카오T_택시',
      sub: '교통 | 카카오뱅크 카드',
      amount: -15000,
      type: 'expense',
      category: 'traffic',
      date: '19일 오늘',
    },
    {
      id: 302,
      title: '카카오T_택시',
      sub: '교통 | 카카오뱅크 카드',
      amount: -15000,
      type: 'expense',
      category: 'traffic',
      date: '18일 어제',
    },
    {
      id: 303,
      title: '카카오T_택시',
      sub: '교통 | 카카오뱅크 카드',
      amount: -15000,
      type: 'expense',
      category: 'traffic',
      date: '17일 금요일',
    },
    {
      id: 401,
      title: '올리브영 사당',
      sub: '쇼핑 | 화장품',
      amount: -30000,
      type: 'expense',
      category: 'shopping',
      date: '19일 오늘',
    },
    {
      id: 402,
      title: '올리브영 사당',
      sub: '쇼핑 | 화장품',
      amount: -30000,
      type: 'expense',
      category: 'shopping',
      date: '19일 오늘',
    },
    {
      id: 403,
      title: '올리브영 사당',
      sub: '쇼핑 | 화장품',
      amount: -6000,
      type: 'expense',
      category: 'shopping',
      date: '18일 어제',
    },
    {
      id: 404,
      title: '올리브영 사당',
      sub: '쇼핑 | 화장품',
      amount: -6000,
      type: 'expense',
      category: 'shopping',
      date: '17일 금요일',
    },
    {
      id: 405,
      title: '올리브영 사당',
      sub: '쇼핑 | 화장품',
      amount: -6000,
      type: 'expense',
      category: 'shopping',
      date: '17일 금요일',
    },
    {
      id: 501,
      title: 'CGV 사당',
      sub: '여가 | 영화 예매',
      amount: -45000,
      type: 'expense',
      category: 'leisure',
      date: '18일 어제',
    },
    {
      id: 601,
      title: '기타 지출',
      sub: '카테고리 없음',
      amount: -15000,
      type: 'expense',
      category: 'default',
      date: '19일 오늘',
    },
    {
      id: 701,
      title: '한림대병원',
      sub: '의료 | 신용카드',
      amount: -5000,
      type: 'expense',
      category: 'medical',
      date: '19일 오늘',
    },
    {
      id: 702,
      title: '교보문고',
      sub: '도서구입',
      amount: -23000,
      type: 'expense',
      category: 'default',
      date: '18일 어제',
    },
    {
      id: 703,
      title: 'CU',
      sub: '편의점 | 체크카드',
      amount: -2500,
      type: 'expense',
      category: 'market',
      date: '18일 어제',
    },
    {
      id: 704,
      title: 'SKT',
      sub: '통신 | 신용카드',
      amount: -20000,
      type: 'expense',
      category: 'living',
      date: '17일 금요일',
    },
    {
      id: 705,
      title: '메가커피',
      sub: '카페 | 체크카드',
      amount: -8000,
      type: 'expense',
      category: 'cafe',
      date: '17일 금요일',
    },
  ];

  // 2. 상세 정보(displayDetails)가 포함된 최종 데이터 생성
  const mockTransactions = rawData.map((item) => {
    const simpleType = item.sub.includes('|') ? item.sub.split('|')[1].trim() : item.sub;

    return {
      ...item,
      displayDetails: [
        { label: '거래시간', value: '2025.12.03 18:44:44' },
        { label: '거래구분', value: simpleType },
        { label: '거래금액', value: `${Math.abs(item.amount).toLocaleString()}원`, isBold: true },
        { label: '거래 후 잔액', value: '23,000원' }, // 잔액은 일단 킵!
        // 💡 훅에서 가져온 계좌 정보를 여기에 넣어줍니다!
        { label: '입금계좌', value: accountDisplay },
      ],
    };
  });

  // 3. 가공된 데이터를 바탕으로 통계 계산
  const totalExpense = mockTransactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);

  const allSectors = transformToCategoryGroups(mockTransactions, totalExpense);

  const topSectors = allSectors.slice(0, 6); // 상위 6개
  const otherSectors = allSectors.slice(6); // 나머지

  const otherCount = otherSectors.length;
  const otherTotalAmount = otherSectors.reduce((sum, s) => sum + s.amount, 0);
  const topTotalAmount = topSectors.reduce((sum, s) => sum + s.amount, 0);

  // 4. 모든 가공된 데이터 리턴
  return {
    totalExpense,
    transactions: mockTransactions,
    allSectors,
    topSectors,
    otherSectors,
    otherCount,
    otherTotalAmount,
    topTotalAmount,
  };
};
