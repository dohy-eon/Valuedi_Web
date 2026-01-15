import { Typography } from '@/components/typography';
import { formatCurrency } from '@/utils/formatCurrency';
import { useGetAssetAnalysis } from '@/hooks/Asset/useGetAssetAnalysis';
import { PEER_AVERAGE_DATA } from '../constants/mockData';
import { CompareBar } from './CompareBar';

export const PeerCompareSection = () => {
  const now = new Date();
  const { totalExpense: myTotal } = useGetAssetAnalysis(now);
  const peerTotal = PEER_AVERAGE_DATA.total;

  const diffAmount = Math.abs(myTotal - peerTotal);
  const isMore = myTotal > peerTotal;

  return (
    <section className="px-5 py-8 bg-white border-b-[8px] border-neutral-5">
      <Typography variant="headline-3" weight="semi-bold" color="neutral-90" className="mb-1">
        또래별 비교
      </Typography>
      <Typography variant="body-3" color="neutral-70" className="mb-10">
        또래 평균보다 월별 <span className="font-semi-bold text-neutral-70">{formatCurrency(diffAmount)}</span>{' '}
        {isMore ? '이상 더 지출해요' : '이하로 지출해요'}
      </Typography>

      {/* 바 차트 컨테이너 */}
      <div className="flex justify-center items-end gap-14 px-10 h-44">
        <CompareBar label="또래 평균" amount={peerTotal} maxAmount={Math.max(myTotal, peerTotal) * 1.2} />
        <CompareBar
          label="김휘주님"
          amount={myTotal}
          isHighlight={true}
          maxAmount={Math.max(myTotal, peerTotal) * 1.2}
        />
      </div>
    </section>
  );
};
