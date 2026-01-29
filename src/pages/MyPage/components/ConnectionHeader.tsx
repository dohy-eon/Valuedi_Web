import { Typography } from '@/components/typography';
import { BANKS } from '@/features/bank/constants/banks';

interface ConnectionHeaderProps {
  bankName: string;
}

export const ConnectionHeader = ({ bankName }: ConnectionHeaderProps) => {
  /**
   * 💡 상단 헤더 브랜드 로고 및 컬러 추출 로직
   */
  const getBankDetail = (label: string) => {
    const bank = BANKS.find((b) => label.includes(b.name.replace('은행', '').replace('카드', '')));

    const colorMapping: Record<string, string> = {
      국민은행: 'kb',
      KB국민카드: 'kb',
      기업은행: 'ibk',
      IBK기업은행: 'ibk',
      신한은행: 'kbank',
      농협은행: 'nh',
      우리은행: 'kbank',
      수협은행: 'suhyup',
      하나카드: 'hana',
    };

    const colorId = colorMapping[label] || bank?.id;

    return {
      icon: bank?.icon,
      bgColor: colorId ? `var(--color-bank-${colorId})` : 'var(--color-neutral-5)',
    };
  };

  const { icon, bgColor } = getBankDetail(bankName);

  return (
    <header className="mb-10 px-5 pt-6">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-neutral-10 shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        <img src={icon} alt={bankName} className="w-6 h-6 object-contain" />
      </div>

      <Typography variant="headline-1" weight="semi-bold" className="text-neutral-90 text-[var(--font-size-7)]">
        {bankName}
      </Typography>

      <Typography variant="caption-1" className="text-neutral-70 mt-1">
        2026년 01월 14일
      </Typography>
    </header>
  );
};
