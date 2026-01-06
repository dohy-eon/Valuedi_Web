import React from 'react';
import { cn } from '@/utils/cn';

import TimeIcon from '@/assets/icons/gnb/Time.svg';
import MobileSignalIcon from '@/assets/icons/gnb/MobileSignal.svg';
import WifiIcon from '@/assets/icons/gnb/Wifi.svg';
import BatteryIcon from '@/assets/icons/gnb/Battery.svg';
import LockIcon from '@/assets/icons/gnb/Lock.svg';
import DomainIcon from '@/assets/icons/gnb/Domain.svg';
import RefreshIcon from '@/assets/icons/gnb/Refresh.svg';
import AIcon from '@/assets/icons/gnb/A.svg';

export interface BaseGNBProps {
  className?: string;
  onFontClick?: () => void;
  onRefreshClick?: () => void;
}

const BaseGNB: React.FC<BaseGNBProps> = ({ className, onFontClick, onRefreshClick }) => {
  return (
    <div className={cn('flex flex-col w-[360px] h-[100px]', className)}>
      <div className={cn('flex items-center justify-between h-[44px] px-[20px] bg-system-light')}>
        <div className={cn('pl-[18px]')}>
          <img src={TimeIcon} alt="Time" />
        </div>

        <div className={cn('flex items-center gap-[5px]')}>
          <img src={MobileSignalIcon} alt="Signal" />
          <img src={WifiIcon} alt="Wifi" />
          <img src={BatteryIcon} alt="Battery" />
        </div>
      </div>

      <div className={cn('flex items-center justify-between h-[56px] px-[20px] bg-system-light')}>
        <div className={cn('w-[54px]')}></div>

        <div className={cn('flex items-center gap-[8px]')}>
          <img src={LockIcon} alt="Lock" />
          <img src={DomainIcon} alt="www.valuedi.com" />
        </div>

        <div className={cn('flex items-center justify-end gap-[16px] w-[60px]')}>
          <button type="button" onClick={onFontClick} className={cn('flex items-center justify-center cursor-pointer')}>
            <img src={AIcon} alt="Font Size" />
          </button>

          <button
            type="button"
            onClick={onRefreshClick}
            className={cn('flex items-center justify-center cursor-pointer')}
          >
            <img src={RefreshIcon} alt="Refresh" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseGNB;
