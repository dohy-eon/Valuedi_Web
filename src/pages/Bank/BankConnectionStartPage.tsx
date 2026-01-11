import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BankGNB from '@/components/bank/BankGNB';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import BankInfoModal from '@/components/bank/BankInfoModal';

const BankConnectionStartPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const userName = '김휘주'; // TODO: 실제 사용자 이름으로 변경

  const handleBack = () => {
    navigate(-1);
  };

  const handleStart = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    // 다음 페이지로 이동 (은행 선택 페이지)
    navigate('/bank/select');
  };

  return (
    <MobileLayout>
      <div className="w-full bg-white">
        <BankGNB onBack={handleBack} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center w-[320px] mx-auto mt-[20px]">
        <div className="flex items-center w-full">
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90 tracking-[-0.36px]">
            <p className="mb-0">{userName}님의 은행을</p>
            <p>연결할게요</p>
          </Typography>
        </div>
      </div>

      {/* Placeholder for bank illustration */}
      <div className="w-[182px] h-[182px] bg-neutral-40 rounded-full mx-auto mt-[125px] mb-auto" />

      {/* Button */}
      <div className="absolute bottom-[41px] left-1/2 transform -translate-x-1/2 w-[320px]">
        <BaseButton variant="primary" size="medium" text="시작하기" fullWidth onClick={handleStart} />
      </div>

      {/* Info Modal */}
      <BankInfoModal isOpen={showModal} onClose={() => setShowModal(false)} onConfirm={handleModalConfirm} />
    </MobileLayout>
  );
};

export default BankConnectionStartPage;
