import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { Typography } from '@/components/typography';
import { MoreViewButton } from '@/components/buttons/MoreViewButton';
import { BANKS } from '@/features/bank/constants/banks';
import { cn } from '@/utils/cn';
import { Toast } from '@/components/common/Toast';

export const ConnectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardSectionRef = useRef<HTMLDivElement>(null);

  // 💡 1. 목록 데이터를 상태(state)로 관리 (실제 삭제 반영을 위함)
  const [banks, setBanks] = useState(['국민은행', '기업은행', '신한은행', '농협은행', '우리은행', '수협은행']);
  const [cards, setCards] = useState(['KB국민카드', 'IBK기업은행', '하나카드', '농협은행']);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // 💡 2. 상세 페이지에서 '해제' 후 넘어왔는지 확인
    if (location.state?.shouldShowToast && location.state?.deletedBankName) {
      const targetName = location.state.deletedBankName;

      // 데이터 삭제 반영
      setBanks((prev) => prev.filter((name) => name !== targetName));
      setCards((prev) => prev.filter((name) => name !== targetName));

      // 토스트 띄우기
      setShowToast(true);

      // 토스트 자동 종료 및 state 초기화 (뒤로가기 시 중복 실행 방지)
      const timer = setTimeout(() => setShowToast(false), 2000);

      // 💡 replace를 통해 URL의 state를 비워줍니다 (중요!)
      navigate(location.pathname, { replace: true, state: {} });

      return () => clearTimeout(timer);
    }

    // 기존 카드 섹션 스크롤 로직
    if (location.state?.target === 'card' && cardSectionRef.current) {
      const timer = setTimeout(() => {
        cardSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleItemClick = (name: string) => {
    navigate('/mypage/connection/detail', { state: { bankName: name } });
  };

  const getBankInfo = (label: string) => {
    const bank = BANKS.find((b) => label.includes(b.name.replace('은행', '').replace('카드', '')));

    // 2. 배경색 매핑 규칙 적용
    const colorMapping: Record<string, string> = {
      국민은행: 'kb',
      KB국민카드: 'kb',
      기업은행: 'ibk',
      IBK기업은행: 'ibk',
      신한은행: 'kbank', // 신한 -> kbank 컬러칩
      농협은행: 'nh',
      우리은행: 'kbank', // 우리 -> kbank 컬러칩
      수협은행: 'suhyup',
      하나카드: 'hana', // 하나 -> hana 컬러칩
    };
    const colorId = colorMapping[label] || bank?.id;
    return {
      icon: bank?.icon,
      bgColor: colorId ? `var(--color-bank-${colorId})` : 'var(--color-neutral-5)',
    };
  };

  return (
    <MobileLayout className={cn('bg-neutral-0')}>
      <div className={cn('sticky top-0 z-10 w-full')}>
        <BackPageGNB
          className={cn('bg-neutral-0')}
          onBack={() => navigate(-1)}
          text=""
          title="연결관리"
          titleColor="text-neutral-90"
        />
      </div>

      <div className="flex-1 pb-10">
        {/* 💡 banks 상태 사용 */}
        <ConnectionSection title="연결된 은행">
          {banks.map((name) => {
            const { icon, bgColor } = getBankInfo(name);
            return (
              <ConnectionItem
                key={name}
                label={name}
                icon={icon}
                bgColor={bgColor}
                onClick={() => handleItemClick(name)}
              />
            );
          })}
        </ConnectionSection>

        <div ref={cardSectionRef}>
          <div className="h-2 bg-neutral-10 w-full" />
          {/* 💡 cards 상태 사용 */}
          <ConnectionSection title="연결된 카드">
            {cards.map((name) => {
              const { icon, bgColor } = getBankInfo(name);
              return (
                <ConnectionItem
                  key={name}
                  label={name}
                  icon={icon}
                  bgColor={bgColor}
                  onClick={() => handleItemClick(name)}
                />
              );
            })}
          </ConnectionSection>
        </div>
      </div>

      {/* 💡 3. 토스트 컴포넌트 추가 */}
      <Toast message="해제되었습니다" isOpen={showToast} />
    </MobileLayout>
  );
};

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

const ConnectionItem = ({
  label,
  icon,
  bgColor,
  onClick,
}: {
  label: string;
  icon?: string;
  bgColor?: string;
  onClick: () => void;
}) => (
  <div
    className="w-full px-5 py-4 flex items-center justify-between active:bg-neutral-3 transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden border border-neutral-10"
        style={{ backgroundColor: bgColor }} // 💡 인라인 스타일로 컬러칩 적용
      >
        {icon ? (
          <img src={icon} alt={label} className="w-6 h-6 object-contain" />
        ) : (
          <div className="w-6 h-6 bg-neutral-20 rounded-full" />
        )}
      </div>
      <Typography variant="body-2" weight="semi-bold" className="text-neutral-90">
        {label}
      </Typography>
    </div>
    <MoreViewButton className="opacity-40" />
  </div>
);
