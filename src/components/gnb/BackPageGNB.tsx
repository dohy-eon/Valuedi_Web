import React from 'react';
import { cn } from '@/utils/cn';

import BaseGNB, { BaseGNBProps } from './BaseGNB';
import BackPageHeader, { BackPageHeaderProps } from './BackPageHeader';

export interface BackPageGNBProps extends BaseGNBProps, Omit<BackPageHeaderProps, 'className'> {
  className?: string;
}

const BackPageGNB: React.FC<BackPageGNBProps> = ({
  onFontClick,
  onRefreshClick,
  title,
  text,
  onBack,
  onSkip,
  className,
}) => {
  return (
    <div className={cn('flex flex-col w-full', className)}>
      <BaseGNB onFontClick={onFontClick} onRefreshClick={onRefreshClick} />
      <BackPageHeader title={title} text={text} onBack={onBack} onSkip={onSkip} />
    </div>
  );
};

export default BackPageGNB;
