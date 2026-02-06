import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BankGNB from '@/components/bank/BankGNB';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import ConnectedBankItem from '@/components/bank/ConnectedBankItem';
import kbIcon from '@/assets/icons/bank/kb.svg';
import suhyupIcon from '@/assets/icons/bank/suhyup.svg';
import saemaulIcon from '@/assets/icons/bank/saemaul.svg';
import ibkIcon from '@/assets/icons/bank/ibk.svg';

const BankConnectedPage = () => {
  const navigate = useNavigate();

  // TODO: 실제 연결된 은행 목록으로 변경
  const connectedBanks = [
    { name: '국민은행', icon: kbIcon },
    { name: '수협은행', icon: suhyupIcon },
    { name: '새마을금고', icon: saemaulIcon },
    { name: '산업은행', icon: ibkIcon },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    // 카드 연결 페이지로 이동
    navigate('/card/start');
  };

  return (
    <MobileLayout>
      <div className="w-full bg-white">
        <BankGNB onBack={handleBack} />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center justify-center w-[320px] mx-auto mt-[20px]">
        <div className="flex items-center w-full">
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90 tracking-[-0.36px] flex-1">
            연결을 완료했어요
          </Typography>
        </div>
      </div>

      {/* Connected Banks List */}
      <div className="flex flex-col items-start w-[320px] mx-auto mt-[80px]">
        {connectedBanks.map((bank) => (
          <ConnectedBankItem key={bank.name} bankName={bank.name} bankIcon={bank.icon} />
        ))}
      </div>

      {/* Button */}
      <div className="absolute bottom-[41px] left-1/2 transform -translate-x-1/2 w-[320px]">
        <BaseButton variant="primary" size="medium" text="다음으로" fullWidth onClick={handleNext} />
      </div>
    </MobileLayout>
  );
};

export default BankConnectedPage;
