import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { HomeGNB } from '@/components/gnb/HomeGNB';
import { BottomNavigation } from '@/components/gnb/BottomNavigation';
import { Typography } from '@/components/typography';
import { cn } from '@/utils/cn';
import { MoreViewButton } from '@/components/buttons/MoreViewButton';
import { formatCurrency } from '@/utils/formatCurrency';
import AddGoalIcon from '@/assets/icons/home/AddGoal.svg';
import kbIcon from '@/assets/icons/bank/kb.svg';
import SpendTodayIcon from '@/assets/icons/home/SpendToday.svg';
import SpendYesterdayIcon from '@/assets/icons/home/SpendYesterday.svg';
import MbtiHomeIcon from '@/assets/icons/home/MbtiHome.svg';

// 임시 목표 데이터
const goals = [
  { id: '1', name: '테야테야 갈테야', amount: 10000000, iconBg: '#f5f0c8' },
  { id: '2', name: '목표진행중', amount: 10000000, iconBg: '#c8d1f5' },
  { id: '3', name: '목표어쩌구입니다', amount: 10000000, iconBg: '#c8def5' },
];

// 임시 계좌 데이터
const accounts = [
  { id: '1', bankName: 'KB국민ONE통장', balance: 11125023, iconBg: '#f5f0c8' },
  { id: '2', bankName: 'KB국민ONE통장', balance: 115023, iconBg: '#c8d1f5' },
  { id: '3', bankName: 'KB국민ONE통장', balance: 15023, iconBg: '#c8def5' },
  { id: '4', bankName: 'KB국민ONE통장', balance: 3023, iconBg: '#d8f5c8' },
];

// 목표/계좌 아이콘 컴포넌트
const GoalAccountIcon = ({ bgColor }: { bgColor: string }) => (
  <div
    className={cn('w-[32px] h-[32px] rounded-[8px] flex items-center justify-center')}
    style={{ backgroundColor: bgColor, opacity: 0.65 }}
  >
    <img src={kbIcon} alt="은행 아이콘" className="w-[22px] h-[22px] object-contain" />
  </div>
);

