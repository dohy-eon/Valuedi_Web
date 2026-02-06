import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BankGNB from '@/components/bank/BankGNB';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import ConnectedBankItem from '@/components/bank/ConnectedBankItem';
import { getConnectionsApi } from '@/features/connection/connection.api';
import { BANKS } from '@/features/bank/constants/banks';
import { getBankIdFromOrganizationCode } from '@/features/connection/constants/organizationCodes';

const BankConnectedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const connectedBankId = searchParams.get('bank');

  // 연결된 은행 목록 조회
  const { data: connectionsData, isLoading } = useQuery({
    queryKey: ['connections'],
    queryFn: () => getConnectionsApi(),
  });

  // 연결된 은행만 필터링 (type이 'BK'인 것만)
  const connectedBanks =
    connectionsData?.result
      ?.filter((conn) => conn.type === 'BK')
      .map((conn) => {
        // organization 코드를 bankId로 변환하여 은행 정보 찾기
        const bankId = getBankIdFromOrganizationCode(conn.organization);
        const bank = bankId ? BANKS.find((b) => b.id === bankId) : null;
        return bank
          ? { name: bank.name, icon: bank.icon }
          : { name: conn.organization, icon: undefined };
      }) || [];

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
        {isLoading ? (
          <Typography variant="body-2" className="text-neutral-60">
            로딩 중...
          </Typography>
        ) : connectedBanks.length > 0 ? (
          connectedBanks.map((bank) => (
            <ConnectedBankItem key={bank.name} bankName={bank.name} bankIcon={bank.icon} />
          ))
        ) : (
          <Typography variant="body-2" className="text-neutral-60">
            연결된 은행이 없습니다.
          </Typography>
        )}
      </div>

      {/* Button */}
      <div className="absolute bottom-[41px] left-1/2 transform -translate-x-1/2 w-[320px]">
        <BaseButton variant="primary" size="medium" text="다음으로" fullWidth onClick={handleNext} />
      </div>
    </MobileLayout>
  );
};

export default BankConnectedPage;
