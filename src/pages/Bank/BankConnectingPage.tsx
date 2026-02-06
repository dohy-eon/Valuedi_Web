import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BankGNB from '@/components/bank/BankGNB';
import { Typography } from '@/components/typography';
import { createConnectionApi, ApiError } from '@/features/connection/connection.api';
import { getBankOrganizationCode } from '@/features/connection/constants/organizationCodes';

const BankConnectingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const bankId = searchParams.get('bank');
  const userName = '김휘주'; // TODO: 실제 사용자 이름으로 변경

  const loginId = (location.state as { loginId?: string })?.loginId || '';
  const loginPassword = (location.state as { loginPassword?: string })?.loginPassword || '';

  const [hasCalledApi, setHasCalledApi] = useState(false);

  const connectionMutation = useMutation({
    mutationFn: () => {
      if (!bankId || !loginId || !loginPassword) {
        throw new Error('필수 정보가 누락되었습니다.');
      }

      // bankId를 기관 코드로 변환
      const organizationCode = getBankOrganizationCode(bankId);
      if (!organizationCode) {
        throw new Error('지원하지 않는 은행입니다.');
      }

      return createConnectionApi({
        organization: organizationCode,
        businessType: 'BK',
        loginId,
        loginPassword,
      });
    },
    onSuccess: () => {
      // 연결 성공 시 연결 완료 페이지로 이동
      navigate(`/bank/connected?bank=${bankId}`, { replace: true });
    },
    onError: (error: ApiError | Error) => {
      console.error('은행 연결 실패:', error);

      let errorMessage = '은행 연결에 실패했습니다.';
      if (error instanceof ApiError) {
        errorMessage = error.message || errorMessage;
        if (error.code === 'CODEF400_1') {
          errorMessage = '잘못된 비밀번호이거나 인증 정보가 올바르지 않습니다.';
        }
      }

      alert(errorMessage);
      navigate(-1); // 이전 페이지로 돌아가기
    },
  });

  useEffect(() => {
    // API 호출은 한 번만 실행
    if (!hasCalledApi && bankId && loginId && loginPassword) {
      setHasCalledApi(true);
      connectionMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankId, loginId, loginPassword, hasCalledApi]);

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
