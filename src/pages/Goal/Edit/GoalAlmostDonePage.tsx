import { MobileLayout } from '@/components/layout/MobileLayout';
import { BaseButton } from '@/components/buttons/BaseButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '@/router/paths';
import GoalIconPickerBottomSheet, { ICON_ORDER } from '@/components/goal/detail/GoalIconPickerBottomSheet';
import { useState } from 'react';
import { useCreateGoal } from '@/features/goal/goal.hooks';
import type { CreateGoalRequest } from '@/features/goal/goal.types';
import type { SelectedAccount } from '@/hooks/Goal/useGoalForm';

interface GoalFormData {
  goalName: string;
  startDate: string;
  endDate: string;
  goalAmount: string;
  selectedAccount: SelectedAccount | null;
}

function basenameNoExt(filePath: string) {
  const last = filePath.split('/').pop() ?? filePath;
  return last.replace(/\.svg$/i, '');
}

function formatDate(dateStr: string) {
  // Assuming format is YY-MM-DD, convert to YYYY-MM-DD
  if (/^\d{2}-\d{2}-\d{2}$/.test(dateStr)) {
    return `20${dateStr}`;
  }
  return dateStr;
}

const GoalAlmostDonePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  const goalFormData = location.state as GoalFormData;
  const { mutate: createGoal, isPending, isError, error } = useCreateGoal();

  if (!goalFormData) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-5">
          <h1 className="text-2xl font-bold text-red-500 mb-4">잘못된 접근</h1>
          <p className="text-base text-gray-600 mb-8 text-center">
            목표 정보를 찾을 수 없습니다. 다시 시도해주세요.
          </p>
          <BaseButton
            size="large"
            variant="primary"
            text="목표 생성으로 돌아가기"
            onClick={() => navigate(paths.goal.create)}
            fullWidth
            typographyStyle="text-body-1-16-semi-bold"
            className="bg-primary-normal"
          />
        </div>
      </MobileLayout>
    );
  }

  const handleOpenIconPicker = () => {
    // Only open if not pending (i.e., not already creating a goal)
    if (!isPending) {
      setIsIconPickerOpen(true);
    }
  };

  const handleIconPickerClose = () => {
    setIsIconPickerOpen(false);
  };

  const handleIconPickerConfirm = (payload: { colorId: string; iconId: string }) => {
    if (!goalFormData.selectedAccount) {
      console.error('Account not selected, cannot create goal.');
      return;
    }

    const { goalName, startDate, endDate, goalAmount, selectedAccount } = goalFormData;

    const iconName = basenameNoExt(payload.iconId);
    const iconIdNumber = ICON_ORDER.indexOf(iconName as any);

    if (iconIdNumber === -1) {
      console.error('Invalid icon selected:', iconName);
      return;
    }

    const newGoal: CreateGoalRequest = {
      title: goalName,
      targetAmount: Number(goalAmount.replace(/,/g, '')), // Remove commas for safety
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      bankAccountId: Number(selectedAccount.id), // Use the numeric ID
      colorCode: basenameNoExt(payload.colorId), // Use the color name
      iconId: iconIdNumber + 1, // API likely wants 1-based index
    };

    createGoal(newGoal, {
      onSuccess: (data) => {
        setIsIconPickerOpen(false);
        // Navigate to completion page, passing the new goal's name and details
        navigate(paths.goal.createComplete, { 
          state: { 
            goalId: data.result.goalId,
            goalName: data.result.title,
            targetAmount: data.result.targetAmount,
            endDate: data.result.endDate,
          } 
        });
      },
      onError: (err) => {
        console.error('Goal creation failed:', err);
      },
    });
  };

  return (
    <MobileLayout>
      <div
        className="flex flex-col items-center justify-center min-h-screen p-5"
        onClick={isPending ? undefined : handleOpenIconPicker} // Disable click when pending
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">거의 다 왔어요!</h1>
        <p className="text-base text-gray-600 mb-8 text-center">
          이제 목표 아이콘을 지정하고<br/> 목표 추가를 완료할 수 있습니다.
        </p>
        {isPending && <p className="text-blue-500 mb-4">목표를 생성 중입니다...</p>}
        {isError && <p className="text-red-500 mb-4">목표 생성 실패: {error?.message}</p>}
      </div>
      <GoalIconPickerBottomSheet
        isOpen={isIconPickerOpen}
        onClose={handleIconPickerClose}
        onConfirm={handleIconPickerConfirm}
      />
    </MobileLayout>
  );
};

export default GoalAlmostDonePage;
