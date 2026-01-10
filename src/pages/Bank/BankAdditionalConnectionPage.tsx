import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BankGNB from '@/components/bank/BankGNB';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';

const BankAdditionalConnectionPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddMore = () => {
    // 은행 선택 페이지로 이동
    navigate('/bank/select');
  };

  const handleSkip = () => {
    // 다음 단계로 이동 (예: 홈으로)
    navigate('/home');
  };

  return (
    <MobileLayout>
      <div className="w-full bg-white">
        <BankGNB onBack={handleBack} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[12px] items-center justify-center w-[320px] mx-auto mt-[20px]">
        <div className="flex items-center w-full">
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90 tracking-[-0.36px] w-[147px]">
            <p className="mb-0">추가로 연결하고 싶은</p>
            <p>은행이 있나요?</p>
          </Typography>
        </div>
        <Typography variant="body-2" weight="regular" className="text-neutral-70 w-full">
          여러 은행을 연결하면 더 정확한 소비 분석이 가능해요
        </Typography>
      </div>

      {/* Placeholder for illustration */}
      <div className="w-[182px] h-[182px] bg-neutral-40 rounded-full mx-auto mt-[125px] mb-auto" />

      {/* Button */}
      <div className="absolute bottom-[41px] left-1/2 transform -translate-x-1/2 w-[320px]">
        <BaseButton variant="primary" size="medium" text="추가할래요" fullWidth onClick={handleAddMore} />
      </div>

      {/* Skip Button */}
      <div className="absolute bottom-[89px] left-1/2 transform -translate-x-1/2 w-[320px] flex items-center justify-center px-[10px] py-[8px]">
        <button type="button" onClick={handleSkip} className="cursor-pointer">
          <Typography variant="body-2" weight="regular" className="text-neutral-50 text-center whitespace-nowrap">
            나중에 할래요
          </Typography>
        </button>
      </div>
    </MobileLayout>
  );
};

export default BankAdditionalConnectionPage;
