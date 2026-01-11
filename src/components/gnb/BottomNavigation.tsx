import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components/typography';

export type BottomNavItem = 'home' | 'asset' | 'recommend' | 'goal';

export interface BottomNavigationProps {
  activeItem?: BottomNavItem;
  className?: string;
  onItemClick?: (item: BottomNavItem) => void;
}

// 임시 아이콘 컴포넌트들 - 나중에 실제 SVG로 교체 가능
const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 2L2 8V16H7V11H11V16H16V8L9 2Z"
      stroke={isActive ? '#171714' : '#999999'}
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const AssetIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 3L3 7V15H15V7L9 3Z"
      stroke={isActive ? '#171714' : '#999999'}
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const RecommendIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 2L11 7L16 8L12 12L13 17L9 14L5 17L6 12L2 8L7 7L9 2Z"
      stroke={isActive ? '#171714' : '#999999'}
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

const GoalIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="9"
      cy="9"
      r="7"
      stroke={isActive ? '#171714' : '#999999'}
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="9" cy="9" r="3" fill={isActive ? '#171714' : '#999999'} />
  </svg>
);

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeItem = 'home',
  className,
  onItemClick,
}) => {
  const navItems: { id: BottomNavItem; label: string; icon: React.ComponentType<{ isActive: boolean }> }[] = [
    { id: 'home', label: '홈', icon: HomeIcon },
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
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick?.(item.id)}
              className={cn('flex flex-col gap-[4px] items-center justify-center', 'p-[10px] w-[90px]')}
            >
              <div className="w-[24px] h-[24px] flex items-center justify-center">
                <Icon isActive={isActive} />
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

