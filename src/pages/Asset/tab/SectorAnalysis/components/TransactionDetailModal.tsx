import ReactDOM from 'react-dom';
import { Typography } from '@/components/typography';
import { cn } from '@/utils/cn';
import { BaseButton } from '@/components/buttons/BaseButton';
import PenIcon from '@/assets/icons/asset/Pen.svg';
// 💡 유틸리티에서 정의한 정석 타입들을 임포트합니다.
import { TransactionWithDetails, TransactionDetail } from '../utils/sectorUtils';

interface TransactionDetailModalProps {
  // 💡 any 대신 정석 타입을 적용합니다.
  item: TransactionWithDetails;
  onClose: () => void;
}

export const TransactionDetailModal = ({ item, onClose }: TransactionDetailModalProps) => {
  // 렌더링 에러 방지를 위한 안전장치
  if (!item) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-end justify-center animate-fade-in"
      style={{ zIndex: 10000, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className="w-[360px] h-auto bg-white rounded-t-xl flex flex-col shadow-2xl relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 핸들 바 */}
        <div className="py-3">
          <div className="w-10 h-1 bg-neutral-20 rounded-full mx-auto" />
        </div>

        <div className="w-80 mx-auto flex flex-col justify-center">
          {/* 제목 영역 */}
          <Typography
            variant="body-1"
            weight="semi-bold"
            fontFamily="pretendard"
            color="neutral-90"
            className="mt-3 mb-4"
          >
            {item.title}
          </Typography>

          {/* 메모 입력창 */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="메모를 남겨주세요 (최대 20자)"
              className={cn(
                'w-full bg-neutral-5 rounded-lg px-4 py-3.5 text-sm outline-none transition-all',
                'border border-neutral-20 focus:border-primary-normal',
                'placeholder:text-neutral-50 text-neutral-90'
              )}
            />
            <img
              src={PenIcon}
              alt="edit"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>

          {/* 상세 정보 리스트 */}
          <div className="flex flex-col gap-8">
            {/* 💡 any를 제거하고 정확한 타입을 매핑합니다. */}
            {item.displayDetails?.map((detail: TransactionDetail, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <Typography variant="body-2" weight="regular" color="neutral-70" fontFamily="pretendard">
                  {detail.label}
                </Typography>

                <Typography
                  variant="body-2"
                  weight="regular"
                  color="neutral-90"
                  fontFamily="pretendard"
                  className={detail.isBold ? 'font-bold' : ''} // isBold 옵션 처리
                >
                  {detail.value}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 확인 버튼 */}
        <div className="px-5 pt-10 pb-10">
          <BaseButton
            text="확인하기"
            variant="primary"
            fullWidth
            onClick={onClose}
            className="h-[54px] rounded-xl"
            typographyStyle="text-body-1-16-semi-bold"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
