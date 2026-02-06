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

  // 연결된 은행 목록 조회 (캐시 무효화 후 즉시 새로고침)
  const { data: connectionsData, isLoading, refetch } = useQuery({
    queryKey: ['connections'],
    queryFn: () => getConnectionsApi(),
    staleTime: 0, // 항상 최신 데이터 가져오기
    cacheTime: 0, // 캐시 사용 안 함
  });

  // 페이지 진입 시 데이터 새로고침
  useEffect(() => {
    refetch();
  }, [refetch]);

  // 디버깅: API 응답 확인
  useEffect(() => {
    if (connectionsData) {
      console.log('연결 목록 API 응답:', connectionsData);
      console.log('연결 목록 result:', connectionsData.result);
    }
  }, [connectionsData]);

  // 연결된 은행만 필터링 (type이 'BK'인 것만)
  const connectedBanks =
    connectionsData?.result
      ?.filter((conn) => {
        console.log('연결 항목:', conn, 'type:', conn.type, 'organization:', conn.organization);
        return conn.type === 'BK';
      })
      .map((conn) => {
        // organization 코드를 bankId로 변환하여 은행 정보 찾기
        const bankId = getBankIdFromOrganizationCode(conn.organization);
        console.log('기관 코드:', conn.organization, '-> bankId:', bankId);
        const bank = bankId ? BANKS.find((b) => b.id === bankId) : null;
        console.log('찾은 은행:', bank);
        return bank
          ? { name: bank.name, icon: bank.icon }
          : { name: conn.organization, icon: undefined };
      }) || [];
  
  // 디버깅: 최종 결과 확인
  useEffect(() => {
    console.log('연결된 은행 목록:', connectedBanks);
  }, [connectedBanks]);

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
