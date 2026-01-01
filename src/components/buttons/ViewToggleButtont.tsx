import React from 'react';
import { cn } from '@/utils/cn';

import ListIcon from '@/assets/icons/List.svg?react';
import ListOffIcon from '@/assets/icons/ListOff.svg?react';
import CalendarIcon from '@/assets/icons/Calendar.svg?react';
import CalendarOffIcon from '@/assets/icons/CalendarOff.svg?react';

export type ViewMode = 'list' | 'calendar';

export interface ViewToggleButtonProps {
  className?: string;
  mode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({ className, mode, onToggle }) => {
  return (
    <div
      className={cn(
        'flex items-center',
        'gap-[4px]',
        'p-[4px]',
        'bg-neutral-20',
        'rounded-[6px]',
        'w-fit h-fit',
        className
      )}
    >
      <button
        type="button"
        onClick={() => onToggle('list')}
        className={cn(
          'flex items-center justify-center',
          'w-[24px] h-[24px]',
          'rounded-[4px]',
          mode === 'list' ? 'bg-neutral-0' : 'bg-transparent'
        )}
      >
        {mode === 'list' ? <ListIcon /> : <ListOffIcon />}
      </button>

      <button
        type="button"
        onClick={() => onToggle('calendar')}
        className={cn(
          'flex items-center justify-center',
          'w-[24px] h-[24px]',
          'rounded-[4px]',
          mode === 'calendar' ? 'bg-neutral-0 ' : 'bg-transparent'
        )}
      >
        {mode === 'calendar' ? <CalendarIcon /> : <CalendarOffIcon />}
      </button>
    </div>
  );
};

export default ViewToggleButton;
