import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/typography';
import ValuediLogo from '@/assets/icons/ValuediLogo.svg?react';
import HamburgerIcon from '@/assets/icons/Hamburger.svg';

export interface HomeGNBProps {
  className?: string;
  onMenuClick?: () => void;
  title?: string; // 페이지별 타이틀을 받을 수 있도록 추가됨
}

export const HomeGNB: React.FC<HomeGNBProps> = ({ className, onMenuClick, title }) => {
  const navigate = useNavigate();

  // 햄버거 버튼 클릭 핸들러: 부모의 커스텀 기능이 있으면 실행하고, 없으면 기본 메뉴로 이동
  const handleHamburgerClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      navigate('/menu');
    }
  };

  return (
    <header
      className={cn(
        'w-full h-[50px] px-[20px] flex items-center justify-between',
        'bg-white/65 backdrop-blur-sm sticky top-0 z-50',
        className
      )}
    >
      {/* 왼쪽 영역: 타이틀이 있으면 타이틀을, 없으면 로고를 표시 (클릭 시 홈으로 이동) */}
      <div className="flex items-center gap-[4px] cursor-pointer" onClick={() => navigate('/home')}>
        {title ? (
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90">
            {title}
          </Typography>
        ) : (
          <div className="w-[107px] h-[24px] flex items-center justify-center">
            <ValuediLogo className="w-full h-full" />
          </div>
        )}
      </div>

      {/* 오른쪽 영역: 메뉴 버튼 */}
      <button
        type="button"
        onClick={handleHamburgerClick}
        className={cn('flex items-center justify-center', 'w-[24px] h-[24px]', 'cursor-pointer')}
        aria-label="메뉴 열기"
      >
        <img src={HamburgerIcon} alt="메뉴" className="w-[24px] h-[24px]" />
      </button>
    </header>
  );
};
