import React from 'react';
import { cn } from '@/utils/cn';
import ValuediLogo from '@/assets/icons/ValuediLogo.svg?react';
import HamburgerIcon from '@/assets/icons/Hamburger.svg';

export interface HomeGNBProps {
  className?: string;
  onMenuClick?: () => void;
}

export const HomeGNB: React.FC<HomeGNBProps> = ({ className, onMenuClick }) => {
  return (
    <header
      className={cn(
        'w-full h-[50px] px-[20px] flex items-center justify-between',
        'bg-white/65 backdrop-blur-sm',
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-[4px]">
        <div className="w-[107px] h-[107px] flex items-center justify-center">
          <ValuediLogo className="w-full h-full" />
        </div>
      </div>

      {/* Hamburger Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className={cn('flex items-center justify-center', 'w-[24px] h-[24px]', 'cursor-pointer')}
        aria-label="메뉴 열기"
      >
        <img src={HamburgerIcon} alt="메뉴" className="w-[24px] h-[24px]" />
      </button>
    </header>
  );
};

