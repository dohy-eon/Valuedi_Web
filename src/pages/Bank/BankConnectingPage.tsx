import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BankGNB from '@/components/bank/BankGNB';
import { Typography } from '@/components/typography';

const BankConnectingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bankId = searchParams.get('bank');
  const userName = '김휘주'; // TODO: 실제 사용자 이름으로 변경

  useEffect(() => {
    // 3초 후 연결 완료 페이지로 이동
    const timer = setTimeout(() => {
      if (bankId) {
        navigate(`/bank/connected?bank=${bankId}`);
      } else {
        navigate('/bank/connected');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, bankId]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <MobileLayout>
      <div className="w-full bg-white">
        <BankGNB onBack={handleBack} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[12px] items-center justify-center w-[320px] mx-auto mt-[20px]">
        <div className="flex items-center w-full">
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90 tracking-[-0.36px] flex-1">
            <p className="mb-0">{userName}님의 은행을</p>
            <p>연결 중이에요</p>
          </Typography>
        </div>
        <Typography variant="body-2" weight="regular" className="text-neutral-70 w-full">
          최대 1분정도 걸릴 수 있어요
        </Typography>
      </div>

      {/* Placeholder for loading illustration */}
      <div className="w-[182px] h-[182px] bg-neutral-40 rounded-full mx-auto mt-[125px]" />
    </MobileLayout>
  );
};

export default BankConnectingPage;
