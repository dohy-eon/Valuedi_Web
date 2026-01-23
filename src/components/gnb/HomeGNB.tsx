import React from 'react';
import { useNavigate } from 'react-router-dom'; // 💡 1. 네비게이션 훅 추가
import { cn } from '@/utils/cn';
import ValuediLogo from '@/assets/icons/ValuediLogo.svg?react';
import HamburgerIcon from '@/assets/icons/Hamburger.svg';

export interface HomeGNBProps {
  className?: string;
  onMenuClick?: () => void;
}

export const HomeGNB: React.FC<HomeGNBProps> = ({ className, onMenuClick }) => {
  const navigate = useNavigate(); // 💡 2. navigate 함수 선언

  // 💡 햄버거 클릭 핸들러
  const handleHamburgerClick = () => {
    if (onMenuClick) {
      onMenuClick(); // 만약 부모가 따로 준 기능이 있다면 실행
    } else {
      navigate('/menu'); // 기본 동작: 메뉴 페이지로 이동
    }
  };

  return (
    <header
      className={cn(
        'w-full h-[50px] px-[20px] flex items-center justify-between',
        'bg-white/65 backdrop-blur-sm',
        className
      )}
    >
      {/* Logo: 클릭 시 홈으로 이동하도록 수정 */}
      <div 
        className="flex items-center gap-[4px] cursor-pointer" 
        onClick={() => navigate('/home')}
      >
        <div className="w-[107px] h-[107px] flex items-center justify-center">
          <ValuediLogo className="w-full h-full" />
        </div>
      </div>

      {/* Hamburger Menu */}
      <button
        type="button"
        onClick={handleHamburgerClick} // 💡 수정된 핸들러 연결
        className={cn('flex items-center justify-center', 'w-[24px] h-[24px]', 'cursor-pointer')}
        aria-label="메뉴 열기"
      >
        <img src={HamburgerIcon} alt="메뉴" className="w-[24px] h-[24px]" />
      </button>
    </header>
  );
};