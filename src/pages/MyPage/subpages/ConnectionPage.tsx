import { useEffect, useRef } from 'react'; // 💡 useRef, useEffect 추가
import { useLocation, useNavigate } from 'react-router-dom'; // 💡 useLocation 추가
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { Typography } from '@/components/typography';
import { MoreViewButton } from '@/components/buttons/MoreViewButton';
import AddIcon from '@/assets/icons/Add.svg';

export const ConnectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 💡 현재 위치와 전달받은 state를 가져옴

  // 💡 카드 섹션을 가리킬 "핀"을 만듭니다.
  const cardSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 💡 SettingsPage에서 { state: { target: 'card' } }를 보냈을 때만 작동!
    if (location.state?.target === 'card' && cardSectionRef.current) {
      // 0.1초 정도 아주 살짝 딜레이를 주면 페이지 로드 후 더 확실하게 이동해요 ㅋ
      const timer = setTimeout(() => {
        cardSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <MobileLayout className="bg-white flex flex-col h-screen overflow-hidden">
      <BackPageGNB
        title="연결관리"
        onBack={() => navigate(-1)}
        text={
          <div className="flex items-center gap-1 cursor-pointer">
            <img src={AddIcon} alt="추가" />
            <Typography variant="body-2" className="text-neutral-70">
              추가하기
            </Typography>
          </div>
        }
        className="bg-white border-b border-neutral-5"
      />

      <div className="flex-1 overflow-y-auto pb-[50vh]">
        {/* 2. 연결된 은행 섹션 */}
        <ConnectionSection title="연결된 은행">
          <ConnectionItem label="국민은행" />
          <ConnectionItem label="기업은행" />
          <ConnectionItem label="신한은행" />
          <ConnectionItem label="농협은행" />
          <ConnectionItem label="우리은행" />
          <ConnectionItem label="수협은행" />
        </ConnectionSection>

        {/* 💡 3. 연결된 카드 섹션 */}
        <div ref={cardSectionRef}>
          <div className="h-2 bg-neutral-10 w-full" />
          <ConnectionSection title="연결된 카드">
            <ConnectionItem label="KB국민카드" />
            <ConnectionItem label="IBK기업은행" />
            <ConnectionItem label="하나카드" />
            <ConnectionItem label="농협은행" />
          </ConnectionSection>
        </div>
      </div>
    </MobileLayout>
  );
};
/**
 * 💡 섹션 컴포넌트
 */
const ConnectionSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col py-6">
    <div className="px-5 mb-4">
      <Typography variant="body-1" weight="bold" className="text-neutral-90">
        {title}
      </Typography>
    </div>
    <div className="flex flex-col">{children}</div>
  </div>
);

/**
 * 💡 아이템 컴포넌트 (은행/카드 리스트 한 줄)
 */
const ConnectionItem = ({ label, icon }: { label: string; icon?: string }) => (
  <div className="w-full px-5 py-4 flex items-center justify-between active:bg-neutral-3 transition-colors cursor-pointer">
    <div className="flex items-center gap-3">
      {/* 은행/카드 로고 영역 (40x40 박스) */}
      <div className="w-10 h-10 rounded-xl bg-neutral-10 flex items-center justify-center overflow-hidden">
        {icon ? (
          <img src={icon} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-6 h-6 bg-neutral-20 rounded-full" /> // 임시 아이콘
        )}
      </div>
      <Typography variant="body-2" className="text-neutral-80">
        {label}
      </Typography>
    </div>
    <MoreViewButton className="opacity-40" />
  </div>
);
