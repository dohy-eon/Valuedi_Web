import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MobileLayout } from '@/components/layout/MobileLayout';
import CardGNB from '@/components/card/CardGNB';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import ConnectedCardItem from '@/components/card/ConnectedCardItem';
import { getConnectionsApi } from '@/features/connection/connection.api';
import { CARDS } from '@/features/card/constants/cards';
import { getCardIdFromOrganizationCode } from '@/features/connection/constants/organizationCodes';

const CardConnectedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const connectedCardId = searchParams.get('card');

  // 연결된 카드 목록 조회 (캐시 무효화 후 즉시 새로고침)
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

  // 연결된 카드만 필터링 (businessType이 'CD'인 것만)
  const connectedCards =
    connectionsData?.result
      ?.filter((conn) => {
        const businessType = conn.businessType || conn.type; // API 응답 필드명 대응
        return businessType === 'CD';
      })
      .map((conn) => {
        // organizationCode를 cardId로 변환하여 카드 정보 찾기
        const organizationCode = conn.organizationCode || conn.organization; // API 응답 필드명 대응
        const cardId = organizationCode ? getCardIdFromOrganizationCode(organizationCode) : null;
        const card = cardId ? CARDS.find((c) => c.id === cardId) : null;
        return card
          ? { name: card.name, icon: card.icon }
          : { name: conn.organizationName || organizationCode || '알 수 없음', icon: undefined };
      }) || [];

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    // 메인 페이지로 이동
    navigate('/home');
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
        {isLoading ? (
          <Typography variant="body-2" className="text-neutral-60">
            로딩 중...
          </Typography>
        ) : connectedCards.length > 0 ? (
          connectedCards.map((card) => (
            <ConnectedCardItem key={card.name} cardName={card.name} cardIcon={card.icon} />
          ))
        ) : (
          <Typography variant="body-2" className="text-neutral-60">
            연결된 카드가 없습니다.
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

export default CardConnectedPage;
