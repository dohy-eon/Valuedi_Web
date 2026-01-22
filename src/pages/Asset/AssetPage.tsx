import { MobileLayout } from '@/components/layout/MobileLayout';
import { HomeGNB } from '@/components/gnb/HomeGNB';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@/components';
import { cn } from '@/utils/cn';

import { AssetDetails } from './tab/AssetDetails/AssetDetailsPage';
import { SectorAnalysis } from './tab/SectorAnalysis/SectorAnalysisPage';
import { CompareAnalysis } from './tab/CompareAnalysis/CompareAnalysisPage';

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
        <button
          onClick={() => handleTabClick('details')}
          className={cn('flex-1 px-[12px] py-[6px] ', activeTab === 'details' && 'border-b border-neutral-90')}
        >
          <Typography
            style="text-body-2-14-medium"
            className={`${activeTab === 'details' ? 'text-neutral-90' : 'text-neutral-70'}`}
            fontFamily="pretendard"
          >
            자산 내역
          </Typography>
        </button>

        <button
          onClick={() => handleTabClick('sector')}
          className={cn('flex-1 px-[12px] py-[6px] ', activeTab === 'sector' && 'border-b border-neutral-90')}
        >
          <Typography
            style="text-body-2-14-medium"
            className={`${activeTab === 'sector' ? 'text-neutral-90' : 'text-neutral-70'}`}
            fontFamily="pretendard"
          >
            분야별 내역
          </Typography>
        </button>

        <button
          onClick={() => handleTabClick('compare')}
          className={cn('flex-1 px-[12px] py-[6px] ', activeTab === 'compare' && 'border-b border-neutral-90')}
        >
          <Typography
            style="text-body-2-14-medium"
            className={`${activeTab === 'compare' ? 'text-neutral-90' : 'text-neutral-70'}`}
            fontFamily="pretendard"
          >
            비교 내역
          </Typography>
        </button>
      </div>

      <div className="flex-1 pb-[80px] overflow-y-auto">
        {activeTab === 'details' && <AssetDetails />}
        {activeTab === 'sector' && <SectorAnalysis />}
        {activeTab === 'compare' && <CompareAnalysis />}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[360px]">
        <BottomNavigation activeItem="asset" onItemClick={handleNavClick} />
      </div>
    </MobileLayout>
  );
};

export default AssetPage;
