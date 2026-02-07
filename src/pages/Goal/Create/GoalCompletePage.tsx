import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import BackPageIcon from '@/assets/icons/BackPage.svg';

const GoalCompletePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleGoToGoals = () => {
    navigate('/goal/current');
  };

  return (
    <MobileLayout className="p-0 overflow-hidden bg-white">
      <div className="flex flex-col w-full min-h-screen">
        <header className="flex items-center w-full h-[50px] px-[20px] bg-white flex-shrink-0">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center justify-center cursor-pointer w-[24px]"
          >
            <img src={BackPageIcon} alt="뒤로가기" />
          </button>
        </header>

        <main className="flex-1 flex flex-col px-[20px] pt-[40px] pb-[32px] overflow-y-auto">
          <div className="flex flex-col gap-[8px] mb-[40px]">
            <Typography style="text-headline-1-22-bold" fontFamily="pretendard" className="text-neutral-90" as="h1">
              목표를 완성했어요
            </Typography>
            <Typography
              style="text-body-1-16-regular"
              fontFamily="pretendard"
              color="neutral-90"
              className="text-neutral-90"
            >
              밸류디와 함께 목표를 달성해보아요
            </Typography>
            <Typography
              style="text-body-1-16-regular"
              fontFamily="pretendard"
              color="neutral-90"
              className="text-neutral-90"
            >
              화이팅!
            </Typography>
          </div>
          <div className="flex-1 flex items-center justify-center mb-[32px]">
            <div className="w-full max-w-[320px] aspect-square bg-neutral-30 rounded-lg" />
          </div>
        </main>

        <footer className="w-full px-[20px] pb-[32px] flex-shrink-0 flex flex-col gap-4">
          <button onClick={handleGoHome} className="text-center text-neutral-60 underline">
            <Typography style="text-body-2-14-regular" fontFamily="pretendard" color="neutral-60">
              홈으로 이동
            </Typography>
          </button>
          <BaseButton
            size="large"
            variant="primary"
            text="나의 목표 페이지로 가기"
            onClick={handleGoToGoals}
            fullWidth
            typographyStyle="text-body-1-16-semi-bold"
            className="bg-primary-normal"
          />
        </footer>
      </div>
    </MobileLayout>
  );
};

export default GoalCompletePage;