export const HomePage = () => {
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
      {/* GNB */}
      <div className="sticky top-0 z-10 w-full">
        <HomeGNB />
      </div>

      {/* Content */}
      <div className="flex-1 pb-[64px] overflow-y-auto">
        <div className="flex flex-col gap-[8px] px-[20px] py-[16px]">
          {/* 목표 추가하기 카드 */}
          <div className="bg-white border border-neutral-10 rounded-[8px] p-[12px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]">
            <div className="flex gap-[8px] items-center">
              <div className="size-8 flex items-center justify-center">
                <img src={AddGoalIcon} alt="목표 추가" className="w-8 h-8" />
              </div>
              <div className="flex-1 flex flex-col">
                <Typography style="text-caption-2-11-regular" className="text-neutral-50" fontFamily="pretendard">
                  또 다른 목표가 있나요?
                </Typography>
                <Typography style="text-body-2-14-semi-bold" className="text-neutral-90" fontFamily="pretendard">
                  목표 추가하기
                </Typography>
              </div>
            </div>
          </div>

          {/* 나의 목표 섹션 */}
          <div className="bg-white rounded-[8px] px-[12px] pt-[16px] pb-[16px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]">
            <Typography style="text-body-2-14-regular" className="text-neutral-70 mb-[16px]" fontFamily="pretendard">
              나의 목표
            </Typography>
            <div className="flex flex-col gap-[8px] mb-[16px]">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between py-[8px]">
                  <div className="flex gap-[8px] items-center">
                    <GoalAccountIcon bgColor={goal.iconBg} />
                    <div className="flex flex-col gap-[2px]">
                      <Typography style="text-body-2-14-semi-bold" className="text-neutral-90" fontFamily="pretendard">
                        {goal.name}
                      </Typography>
                      <Typography style="text-caption-1-12-regular" className="text-neutral-70" fontFamily="pretendard">
                        {formatCurrency(goal.amount)}
                      </Typography>
                    </div>
                  </div>
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <MoreViewButton />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-white border border-neutral-10 rounded-[4px] p-[8px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]">
              <Typography
                style="text-body-2-14-regular"
                className="text-neutral-70 text-center"
                fontFamily="pretendard"
              >
                목표 10개 전체보기
              </Typography>
            </button>
          </div>

          {/* 연결된 은행 및 계좌 섹션 */}
          <div className="bg-white rounded-[8px] px-[12px] pt-[16px] pb-[16px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]">
            <Typography style="text-body-2-14-regular" className="text-neutral-70 mb-[16px]" fontFamily="pretendard">
              연결된 은행 및 계좌
            </Typography>
            <div className="flex flex-col gap-[8px] mb-[16px]">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between py-[8px]">
                  <div className="flex gap-[8px] items-center">
                    <GoalAccountIcon bgColor={account.iconBg} />
                    <div className="flex flex-col gap-[2px]">
                      <Typography style="text-body-2-14-semi-bold" className="text-neutral-90" fontFamily="pretendard">
                        {formatCurrency(account.balance)}
                      </Typography>
                      <Typography style="text-caption-1-12-regular" className="text-neutral-70" fontFamily="pretendard">
                        {account.bankName}
                      </Typography>
                    </div>
                  </div>
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <MoreViewButton />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-white border border-neutral-10 rounded-[4px] p-[8px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]">
              <Typography
                style="text-body-2-14-regular"
                className="text-neutral-70 text-center"
                fontFamily="pretendard"
              >
                자산 21개 전체보기
              </Typography>
            </button>
          </div>

          {/* 이번 달 지출 섹션 */}
          <div className="bg-white rounded-[8px] px-[12px] pt-[16px] pb-[16px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]">
            <Typography style="text-body-2-14-regular" className="text-neutral-70 mb-[16px]" fontFamily="pretendard">
              이번 달 지출
            </Typography>
            <div className="flex flex-col gap-[4px] mb-[16px]">
              <div className="flex items-center gap-[2px]">
                <Typography
                  style="text-headline-3-18-semi-bold"
                  className="text-black tracking-[-0.36px]"
                  fontFamily="pretendard"
                >
                  {formatCurrency(526387)}
                </Typography>
              </div>
              <Typography style="text-body-3-13-regular" className="text-neutral-70" fontFamily="pretendard">
                지난 달 같은 기간보다 <span className="font-medium text-neutral-90">10만원</span> 덜 썼어요
              </Typography>
            </div>
            <div className="flex flex-col gap-[12px]">
              {/* 오늘 지출 */}
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] flex items-center justify-center">
                  <img src={SpendTodayIcon} alt="오늘 지출" className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <Typography style="text-body-2-14-regular" className="text-neutral-70" fontFamily="pretendard">
                    오늘 지출
                  </Typography>
                  <Typography style="text-body-2-14-semi-bold" className="text-neutral-90" fontFamily="pretendard">
                    {formatCurrency(0)}
                  </Typography>
                </div>
              </div>
              {/* 어제 지출 */}
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] flex items-center justify-center">
                  <img src={SpendYesterdayIcon} alt="어제 지출" className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <Typography style="text-body-2-14-regular" className="text-neutral-70" fontFamily="pretendard">
                    어제 지출
                  </Typography>
                  <Typography style="text-body-2-14-semi-bold" className="text-neutral-90" fontFamily="pretendard">
                    {formatCurrency(12)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* MBTI 섹션 */}
          <div className="bg-white rounded-[8px] px-[12px] pt-[16px] pb-[16px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]">
            <div className="flex flex-col gap-[4px] mb-[16px]">
              <Typography style="text-body-2-14-regular" className="text-neutral-70" fontFamily="pretendard">
                회원님의 금융 MBTI는?
              </Typography>
              <Typography
                style="text-headline-3-18-semi-bold"
                className="text-neutral-90 tracking-[-0.36px]"
                fontFamily="pretendard"
              >
                불안한 안정자산 추구형
              </Typography>
            </div>
            <div className="w-full h-[146px] bg-atomic-yellow-95 rounded-[4px] flex items-center justify-center">
              <img src={MbtiHomeIcon} alt="금융 MBTI" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* 맞춤 상품 섹션 */}
          <div className="bg-white rounded-[8px] px-[12px] pt-[16px] pb-[16px] shadow-[0px_0px_16px_0px_rgba(25,25,20,0.04)]">
            <div className="flex flex-col gap-[4px] mb-[16px]">
              <Typography style="text-body-2-14-regular" className="text-neutral-50" fontFamily="pretendard">
                회원님과 같은 유형을 위한
              </Typography>
              <Typography
                style="text-headline-3-18-semi-bold"
                className="text-neutral-90 tracking-[-0.36px]"
                fontFamily="pretendard"
              >
                맞춤 상품이에요
              </Typography>
            </div>
            <div className="flex gap-[12px] overflow-x-auto px-[12px] -mx-[12px]">
              <div className="bg-neutral-10 rounded-[16px] p-[16px] min-w-[221px] flex flex-col gap-[4px]">
                <Typography
                  style="text-body-1-16-semi-bold"
                  className="text-neutral-90 leading-[1.3]"
                  fontFamily="pretendard"
                >
                  ONE 체크카드 (K-패스)
                </Typography>
                <Typography
                  style="text-body-3-13-regular"
                  className="text-neutral-50 leading-[1.3]"
                  fontFamily="pretendard"
                >
                  내 맘대로 골라받는 3가지 캐시백
                </Typography>
              </div>
              <div className="bg-neutral-10 rounded-[16px] p-[16px] min-w-[221px] flex flex-col gap-[4px]">
                <Typography
                  style="text-body-1-16-semi-bold"
                  className="text-neutral-90 leading-[1.3]"
                  fontFamily="pretendard"
                >
                  신한 쏠 뱅크 체크카드
                </Typography>
                <Typography
                  style="text-body-3-13-regular"
                  className="text-neutral-50 leading-[1.3]"
                  fontFamily="pretendard"
                >
                  한양대학교 에리카 학생이라면 !
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[360px]">
        <BottomNavigation activeItem="home" onItemClick={handleNavClick} />
      </div>
    </MobileLayout>
  );
};

export default HomePage;
