import { BaseButton } from '@/components/buttons/BaseButton';
import { Typography } from '@/components/typography';

interface GoalDeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const GoalDeleteConfirmModal = ({ isOpen, onClose, onConfirm }: GoalDeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-neutral-90 opacity-[0.65] z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
        <div className="w-full max-w-[320px] bg-white rounded-[12px] px-5 py-6">
          <Typography style="text-body-1-16-semi-bold" fontFamily="pretendard" className="text-neutral-90">
            목표를 삭제하시겠어요?
          </Typography>

          <div className="mt-6 flex gap-3">
            <BaseButton
              size="custom"
              variant="ghost"
              onClick={onClose}
              className="flex-1 h-[48px] rounded-[8px] bg-neutral-20"
              typographyStyle="text-body-1-16-semi-bold"
            >
              <Typography style="text-body-1-16-semi-bold" fontFamily="pretendard" color="neutral-60">
                취소하기
              </Typography>
            </BaseButton>

            <BaseButton
              size="custom"
              variant="primary"
              onClick={onConfirm}
              className="flex-1 h-[48px] rounded-[8px]"
              typographyStyle="text-body-1-16-semi-bold"
              text="삭제하기"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalDeleteConfirmModal;
