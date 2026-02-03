import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import AuthInput from '@/components/login/AuthInput';
import AccountLinkBottomSheet from '@/components/goal/list/AccountLinkBottomSheet';
import GoalIconPickerBottomSheet from '@/components/goal/detail/GoalIconPickerBottomSheet';
import GoalCreateStepHeader from '../../../components/goal/create/GoalCreateStepHeader';
import GoalCreateStepFooter from '../../../components/goal/create/GoalCreateStepFooter';
import { useGoalForm, type GoalStep, type GoalFormField } from '../../../hooks/Goal/useGoalCreateForm';

type StepField =
  | {
      kind: 'input';
      field: GoalFormField;
      label: string;
      placeholder?: string;
      readOnly?: boolean;
      isGrayBg?: boolean;
      clickable?: boolean;
    }
  | {
      kind: 'account';
      label: string;
      placeholder: string;
      readOnly?: boolean;
      isGrayBg?: boolean;
    }
  | {
      kind: 'icon';
      title: string;
      subtitle: string;
    };

const GoalCreateStep = () => {
  const {
    currentStep,
    goalName,
    startDate,
    endDate,
    goalAmount,
    accountDisplay,
    isAccountSheetOpen,
    isIconSheetOpen,
    openAccountSheet,
    closeAccountSheet,
    openIconSheet,
    closeIconSheet,
    updateField,
    handleBack,
    handleNext,
    handleAccountSelect,
    handleIconSelect,
    shouldShowPrimaryButton,
    primaryButtonText,
  } = useGoalForm();

  useEffect(() => {
    if (currentStep === 7) {
      openIconSheet();
    }
  }, [currentStep, openIconSheet]);

  const steps: Record<GoalStep, StepField[]> = {
    1: [
      {
        kind: 'input',
        field: 'goalName',
        label: '목표 이름',
        placeholder: '목표명을 작성 해주세요',
      },
    ],
    2: [
      { kind: 'input', field: 'startDate', label: '시작일', placeholder: 'YY-MM-DD' },
      { kind: 'input', field: 'goalName', label: '목표 이름', readOnly: true, isGrayBg: true },
    ],
    3: [
      { kind: 'input', field: 'endDate', label: '종료일', placeholder: 'YY-MM-DD' },
      { kind: 'input', field: 'startDate', label: '시작일', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'goalName', label: '목표 이름', readOnly: true, isGrayBg: true },
    ],
    4: [
      { kind: 'input', field: 'goalAmount', label: '목표 금액', placeholder: '목표액은 얼마인가요?' },
      { kind: 'input', field: 'endDate', label: '종료일', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'startDate', label: '시작일', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'goalName', label: '목표 이름', readOnly: true, isGrayBg: true },
    ],
    5: [
      { kind: 'account', label: '계좌 연동', placeholder: '계좌를 선택해주세요' },
      { kind: 'input', field: 'goalAmount', label: '목표 금액', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'endDate', label: '종료일', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'startDate', label: '시작일', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'goalName', label: '목표 이름', readOnly: true, isGrayBg: true },
    ],
    6: [
      { kind: 'account', label: '계좌 연동', placeholder: '계좌를 선택해주세요', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'goalAmount', label: '목표 금액', placeholder: '목표액은 얼마인가요?' },
      { kind: 'input', field: 'endDate', label: '종료일', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'startDate', label: '시작일', readOnly: true, isGrayBg: true },
      { kind: 'input', field: 'goalName', label: '목표 이름', readOnly: true, isGrayBg: true },
    ],
    7: [
      { kind: 'icon', title: '거의 다 왔어요!', subtitle: '마지막으로 목표의 대표 이미지를 선택해 주세요' },
    ],
  };

  const valuesByField: Record<GoalFormField, string> = {
    goalName,
    startDate,
    endDate,
    goalAmount,
  };

  return (
    <>
      <MobileLayout className="max-w-none shadow-none sm:max-w-[360px] sm:shadow-lg p-0 overflow-hidden bg-white">
        <div className="flex flex-col w-full min-h-screen">
          <GoalCreateStepHeader currentStep={currentStep} onBack={handleBack} />

          <main className="flex-1 flex flex-col px-[20px] pt-[40px] pb-[32px] overflow-y-auto">
            <div className="flex flex-col gap-6">
              {steps[currentStep].map((item, idx) => {
                if (item.kind === 'icon') {
                  return (
                    <div key="icon-step" className="flex flex-col">
                      <h2 className="text-[24px] font-bold text-gray-900 mb-2">{item.title}</h2>
                      <p className="text-[14px] text-gray-600">{item.subtitle}</p>
                    </div>
                  );
                }

                if (item.kind === 'account') {
                  const value = accountDisplay;
                  const readOnly = item.readOnly ?? true;
                  const isGrayBg = item.isGrayBg ?? false;

                  return (
                    <div key={`account-${idx}`} onClick={openAccountSheet} className="cursor-pointer">
                      <AuthInput
                        label={item.label}
                        name="linkedAccount"
                        value={value}
                        onChange={() => {}}
                        placeholder={item.placeholder}
                        readOnly={readOnly}
                        isGrayBg={isGrayBg}
                        width="full"
                        className="cursor-pointer"
                      />
                    </div>
                  );
                }

                const value = valuesByField[item.field];
                const readOnly = item.readOnly ?? false;
                const placeholder = item.placeholder;

                return (
                  <AuthInput
                    key={`${item.field}-${idx}`}
                    label={item.label}
                    name={item.field}
                    value={value}
                    onChange={
                      readOnly
                        ? () => {}
                        : (e: ChangeEvent<HTMLInputElement>) => updateField(item.field, e.target.value)
                    }
                    placeholder={placeholder}https://github.com/Valuedi/Valuedi_Web/pull/44/conflict?name=src%252Fpages%252FGoal%252FCreate%252FGoalCreateStep.tsx&ancestor_oid=a8642a785bde780d2b155c14ee383bf8cd400d72&base_oid=eaace40370b3b35dc647542c9f1b7694d8cf24ff&head_oid=ee67ba1934ea6709374713c55c9897b77778c6d8
                    readOnly={readOnly}
                    isGrayBg={item.isGrayBg}
                    width="full"
                  />
                );
              })}
            </div>
          </main>

          <GoalCreateStepFooter
            isVisible={shouldShowPrimaryButton}
            buttonText={primaryButtonText}
            onClick={handleNext}
          />
        </div>
      </MobileLayout>

      <AccountLinkBottomSheet isOpen={isAccountSheetOpen} onClose={closeAccountSheet} onSelect={handleAccountSelect} />
      <GoalIconPickerBottomSheet isOpen={isIconSheetOpen} onClose={closeIconSheet} onConfirm={handleIconSelect} />
    </>
  );
};

export default GoalCreateStep;
