import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import CardGNB from '@/components/card/CardGNB';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import ConnectedCardItem from '@/components/card/ConnectedCardItem';
import kbIcon from '@/assets/icons/bank/kb.svg';
import shinhanIcon from '@/assets/icons/bank/jeju_shinhan.svg';
import wooriIcon from '@/assets/icons/bank/woori.svg';

const CardConnectedPage = () => {
  const navigate = useNavigate();

  // TODO: 실제 연결된 카드 목록으로 변경
  const connectedCards = [
    { name: 'KB국민카드', icon: kbIcon },
    { name: '신한카드', icon: shinhanIcon },
    { name: '우리카드', icon: wooriIcon },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    // 추가 카드 연결 확인 페이지로 이동
    navigate('/card/additional');
  };

  return (
    <MobileLayout>
      <div className="w-full bg-white">
        <CardGNB onBack={handleBack} />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center justify-center w-[320px] mx-auto mt-[20px]">
        <div className="flex items-center w-full">
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90 tracking-[-0.36px] flex-1">
            연결을 완료했어요
          </Typography>
        </div>
      </div>

      {/* Connected Cards List */}
      <div className="flex flex-col items-start w-[320px] mx-auto mt-[80px]">
        {connectedCards.map((card) => (
          <ConnectedCardItem key={card.name} cardName={card.name} cardIcon={card.icon} />
        ))}
      </div>

      {/* Button */}
      <div className="absolute bottom-[41px] left-1/2 transform -translate-x-1/2 w-[320px]">
        <BaseButton variant="primary" size="medium" text="다음으로" fullWidth onClick={handleNext} />
      </div>
    </MobileLayout>
  );
};

export default CardConnectedPage;
