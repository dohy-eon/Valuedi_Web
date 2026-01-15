import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/typography';
import { SectorChart } from '../components/SectorChart';
import { SectorData } from '../utils/sectorUtils';

interface SectorSummarySectionProps {
  selectedDate: Date;
  totalAmount: number;
  sectorData: SectorData[];
  onPrev: () => void;
  onNext: () => void;
  diffAmountText: string;
  isMore: boolean;
}

export const SectorSummarySection = ({
  selectedDate,
  totalAmount,
  sectorData,
  onPrev,
  onNext,
  diffAmountText,
  isMore,
}: SectorSummarySectionProps) => {
  const navigate = useNavigate(); // 💡 2. 훅 선언 추가!
  /**
   * 💡 차트 데이터 가공 로직
   * 1. 상위 5개(Top 5) 추출
   * 2. 6위부터 나머지는 모두 합쳐서 'others' 키를 가진 데이터로 생성
   */
  const top5 = sectorData.slice(0, 5);
  const others = sectorData.slice(5);

  const otherTotalAmount = others.reduce((sum, item) => sum + item.amount, 0);
  const otherPercentage = others.reduce((sum, item) => sum + item.percentage, 0);

  // 💡 최종 차트 데이터 구성 (others가 있을 때만 합쳐서 전달 ㅋ)
  const chartData = [
    ...top5,
    ...(otherTotalAmount > 0
      ? [
          {
            key: 'others',
            amount: otherTotalAmount,
            percentage: otherPercentage,
            category: 'others',
            items: [],
          },
        ]
      : []),
  ];

  const monthDisplay = `${selectedDate.getMonth() + 1}월`;

  return (
    <section className="px-5 pt-5 pb-5 bg-white flex flex-col items-start">
      {/* 📅 날짜 선택 (◀ ▶ 화살표) */}
      <div className="flex items-center gap-1 mb-4">
        <button onClick={onPrev} className="text-neutral-40 px-1 text-xl">
          ◀
        </button>
        <Typography variant="body-1" weight="bold" color="neutral-90">
          {monthDisplay}
        </Typography>
        <button onClick={onNext} className="text-neutral-40 px-1 text-xl">
          ▶
        </button>
      </div>

      {/* 💰 이번 달 총 지출 금액 */}
      <div
        onClick={() =>
          navigate('/asset/sector-full', {
            state: { selectedDate: selectedDate }, // 💡 현재 보고 있는 날짜를 넘겨줌!
          })
        }
        className="cursor-pointer active:opacity-70 transition-opacity"
      >
        <Typography variant="headline-1" weight="bold" color="neutral-90" className="mb-1">
          {totalAmount.toLocaleString()}원
        </Typography>
      </div>

      {/* 📉 지난달 비교 문구 */}
      <Typography variant="body-3" color="neutral-50" className="mb-4">
        지난 달 같은 기간보다 <span className="text-neutral-90 font-bold text-[13px]">{diffAmountText}원</span>
        {isMore ? ' 더 ' : ' 덜 '}
        썼어요
      </Typography>

      {/* 📊 가로형 바 차트 (Top 5 + Others 묶음 전달) */}
      <div className="w-full flex justify-center mb-0">
        <SectorChart data={chartData} />
      </div>
    </section>
  );
};
