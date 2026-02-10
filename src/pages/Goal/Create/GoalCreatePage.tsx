import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import BackPageIcon from '@/assets/icons/BackPage.svg';
import { GoalSummaryCard } from '@/components/goal/GoalSummaryCard';
import { GOAL_COLOR_NAME_TO_CODE } from '@/features/goal';

const GoalCreatePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartGoal = () => {
    navigate('/goal/create/step');
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
          <div className="flex flex-col gap-[8px] mb-[32px]">
            <Typography style="text-headline-1-22-bold" fontFamily="pretendard" className="text-neutral-90" as="h1">
              나의 목표를 작성 해볼까요?
            </Typography>
            <Typography
              style="text-body-1-16-regular"
              fontFamily="pretendard"
              color="neutral-70"
              className="text-neutral-70"
            >
              저축 목표를 설정하고 어쩌구해요
            </Typography>
          </div>
          <div className="flex-1 flex items-center justify-center mb-[32px]">
            <GoalSummaryCard
              title="나의 목표"
              colorCode={GOAL_COLOR_NAME_TO_CODE.yellow}
              iconId={11} // Saving 아이콘
              targetAmountText="??? 원"
              startDateText="--.--.--"
              endDateText="--.--.--"
              remainingDaysText="?? 일"
              accountText="목표를 설정하면 저축계좌가 표시돼요"
              showDates={false}
              showAccount={false}
            />
          </div>
        </main>

        <footer className="w-full px-[20px] pb-[32px] flex-shrink-0">
          <BaseButton
            size="large"
            variant="primary"
            text="목표 설정하기"
            onClick={handleStartGoal}
            fullWidth
            typographyStyle="text-body-1-16-semi-bold"
            className="bg-primary-normal"
          />
        </footer>
      </div>
    </MobileLayout>
  );
};

export default GoalCreatePage;
