import BottomSheet from '@/components/common/BottomSheet';

interface GoalMoreActionsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeIcon?: () => void;
  onEditGoal?: () => void;
  onDeleteGoal?: () => void;
}

const GoalMoreActionsBottomSheet = ({
  isOpen,
  onClose,
  onChangeIcon,
  onEditGoal,
  onDeleteGoal,
}: GoalMoreActionsBottomSheetProps) => {
  const handleClick = (cb?: () => void) => {
    cb?.();
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => handleClick(onChangeIcon)}
          className="w-full flex items-center gap-3 py-4 text-left"
        >
          <span className="w-6 flex justify-center text-gray-500">♡</span>
          <span className="text-[16px] font-medium text-gray-700">아이콘 변경하기</span>
        </button>

        <button
          type="button"
          onClick={() => handleClick(onEditGoal)}
          className="w-full flex items-center gap-3 py-4 text-left"
        >
          <span className="w-6 flex justify-center text-gray-500">✎</span>
          <span className="text-[16px] font-medium text-gray-700">목표 수정하기</span>
        </button>

        <button
          type="button"
          onClick={() => handleClick(onDeleteGoal)}
          className="w-full flex items-center gap-3 py-4 text-left"
        >
          <span className="w-6 flex justify-center text-red-500">🗑</span>
          <span className="text-[16px] font-medium text-red-500">목표 삭제하기</span>
        </button>
      </div>
    </BottomSheet>
  );
};

export default GoalMoreActionsBottomSheet;

