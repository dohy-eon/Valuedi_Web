import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/typography';
import HomeIconActive from '@/assets/icons/home/Home btn.svg';
import AssetIcon from '@/assets/icons/home/Home btn-1.svg';
import RecommendIcon from '@/assets/icons/home/Home btn-2.svg';
import GoalIcon from '@/assets/icons/home/Home btn-3.svg';

export type BottomNavItem = 'home' | 'asset' | 'recommend' | 'goal';

export interface BottomNavigationProps {
  activeItem?: BottomNavItem;
  className?: string;
  onItemClick?: (item: BottomNavItem) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeItem = 'home',
  className,
  onItemClick,
}) => {
  const navItems: { id: BottomNavItem; label: string; icon: string }[] = [
    { id: 'home', label: '홈', icon: HomeIconActive },
    { id: 'asset', label: '자산', icon: AssetIcon },
    { id: 'recommend', label: '추천', icon: RecommendIcon },
    { id: 'goal', label: '목표', icon: GoalIcon },
  ];

  return (
    <nav
      className={cn(
        'w-full h-[64px] flex items-center justify-center',
        'bg-white border-t border-neutral-10',
        'shadow-[0px_-8px_16px_0px_rgba(25,25,25,0.04)]',
        className
      )}
    >
      <div className="flex items-center justify-center w-full max-w-[360px]">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick?.(item.id)}
              className={cn('flex flex-col gap-[4px] items-center justify-center', 'p-[10px] w-[90px]')}
            >
              <div className="w-[24px] h-[24px] flex items-center justify-center">
                <img src={item.icon} alt={item.label} className="w-full h-full" />
              </div>
              <Typography
                style={isActive ? 'text-caption-1-12-semi-bold' : 'text-caption-1-12-regular'}
                className={cn('text-center', isActive ? 'text-neutral-90' : 'text-neutral-70')}
                fontFamily="pretendard"
              >
                {item.label}
              </Typography>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

