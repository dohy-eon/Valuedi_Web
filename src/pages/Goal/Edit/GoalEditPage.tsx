import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import AuthInput from '@/components/login/AuthInput';
import AccountLinkBottomSheet from '@/components/goal/list/AccountLinkBottomSheet';
import GoalCreateStepFooter from '@/pages/Goal/Create/components/GoalCreateStepFooter';
import { paths } from '@/router/Router';

type SelectedAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
};

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

  const [goalName, setGoalName] = useState(state?.goalName ?? '테야테야유럽갈테야');
  const [startDate, setStartDate] = useState(state?.startDate ?? '25-12-31');
  const [endDate, setEndDate] = useState(state?.endDate ?? '26-01-03');
  const [goalAmount, setGoalAmount] = useState(state?.goalAmount ?? '');
  const [selectedAccount, setSelectedAccount] = useState<SelectedAccount | null>(state?.selectedAccount ?? null);

  const [isAccountSheetOpen, setIsAccountSheetOpen] = useState(false);

  const accountDisplay = useMemo(() => {
    if (!selectedAccount) return '국민은행 | 592802-04-****25';
    return `${selectedAccount.bankName} | ${selectedAccount.accountNumber}`;
  }, [selectedAccount]);

  const canSubmit = Boolean(goalName && startDate && endDate && goalAmount && accountDisplay);

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
              <div onClick={() => setIsAccountSheetOpen(true)} className="cursor-pointer">
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
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="목표액은 얼마인가요?"
                width="full"
              />

              <AuthInput
                label="종료일"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="YY-MM-DD"
                width="full"
              />

              <AuthInput
                label="시작일"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="YY-MM-DD"
                width="full"
              />

              <AuthInput
                label="목표 이름"
                name="goalName"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="목표명을 작성 해주세요"
                width="full"
              />
            </div>
          </main>

          <GoalCreateStepFooter
            isVisible={canSubmit}
            buttonText="수정하기"
            onClick={() => {
              if (!id) {
                navigate(-1);
                return;
              }
              navigate(paths.goal.amountAchieved(id));
            }}
          />
        </div>
      </MobileLayout>

      <AccountLinkBottomSheet
        isOpen={isAccountSheetOpen}
        onClose={() => setIsAccountSheetOpen(false)}
        onSelect={(account) => setSelectedAccount(account)}
      />
    </>
  );
};

export default GoalEditPage;

