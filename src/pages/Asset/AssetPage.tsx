import { MobileLayout } from '@/components/layout/MobileLayout';
import { HomeGNB } from '@/components/gnb/HomeGNB';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import { useNavigate } from 'react-router-dom';

export const AssetPage = () => {
  const navigate = useNavigate();

  const handleNavClick = (item: 'home' | 'asset' | 'recommend' | 'goal') => {
    switch (item) {
      case 'home':
        navigate('/home');
        break;
      case 'asset':
        navigate('/asset');
        break;
      case 'recommend':
        navigate('/recommend');
        break;
      case 'goal':
        navigate('/goal');
        break;
    }
  };

  return (
    <MobileLayout className="bg-neutral-10">
      <div className="sticky top-0 z-10 w-full">
        <HomeGNB />
      </div>
      <div className="flex-1 pb-[64px] overflow-y-auto">
        <div className="flex flex-col items-center justify-center min-h-full p-[20px]">
          <p className="text-neutral-90">자산 페이지</p>
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[360px]">
        <BottomNavigation activeItem="asset" onItemClick={handleNavClick} />
      </div>
    </MobileLayout>
  );
};

export default AssetPage;

