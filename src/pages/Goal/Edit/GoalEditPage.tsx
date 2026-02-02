import type { ChangeEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import AuthInput from '@/components/login/AuthInput';
import AccountLinkBottomSheet from '@/components/goal/list/AccountLinkBottomSheet';
import GoalCreateStepFooter from '@/components/goal/create/GoalCreateStepFooter';
import { paths } from '@/router/Router';
import { useGoalForm, type SelectedAccount } from '@/hooks/Goal/useGoalForm';

type GoalEditLocationState = {
  goalName?: string;
  startDate?: string;
  endDate?: string;
  goalAmount?: string;
  selectedAccount?: SelectedAccount | null;
};

const GoalEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const state = (location.state as GoalEditLocationState | null) ?? null;

  const initialSelectedAccount: SelectedAccount =
    state?.selectedAccount ?? { id: 'linked', bankName: '국민은행', accountNumber: '592802-04-****25' };

  const {
    goalName,
    startDate,
    endDate,
    goalAmount,
    accountDisplay,
    isAccountSheetOpen,
    openAccountSheet,
    closeAccountSheet,
    updateField,
    handleAccountSelect,
    canSubmit,
    submitButtonText,
    handleSubmit,
  } = useGoalForm({
    mode: 'edit',
    initialValues: {
      goalName: state?.goalName ?? '테야테야유럽갈테야',
      startDate: state?.startDate ?? '25-12-31',
      endDate: state?.endDate ?? '26-01-03',
      goalAmount: state?.goalAmount ?? '',
      selectedAccount: initialSelectedAccount,
    },
    onSubmit: async () => {
      if (!id) {
        navigate(-1);
        return;
      }
      navigate(paths.goal.amountAchieved(id));
    },
    onBack: () => navigate(-1),
  });

  return (
    <>
      <MobileLayout className="max-w-none shadow-none sm:max-w-[360px] sm:shadow-lg p-0 overflow-hidden bg-white">
        <div className="flex flex-col w-full min-h-screen bg-white">
          <BackPageGNB
            title="수정하기"
            text=""
            titleColor="text-neutral-90"
            className="w-full bg-white"
            onBack={() => navigate(-1)}
          />

          <main className="flex-1 flex flex-col px-[20px] pt-[28px] pb-[32px] overflow-y-auto">
            <div className="flex flex-col gap-6">
              <div onClick={openAccountSheet} className="cursor-pointer">
                <AuthInput
                  label="계좌 연동"
                  name="linkedAccount"
                  value={accountDisplay}
                  onChange={() => {}}
                  placeholder="계좌를 선택해주세요"
                  readOnly
                  width="full"
                  className="cursor-pointer"
                />
              </div>

              <AuthInput
                label="목표 금액"
                name="goalAmount"
                value={goalAmount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('goalAmount', e.target.value)}
                placeholder="목표액은 얼마인가요?"
                focusBorderClassName="border-primary-normal"
                width="full"
              />

              <AuthInput
                label="종료일"
                name="endDate"
                value={endDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('endDate', e.target.value)}
                placeholder="YY-MM-DD"
                focusBorderClassName="border-primary-normal"
                width="full"
              />

              <AuthInput
                label="시작일"
                name="startDate"
                value={startDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('startDate', e.target.value)}
                placeholder="YY-MM-DD"
                focusBorderClassName="border-primary-normal"
                width="full"
              />

              <AuthInput
                label="목표 이름"
                name="goalName"
                value={goalName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateField('goalName', e.target.value)}
                placeholder="목표명을 작성 해주세요"
                focusBorderClassName="border-primary-normal"
                width="full"
              />
            </div>
          </main>

          <GoalCreateStepFooter
            isVisible={canSubmit}
            buttonText={submitButtonText || '수정하기'}
            onClick={handleSubmit}
          />
        </div>
      </MobileLayout>

      <AccountLinkBottomSheet
        isOpen={isAccountSheetOpen}
        onClose={closeAccountSheet}
        onSelect={handleAccountSelect}
      />
    </>
  );
};

export default GoalEditPage;
