import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { Typography } from '@/components/typography';
import { MoreViewButton } from '@/components/buttons/MoreViewButton';
import { BANKS } from '@/features/bank/constants/banks';

export const ConnectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.target === 'card' && cardSectionRef.current) {
      const timer = setTimeout(() => {
        cardSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  /**
   * 💡 요청하신 매칭 규칙에 따른 정보 추출 함수
   */
  const getBankInfo = (label: string) => {
    // 1. 아이콘 찾기 (이름 기반)
    const bank = BANKS.find((b) => label.includes(b.name.replace('은행', '').replace('카드', '')));
    
    // 2. 배경색 매핑 규칙 적용
    const colorMapping: Record<string, string> = {
      '국민은행': 'kb',
      'KB국민카드': 'kb',
      '기업은행': 'ibk',
      'IBK기업은행': 'ibk',
      '신한은행': 'kbank',   // 신한 -> kbank 컬러칩
      '농협은행': 'nh',
      '우리은행': 'kbank',   // 우리 -> kbank 컬러칩
      '수협은행': 'suhyup',
      '하나카드': 'hana',    // 하나 -> hana 컬러칩
    };

    // 매핑 테이블에 있으면 해당 값을, 없으면 데이터의 id를 우선 사용
    const colorId = colorMapping[label] || bank?.id;

    return {
      icon: bank?.icon,
      bgColor: colorId ? `var(--color-bank-${colorId})` : 'var(--color-neutral-5)'
    };
  };

  return (
    <MobileLayout className="bg-white flex flex-col h-screen overflow-hidden">
      <BackPageGNB
        title="연결관리"
        onBack={() => navigate(-1)}
        text=""
        className="bg-white border-b border-neutral-5"
      />

      <div className="flex-1 overflow-y-auto pb-[50vh]">
        {/* 연결된 은행 섹션 */}
        <ConnectionSection title="연결된 은행">
          {['국민은행', '기업은행', '신한은행', '농협은행', '우리은행', '수협은행'].map((name) => {
            const { icon, bgColor } = getBankInfo(name);
            return <ConnectionItem key={name} label={name} icon={icon} bgColor={bgColor} />;
          })}
        </ConnectionSection>

        {/* 연결된 카드 섹션 */}
        <div ref={cardSectionRef}>
          <div className="h-2 bg-neutral-10 w-full" />
          <ConnectionSection title="연결된 카드">
            {['KB국민카드', 'IBK기업은행', '하나카드', '농협은행'].map((name) => {
              const { icon, bgColor } = getBankInfo(name);
              return <ConnectionItem key={name} label={name} icon={icon} bgColor={bgColor} />;
            })}
          </ConnectionSection>
        </div>
      </div>
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

/**
 * 💡 ConnectionItem: bgColor를 props로 받아 style에 적용
 */
const ConnectionItem = ({ label, icon, bgColor }: { label: string; icon?: string; bgColor?: string }) => (
  <div className="w-full px-5 py-4 flex items-center justify-between active:bg-neutral-3 transition-colors cursor-pointer">
    <div className="flex items-center gap-3">
      <div 
        className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden border border-neutral-10"
        style={{ backgroundColor: bgColor }} // 💡 인라인 스타일로 컬러칩 적용
      >
        {icon ? (
          <img src={icon} alt={label} className="w-[22px] h-[22px] object-contain" />
        ) : (
          <div className="w-6 h-6 bg-neutral-20 rounded-full" />
        )}
      </div>
      <Typography variant="body-2" className="text-neutral-80">
        {label}
      </Typography>
    </div>
    <MoreViewButton className="opacity-40" />
  </div>
);
