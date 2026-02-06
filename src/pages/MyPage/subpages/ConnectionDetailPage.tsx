import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { cn } from '@/utils/cn';
import { getConnectionsApi, deleteConnectionApi, ApiError } from '@/features/connection/connection.api';
import { BANKS } from '@/features/bank/constants/banks';
import { CARDS } from '@/features/card/constants/cards';
import { getBankIdFromOrganizationCode, getCardIdFromOrganizationCode } from '@/features/connection/constants/organizationCodes';

// 분리한 컴포넌트들 불러오기
import { ConnectionHeader } from '@/pages/MyPage/components/ConnectionHeader';
import { ConnectionList } from '@/pages/MyPage/components/ConnectionList';
import { ConnectedGoalsSection } from '@/pages/MyPage/components/ConnectedGoalsSection';
import { ConnectionFooter } from '@/pages/MyPage/components/ConnectionFooter';

export const ConnectionDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // 이전 페이지에서 전달받은 은행/카드 이름 (기본값: 국민은행)
  const bankName = location.state?.bankName || '국민은행';
  const isCard = bankName.includes('카드');

  // 연결 목록 조회
  const { data: connectionsData } = useQuery({
    queryKey: ['connections'],
    queryFn: () => getConnectionsApi(),
  });

  // 현재 은행/카드에 해당하는 connectionId 찾기
  const currentConnection = connectionsData?.result?.find((conn) => {
    const businessType = conn.businessType || conn.type; // API 응답 필드명 대응
    const organizationCode = conn.organizationCode || conn.organization; // API 응답 필드명 대응
    
    if (isCard) {
      const card = CARDS.find((c) => c.name === bankName);
      if (!card) return false;
      // organizationCode를 cardId로 변환하여 비교
      const cardId = organizationCode ? getCardIdFromOrganizationCode(organizationCode) : null;
      return cardId === card.id && businessType === 'CD';
    } else {
      const bank = BANKS.find((b) => b.name === bankName);
      if (!bank) return false;
      // organizationCode를 bankId로 변환하여 비교
      const bankId = organizationCode ? getBankIdFromOrganizationCode(organizationCode) : null;
      return bankId === bank.id && businessType === 'BK';
    }
  });

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: (connectionId: number) => deleteConnectionApi(connectionId),
    onSuccess: () => {
      // 연결 목록 캐시 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['connections'] });

      // 목록 페이지로 이동하면서 토스트 표시
      navigate('/mypage/connection', {
        state: {
          shouldShowToast: true,
        },
      });
    },
    onError: (error: ApiError | Error) => {
      console.error('연동 해제 실패:', error);

      let errorMessage = '연동 해제에 실패했습니다.';
      if (error instanceof ApiError) {
        errorMessage = error.message || errorMessage;
        if (error.code === 'CONNECTION404_1') {
          errorMessage = '해당 연동 정보를 찾을 수 없습니다.';
        }
      }

      alert(errorMessage);
    },
  });

  /**
   * 💡 삭제 버튼 클릭 시 실행될 함수
   */
  const handleDelete = () => {
    if (!currentConnection) {
      alert('연동 정보를 찾을 수 없습니다.');
      return;
    }

    if (window.confirm('정말로 이 연동을 해제하시겠습니까?')) {
      deleteMutation.mutate(currentConnection.connectionId);
    }
  };

  // 💡 데이터 설정: 은행일 때만 샘플 목표를 보여줌
  const connectedGoals = isCard ? [] : [{ id: '1', title: '어쩌구저쩌구목표', subText: 'KB국민ONE통장-저축예금' }];

  return (
    <MobileLayout className={cn('bg-white flex flex-col h-screen overflow-hidden')}>
      {/* 상단 GNB */}
      <BackPageGNB
        title="연결 관리"
        text=""
        className="bg-white text-neutral-90 border-b border-neutral-5"
        onBack={() => navigate(-1)}
      />

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* 1. 상단 브랜드 헤더 */}
        <ConnectionHeader bankName={bankName} />

        {/* 2. 연결된 항목 리스트 */}
        <ConnectionList bankName={bankName} />

        {/* 💡 섹션 구분 회색 바 */}
        <div className="h-2 bg-neutral-10 w-full" />

        {/* 3. 연결된 목표 섹션 */}
        <div className="px-5 py-10">
          <ConnectedGoalsSection goals={connectedGoals} />
        </div>

        {/* 4. 하단 푸터 (삭제 함수 전달) */}
        <ConnectionFooter onDelete={handleDelete} />
      </div>
    </MobileLayout>
  );
};
