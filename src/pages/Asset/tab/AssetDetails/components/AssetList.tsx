import { cn } from '@/utils/cn';
import { Typography } from '@/components/typography';
import { formatCurrency } from '@/utils/formatCurrency';
import kbIcon from '@/assets/icons/bank/kb.svg';
import BankPlusIcon from '@/assets/icons/asset/BankPlus.svg';
import CardPlusIcon from '@/assets/icons/asset/CardPlus.svg';
import { MoreViewButton } from '@/components/buttons';
import { useNavigate } from 'react-router-dom';

const BankIcon = ({ bgColor }: { bgColor: string }) => (
  <div
    className={cn('w-[32px] h-[32px] rounded-[8px] flex items-center justify-center')}
    style={{ backgroundColor: bgColor, opacity: 0.65 }}
  >
    <img src={kbIcon} alt="은행 아이콘" className="w-[22px] h-[22px] object-contain" />
  </div>
);

const CardIcon = ({ bgColor }: { bgColor: string }) => (
  <div
    className={cn('w-[32px] h-[40px] rounded-[8px] flex items-center justify-center')}
    style={{ backgroundColor: bgColor, opacity: 0.65 }}
  >
    <img src={kbIcon} alt="카드 아이콘" className="w-[22px] h-[22px] object-contain" />
  </div>
);

export const AssetList = () => {
  const navigate = useNavigate();

  const bankAccounts = [
    { id: 1, name: 'KB국민ONE통장', amount: 11125023, bankName: 'KB국민은행', iconBg: '#f1e2c0' },
    { id: 2, name: 'KB국민ONE통장', amount: 11125023, bankName: '신한은행', iconBg: '#c0e8f1' },
    { id: 3, name: 'KB국민ONE통장', amount: 11125023, bankName: 'NH농협은행', iconBg: '#c0c9f1' },
    { id: 4, name: 'KB국민ONE통장', amount: 11125023, bankName: '밸류디은행', iconBg: '#c0d8f1' },
    { id: 5, name: 'KB국민ONE통장', amount: 11125023, bankName: '은행나무은행', iconBg: '#c0d8f1' },
  ];

  const cardAccounts = [
    { id: 1, name: 'KB국민ONE카드', amount: 11125023, cardName: 'KB국민카드', iconBg: '#f1e2c0' },
    { id: 2, name: 'KB국민ONE카드', amount: 11125023, cardName: '신한카드', iconBg: '#aab6ee' },
    { id: 3, name: 'KB국민ONE카드', amount: 11125023, cardName: '블루카드', iconBg: '#c0e8f1' },
    { id: 4, name: 'KB국민ONE카드', amount: 11125023, cardName: '레드카드', iconBg: '#aab7ee' },
  ];

  const totalAsset = 526387;

  return (
    <div className={cn('flex flex-col gap-[8px] px-[20px] mt-[20px] ')}>
      <div className={cn('rounded-[8px] px-[12px] py-[16px] gap-[2px]')}>
        <div className={cn('flex flex-col gap-[2px]')}>
          <Typography style="text-body-2-14-regular" className="text-neutral-70">
            총 자산
          </Typography>
          <Typography style="text-headline-1-22-bold" className="text-neutral-90">
            {formatCurrency(totalAsset)}
          </Typography>
        </div>
      </div>

      {/* 은행 리스트 */}
      <div className={cn('flex flex-col rounded-[8px] px-[12px] py-[16px] gap-[16px]')}>
        <Typography style="text-body-2-14-regular" className="text-neutral-70">
          연결된 은행
        </Typography>
        <div className={cn('flex flex-col gap-[8px]')}>
          {bankAccounts.slice(0, 4).map((account) => (
            <div key={account.id} className={cn('flex items-center justify-between py-[8px]')}>
              <div className={cn('flex items-center gap-[8px]')}>
                <BankIcon bgColor={account.iconBg} />
                <div className={cn('flex flex-col gap-[2px]')}>
                  <Typography style="text-body-2-14-semi-bold" className="text-neutral-90">
                    {formatCurrency(account.amount)}
                  </Typography>
                  <Typography style="text-caption-1-12-regular" className="text-neutral-70">
                    {account.name}
                  </Typography>
                </div>
              </div>
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                <MoreViewButton onClick={() => navigate(`/asset/account/${account.id}`)} />
              </div>
            </div>
          ))}
        </div>
        <button
          className={cn(
            'w-full border border-neutral-10 rounded-[4px] p-[8px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]'
          )}
        >
          <Typography style="text-body-2-14-regular" className="text-neutral-70 text-center">
            {`은행 ${bankAccounts.length}개 전체보기`}
          </Typography>
        </button>
      </div>

      {/* 카드 리스트 */}
      <div className={cn('flex flex-col rounded-[8px] px-[12px] py-[16px] gap-[16px]')}>
        <Typography style="text-body-2-14-regular" className="text-neutral-70">
          연결된 카드
        </Typography>
        <div className={cn('flex flex-col gap-[8px]')}>
          {cardAccounts.slice(0, 4).map((card) => (
            <div key={card.id} className={cn('flex items-center justify-between py-[8px]')}>
              <div className={cn('flex items-center gap-[8px]')}>
                <CardIcon bgColor={card.iconBg} />
                <div className={cn('flex flex-col gap-[2px]')}>
                  <Typography style="text-body-2-14-semi-bold" className="text-neutral-90">
                    {formatCurrency(card.amount)}
                  </Typography>
                  <Typography style="text-caption-1-12-regular" className="text-neutral-70">
                    {card.name}
                  </Typography>
                </div>
              </div>
              <div className="w-[18px] h-[18px] flex items-center justify-center">
                <MoreViewButton onClick={() => navigate(`/asset/account/${card.id}`)} />
              </div>
            </div>
          ))}
        </div>
        <button
          className={cn(
            'w-full border border-neutral-10 rounded-[4px] p-[8px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]'
          )}
        >
          <Typography style="text-body-2-14-regular" className="text-neutral-70 text-center">
            {`카드 ${cardAccounts.length}개 전체보기`}
          </Typography>
        </button>
      </div>

      <div className={cn('flex items-center justify-between py-[8px]')}>
        <div className={cn('flex items-center gap-[8px]')}>
          <div
            className={cn('w-[32px] h-[32px] rounded-[8px] flex items-center justify-center')}
            style={{ backgroundColor: '#c8d1f5' }}
          >
            <img src={BankPlusIcon} alt="은행 추가" className="w-[20px] h-[20px] object-contain opacity-70" />
          </div>
          <Typography style="text-body-2-14-semi-bold" className="text-neutral-90">
            은행 추가하기
          </Typography>
        </div>
        <MoreViewButton />
      </div>

      <div className={cn('flex items-center justify-between py-[8px]')}>
        <div className={cn('flex items-center gap-[8px]')}>
          <div
            className={cn('w-[32px] h-[32px] rounded-[8px] flex items-center justify-center')}
            style={{ backgroundColor: '#f0eab8' }}
          >
            <img src={CardPlusIcon} alt="카드 추가" className="w-[20px] h-[20px] object-contain opacity-70" />
          </div>
          <Typography style="text-body-2-14-semi-bold" className="text-neutral-90">
            카드 추가하기
          </Typography>
        </div>
        <MoreViewButton />
      </div>
    </div>
  );
};
