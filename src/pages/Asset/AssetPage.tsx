import { MobileLayout } from '@/components/layout/MobileLayout';
import { HomeGNB } from '@/components/gnb/HomeGNB';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import { useNavigate, useLocation, Outlet } from 'react-router-dom'; // 💡 Outlet 추가
import { Typography } from '@/components';
import { cn } from '@/utils/cn';

export const AssetPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // 💡 현재 주소를 가져옵니다.

  const activeTab = pathname.includes('/sector') ? 'sector' : pathname.includes('/compare') ? 'compare' : 'details';

  const handleTabClick = (tab: 'details' | 'sector' | 'compare') => {
    if (tab === 'details') navigate('/asset');
    else navigate(`/asset/${tab}`);
  };

  const handleNavClick = (item: 'home' | 'asset' | 'recommend' | 'goal') => {
    navigate(`/${item}`);
  };

  return (
    <MobileLayout className="bg-neutral-0">
      <div className="sticky top-0 z-10 w-full">
        <HomeGNB />
      </div>

      <div className="flex w-full px-[20px] border-b border-neutral-30 z-20">
        {/* 💡 1. 자산 내역 탭: 클릭 시 /asset 으로 이동 */}
        <button
          onClick={() => navigate('/asset')}
          className={cn('flex-1 px-[12px] py-[6px]', activeTab === 'details' && 'border-b border-neutral-90')}
        >
          <Typography
            style="text-body-2-14-medium"
            className={activeTab === 'details' ? 'text-neutral-90' : 'text-neutral-70'}
          >
            자산 내역
          </Typography>
        </button>

        {/* 💡 2. 분야별 내역 탭: 클릭 시 /asset/sector 로 이동 */}
        <button
          onClick={() => navigate('/asset/sector')}
          className={cn('flex-1 px-[12px] py-[6px]', activeTab === 'sector' && 'border-b border-neutral-90')}
        >
          <Typography
            style="text-body-2-14-medium"
            className={activeTab === 'sector' ? 'text-neutral-90' : 'text-neutral-70'}
          >
            분야별 내역
          </Typography>
        </button>

        {/* 💡 3. 비교 내역 탭 (주소 연결 예시) */}
        <button
          onClick={() => navigate('/asset/compare')}
          className={cn('flex-1 px-[12px] py-[6px]', activeTab === 'compare' && 'border-b border-neutral-90')}
        >
          <Typography
            style="text-body-2-14-medium"
            className={activeTab === 'compare' ? 'text-neutral-90' : 'text-neutral-70'}
          >
            비교 내역
          </Typography>
        </button>
      </div>

      {/* 💡 핵심! Outlet이 있어야 라우터에 설정한 자식 컴포넌트(AssetDetails 등)가 여기에 나타납니다. */}
      <div className="flex-1 pb-[80px] overflow-y-auto">
        <Outlet />
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[360px]">
        <BottomNavigation activeItem="asset" onItemClick={handleNavClick} />
      </div>
    </MobileLayout>
  );
};

export default AssetPage;
