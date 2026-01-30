import { useEffect, useMemo, useState } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import { BaseButton } from '@/components/buttons/BaseButton';

function basenameNoExt(filePath: string) {
  const last = filePath.split('/').pop() ?? filePath;
  return last.replace(/\.svg$/i, '');
}

// NOTE: import.meta.glob은 alias(@)를 안정적으로 해석하지 못하는 경우가 있어 /src 경로를 사용합니다.
const colorModules = import.meta.glob('/src/assets/icons/goal/color/*.svg', { eager: true, import: 'default' });
const iconModules = import.meta.glob('/src/assets/icons/goal/icon/*.svg', { eager: true, import: 'default' });

// 스샷 기준 고정 노출 순서
const COLOR_ORDER = [
  'Red',
  'Orange',
  'LightOrange',
  'yellow',
  'LightGreen',
  'Green',
  'Cyan',
  'LightBlue',
  'Blue',
  'Violet',
  'Purple',
  'Pink',
] as const;

const ICON_ORDER = [
  // 스샷의 상단 아이콘 순서(좌→우)
  'Date',
  'Interest',
  'Interest2',
  'Book',
  'Goal',
  'Game',
  'Travle',
  'Meal',
  'Shoping',
  'Home',
  'Saving',
] as const;

function orderIndex(name: string, order: readonly string[]) {
  const idx = order.indexOf(name);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}

const colorOptions = Object.entries(colorModules)
  .map(([path, src]) => ({ id: path, src: src as string, name: basenameNoExt(path) }))
  .sort((a, b) => orderIndex(a.name, COLOR_ORDER) - orderIndex(b.name, COLOR_ORDER));

const iconOptions = Object.entries(iconModules)
  .map(([path, src]) => ({ id: path, src: src as string, name: basenameNoExt(path) }))
  .sort((a, b) => orderIndex(a.name, ICON_ORDER) - orderIndex(b.name, ICON_ORDER));

interface GoalIconPickerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (payload: { colorId: string; iconId: string }) => void;
  initialColorId?: string;
  initialIconId?: string;
}

const GoalIconPickerBottomSheet = ({
  isOpen,
  onClose,
  onConfirm,
  initialColorId,
  initialIconId,
}: GoalIconPickerBottomSheetProps) => {
  const fallbackColorId = useMemo(() => colorOptions[0]?.id ?? '', []);
  const fallbackIconId = useMemo(() => iconOptions[0]?.id ?? '', []);

  const [selectedColorId, setSelectedColorId] = useState<string>(initialColorId ?? fallbackColorId);
  const [selectedIconId, setSelectedIconId] = useState<string>(initialIconId ?? fallbackIconId);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedColorId(initialColorId ?? fallbackColorId);
    setSelectedIconId(initialIconId ?? fallbackIconId);
  }, [fallbackColorId, fallbackIconId, initialColorId, initialIconId, isOpen]);

  const handleConfirm = () => {
    onConfirm?.({ colorId: selectedColorId, iconId: selectedIconId });
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 text-[20px] font-bold text-[#171714]">목표 아이콘 지정</div>

      <div className="mb-4 text-[14px] font-bold text-gray-600">색상</div>
      <div className="flex items-center gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {colorOptions.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedColorId(c.id)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              selectedColorId === c.id ? 'ring-2 ring-primary-normal' : ''
            }`}
          >
            <img src={c.src} alt="color" className="w-11 h-11" />
          </button>
        ))}
      </div>

      <div className="mt-6 mb-4 text-[14px] font-bold text-gray-600">아이콘</div>
      <div className="flex items-center gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {iconOptions.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => setSelectedIconId(i.id)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              selectedIconId === i.id ? 'ring-2 ring-primary-normal' : ''
            }`}
          >
            <img src={i.src} alt="icon" />
          </button>
        ))}
      </div>

      <div className="mt-8">
        <BaseButton
          size="large"
          variant="primary"
          text="확인하기"
          onClick={handleConfirm}
          fullWidth
          typographyStyle="text-body-1-16-semi-bold"
          className="bg-primary-normal"
        />
      </div>
    </BottomSheet>
  );
};

export default GoalIconPickerBottomSheet;

