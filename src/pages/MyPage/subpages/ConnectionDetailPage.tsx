import { useLocation, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { cn } from '@/utils/cn';

// 분리한 컴포넌트들 불러오기
import { ConnectionHeader } from '@/pages/MyPage/components/ConnectionHeader';
import { ConnectionList } from '@/pages/MyPage/components/ConnectionList';
import { ConnectedGoalsSection } from '@/pages/MyPage/components/ConnectedGoalsSection';
import { ConnectionFooter } from '@/pages/MyPage/components/ConnectionFooter';

export const ConnectionDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달받은 은행/카드 이름 (기본값: 국민은행)
  const bankName = location.state?.bankName || '국민은행';
  const isCard = bankName.includes('카드');

  /**
   * 💡 삭제 버튼 클릭 시 실행될 함수
   * 상세 페이지에서는 직접 지우지 않고, 목록 페이지로 삭제 정보를 실어서 보냅니다.
   */
  const handleDelete = () => {
    navigate('/mypage/connection', {
      state: {
        deletedBankName: bankName, // 삭제할 항목의 이름
        shouldShowToast: true, // 토스트를 띄우라는 명령
      },
    });
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
