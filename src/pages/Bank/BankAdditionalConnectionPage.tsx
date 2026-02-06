import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BankGNB from '@/components/bank/BankGNB';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import BankCard from '@/components/bank/BankCard';
import { BANKS } from '@/features/bank/constants/banks';
import { getConnectionsApi } from '@/features/connection/connection.api';
import { getBankIdFromOrganizationCode } from '@/features/connection/constants/organizationCodes';

const BankAdditionalConnectionPage = () => {
  const navigate = useNavigate();

  // 연결된 은행 목록 조회
  const { data: connectionsData } = useQuery({
    queryKey: ['connections'],
    queryFn: () => getConnectionsApi(),
  });

  // 이미 연결된 은행 ID 목록
  const connectedBankIds =
    connectionsData?.result
      ?.filter((conn) => {
        const businessType = conn.businessType || conn.type;
        return businessType === 'BK';
      })
      .map((conn) => {
        const organizationCode = conn.organizationCode || conn.organization;
        return organizationCode ? getBankIdFromOrganizationCode(organizationCode) : null;
      })
      .filter((id): id is string => id !== null) || [];

  // 연결되지 않은 은행만 필터링
  const availableBanks = BANKS.filter((bank) => !connectedBankIds.includes(bank.id));

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddMore = () => {
    // 은행 선택 페이지로 이동
    navigate('/bank/select');
  };

  const handleSkip = () => {
    // 카드 연결 페이지로 이동
    navigate('/card/start');
  };

  // 3개 행으로 고정, 각 행당 5개씩 표시
  const banksPerRow = 5;
  const fixedRows = 3;
  const cardWidth = 71 + 12; // BankCard width + gap

  // 무한 스크롤을 위한 은행 배열 생성 (각 행마다 다른 시작점)
  const createInfiniteBanks = (startIndex: number) => {
    // 무한 순환을 위해 2세트 복제 (원본 + 복제본)
    const banks = [];
    for (let i = 0; i < banksPerRow * 2; i++) {
      const bankIndex = (startIndex + i) % availableBanks.length;
      banks.push(availableBanks[bankIndex]);
    }
    return banks;
  };

  return (
    <MobileLayout>
      <div className="w-full bg-white">
        <BankGNB onBack={handleBack} />
      </div>

      {/* Title */}
      <div className="flex flex-col gap-[12px] items-center justify-center w-[320px] mx-auto mt-[20px]">
        <div className="flex items-center w-full">
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90 tracking-[-0.36px]">
            <p className="mb-0">추가로 연결하고 싶은</p>
            <p>은행이 있나요?</p>
          </Typography>
        </div>
        <Typography variant="body-2" weight="regular" className="text-neutral-70 w-full">
          여러 은행을 연결하면 더 정확한 소비 분석이 가능해요
        </Typography>
      </div>

      {/* Bank Grid - 3개 행, 각 행은 가로 무한 스크롤 애니메이션 */}
      <div className="flex flex-col gap-[12px] px-[20px] py-[20px] mt-[20px] pb-[120px]">
        <style>
          {`
            @keyframes scroll-left {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${cardWidth * banksPerRow}px);
              }
            }
            .infinite-scroll-row {
              animation: scroll-left ${fixedRows * 12}s linear infinite;
            }
            .infinite-scroll-row:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        {Array.from({ length: fixedRows }).map((_, rowIndex) => {
          // 각 행의 시작 인덱스 (행마다 다른 시작점)
          const startIndex = rowIndex * banksPerRow;
          // 무한 스크롤을 위해 2세트 복제
          const rowBanks = createInfiniteBanks(startIndex);
          // 애니메이션 지연 시간 (행마다 다르게)
          const animationDelay = rowIndex * 4; // 총 12초를 3개 행으로 나눔

          return (
            <div key={rowIndex} className="flex gap-[12px] items-center overflow-hidden w-full relative">
              <div
                className="flex gap-[12px] items-center infinite-scroll-row"
                style={{
                  animationDelay: `${animationDelay}s`,
                  width: `${cardWidth * banksPerRow * 2}px`,
                }}
              >
                {/* 무한 스크롤을 위한 복제된 은행 목록 */}
                {rowBanks.map((bank, index) => (
                  <div key={`${bank.id}-${rowIndex}-${index}`} className="flex-shrink-0">
                    <BankCard bankName={bank.name} bankIcon={bank.icon} isSelected={false} onClick={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Skip Button */}
      <div className="absolute bottom-[89px] left-1/2 transform -translate-x-1/2 w-[320px] flex items-center justify-center px-[10px] py-[8px]">
        <button type="button" onClick={handleSkip} className="cursor-pointer">
          <Typography variant="body-2" weight="regular" className="text-neutral-50 text-center whitespace-nowrap">
            나중에 할래요
          </Typography>
        </button>
      </div>

      {/* Add Button */}
      <div className="absolute bottom-[41px] left-1/2 transform -translate-x-1/2 w-[320px]">
        <BaseButton variant="primary" size="medium" text="추가할래요" fullWidth onClick={handleAddMore} />
      </div>
    </MobileLayout>
  );
};

export default BankAdditionalConnectionPage;
