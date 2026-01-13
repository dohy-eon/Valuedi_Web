import { cn } from '@/utils/cn';
import { Typography } from '@/components/typography';
import { formatCurrency } from '@/utils/formatCurrency';
import kbIcon from '@/assets/icons/bank/kb.svg';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useNavigate } from 'react-router-dom';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { AssetItemList } from './components/AssetItemList';
import { AssetDailyHeader } from './components/AssetDailyHeader';

export const AssetAccountDetailPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const accountInfo = {
    bankName: 'KB국민ONE은행',
    accountNumber: '국민은행 | 592802-04-170725',
    balance: 526387,
    bgColor: '#FFF4D9',
    themeColor: '#FFCC00',
  };

  const BankIcon = ({ bgColor }: { bgColor: string }) => (
    <div
      className={cn('w-[32px] h-[32px] rounded-[8px] flex items-center justify-center')}
      style={{ backgroundColor: bgColor, opacity: 0.65 }}
    >
      <img
        src={kbIcon}
        alt="은행 아이콘"
        className="w-[22px] h-[22px] object-contain shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]"
      />
    </div>
  );

  const transactionHistory = [
    {
      date: '19일 오늘',
      dailyTotal: -45500,
      items: [
        {
          id: 1,
          title: '스타벅스 사당점',
          sub: '식비 | 체크카드',
          amount: -4500,
          type: 'expense',
          category: 'food',
        },
        {
          id: 2,
          title: '카카오T_택시',
          sub: '교통 | 카카오뱅크 카드',
          amount: -12000,
          type: 'expense',
          category: 'traffic',
        },
        {
          id: 3,
          title: '올리브영 사당',
          sub: '쇼핑 | 화장품',
          amount: -25000,
          type: 'expense',
          category: 'shopping',
        },
        {
          id: 4,
          title: 'GS25 편의점',
          sub: '식비 | 간식 구매',
          amount: -4000,
          type: 'expense',
          category: 'food',
        },
      ],
    },
    {
      date: '18일 어제',
      dailyTotal: 2457000,
      items: [
        {
          id: 6,
          title: '급여 입금',
          sub: '수입 | (주)밸류디컴퍼니',
          amount: 2500000,
          type: 'income',
          category: 'default',
        },
        {
          id: 7,
          title: '쿠팡 로켓배송',
          sub: '쇼핑 | 생필품 구매',
          amount: -28000,
          type: 'expense',
          category: 'shopping',
        },
        {
          id: 8,
          title: 'CGV 사당',
          sub: '여가/문화 | 영화 예매',
          amount: -15000,
          type: 'expense',
          category: 'leisure',
        },
      ],
    },
    {
      date: '17일 금요일',
      dailyTotal: -60550,
      items: [
        {
          id: 10,
          title: '김*주',
          sub: '내계좌이체 | KB국민ONE통장',
          amount: -50000,
          type: 'expense',
          category: 'transfer',
        },
        {
          id: 11,
          title: '멜론 정기결제',
          sub: '여가/문화 | 스트리밍',
          amount: -10900,
          type: 'expense',
          category: 'leisure',
        },
        {
          id: 12,
          title: '이자입금',
          sub: '금융수입 | 쏠편한 입출금통장(저축예금)',
          amount: 350,
          type: 'income',
          category: 'default',
        },
      ],
    },
  ];

  return (
    <MobileLayout className={cn('bg-neutral-0')}>
      <div className={cn('flex flex-col h-full bg-neutral-0')}>
        <div className={cn('sticky top-0 z-10 w-full')}>
          <BackPageGNB
            className={cn('bg-neutral-0')}
            text=""
            titleColor="text-neutral-90"
            title={accountInfo.bankName}
            onBack={handleBack}
          />
        </div>

        <div
          className={cn('flex flex-col p-[20px] w-full h-[134px] gap-[12px]')}
          style={{ backgroundColor: accountInfo.bgColor }}
        >
          <BankIcon bgColor={accountInfo.bgColor} />

          <div className={cn('flex flex-col gap-[4px]')}>
            <Typography style="text-caption-1-12-regular" className={cn('text-neutral-70')}>
              {accountInfo.accountNumber}
            </Typography>
            <Typography style="text-headline-1-22-bold" className={cn('text-neutral-90')}>
              {formatCurrency(accountInfo.balance)}
            </Typography>
          </div>
        </div>

        <div className={cn('flex-1 flex flex-col px-[20px] gap-[12px] mt-[20px]')}>
          <Typography style="text-body-2-14-semi-bold" className={cn('text-neutral-90')}>
            총 {transactionHistory.reduce((acc, group) => acc + group.items.length, 0)}건
          </Typography>

          <div className={cn('flex flex-col gap-[12px]')}>
            {transactionHistory.map((group, groupIndex) => (
              <div key={groupIndex} className={cn('flex flex-col')}>
                <AssetDailyHeader date={group.date} dailyTotal={group.dailyTotal} />

                <div className={cn('flex flex-col gap-[8px]')}>
                  {group.items.map((item) => (
                    <AssetItemList
                      key={item.id}
                      title={item.title}
                      subTitle={item.sub}
                      amount={item.amount}
                      type={item.type as 'income' | 'expense'}
                      category={item.category}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
