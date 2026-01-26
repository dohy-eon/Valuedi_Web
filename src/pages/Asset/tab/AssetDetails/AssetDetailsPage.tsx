import { useState } from 'react';
import { cn } from '@/utils/cn';
import { AssetList } from './components/AssetList';
import { AssetLedger } from './components/AssetLedger';
import { SegmentedButton } from '@/components/buttons/SegmentedButton';

type ViewType = 'list' | 'ledger';

export const AssetDetails = () => {
  const [viewType, setViewType] = useState<ViewType>('list');

  const viewOptions = [
    { label: '자산목록', value: 'list' as const },
    { label: '가계부', value: 'ledger' as const },
  ];

  return (
    <div className={cn('flex flex-col w-full h-full bg-neutral-0')}>
      <div className={cn('px-[20px] pt-[20px]')}>
        <SegmentedButton<ViewType> value={viewType} onChange={setViewType} options={viewOptions} />
      </div>

      <div className={cn('flex-1')}>{viewType === 'list' ? <AssetList /> : <AssetLedger />}</div>
    </div>
  );
};
