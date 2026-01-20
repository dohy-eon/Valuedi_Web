import { cn } from '@/utils/cn';
import { Typography } from '@/components/typography';
import { getColorToken } from '@/styles/design-system';
import { BANNER } from '@/features/recommend/constants/banner';

interface RecommendBannerCardProps {
  title: string;
  subTitle: string;
  bankId: string;
  onClick?: () => void;
}

export const RecommendBannerCard = ({ title, subTitle, bankId, onClick }: RecommendBannerCardProps) => {
  const targetBank = BANNER.find((bank) => bank.id === bankId);
  const backgroundColor = targetBank ? getColorToken(targetBank.color) : getColorToken('neutral-10');

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: `rgb(from ${backgroundColor} r g b / 1)` }}
      className={cn(
        'w-[221px] h-[140px] rounded-[12px] px-[12px] py-[16px] flex flex-col gap-[2px] justify-between shrink-0'
      )}
    >
      <div>
        <Typography style="text-body-1-16-semi-bold" className="text-neutral-90">
          {title}
        </Typography>
        <Typography style="text-body-3-13-regular" className="text-neutral-70">
          {subTitle}
        </Typography>
      </div>

      <div className="self-end">
        <div className="w-[32px] h-[32px] flex items-center justify-center">
          {targetBank && <img src={targetBank.icon} alt={targetBank.name} className="w-full h-full object-contain" />}
        </div>
      </div>
    </div>
  );
};
