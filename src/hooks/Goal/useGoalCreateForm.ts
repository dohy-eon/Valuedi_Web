import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateGoal, useLinkAccount } from '@/features/goal';

export type GoalStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface SelectedAccount {
  id: string;
  bankName: string;
  accountNumber: string;
}

export type GoalFormField = 'goalName' | 'startDate' | 'endDate' | 'goalAmount';

export function useGoalForm() {
  const navigate = useNavigate();
  const createGoalMutation = useCreateGoal();
  const linkAccountMutation = useLinkAccount();

  const [currentStep, setCurrentStep] = useState<GoalStep>(1);
  const [goalName, setGoalName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<SelectedAccount | null>(null);

  const [isAccountSheetOpen, setIsAccountSheetOpen] = useState(false);
  const [hasInputStarted, setHasInputStarted] = useState(false);

  const accountDisplay = useMemo(() => {
    if (!selectedAccount) return '';
    return `${selectedAccount.bankName} | ${selectedAccount.accountNumber}`;
  }, [selectedAccount]);

  const openAccountSheet = useCallback(() => setIsAccountSheetOpen(true), []);
  const closeAccountSheet = useCallback(() => setIsAccountSheetOpen(false), []);

  const markInputStarted = useCallback(
    (nextValue: string) => {
      if (!hasInputStarted && nextValue.length > 0) setHasInputStarted(true);
    },
    [hasInputStarted]
  );

  const updateField = useCallback(
    (field: GoalFormField, value: string) => {
      switch (field) {
        case 'goalName':
          setGoalName(value);
          break;
        case 'startDate':
          setStartDate(value);
          break;
        case 'endDate':
          setEndDate(value);
          break;
        case 'goalAmount':
          setGoalAmount(value);
          break;
        default:
          break;
      }
      markInputStarted(value);
    },
    [markInputStarted]
  );

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as GoalStep);
      setHasInputStarted(false);
      return;
    }
    navigate('/goal/create');
  }, [currentStep, navigate]);

  const handleAccountSelect = useCallback((account: SelectedAccount) => {
    setSelectedAccount(account);
    setCurrentStep(6);
    setHasInputStarted(false);
  }, []);

  const handleNext = useCallback(async () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as GoalStep);
      setHasInputStarted(false);
      return;
    }

    if (currentStep === 5) {
      openAccountSheet();
      return;
    }

    // step 6 - API 호출
    if (currentStep === 6 && selectedAccount) {
      try {
        // 데이터 검증 및 변환
        const targetAmountValue = Number(goalAmount.replace(/[^0-9]/g, ''));
        const bankAccountIdValue = Number(selectedAccount.id);

        if (isNaN(targetAmountValue) || targetAmountValue <= 0) {
          alert('올바른 목표 금액을 입력해주세요.');
          return;
        }

        if (isNaN(bankAccountIdValue) || bankAccountIdValue <= 0) {
          alert('올바른 계좌를 선택해주세요.');
          return;
        }

        // 날짜 형식 변환 (YY-MM-DD → YYYY-MM-DD)
        const formatDate = (date: string) => {
          // 이미 YYYY-MM-DD 형식이면 그대로 반환
          if (date.length === 10 && date.split('-')[0].length === 4) {
            return date;
          }
          // YY-MM-DD 형식이면 YYYY-MM-DD로 변환
          const [year, month, day] = date.split('-');
          const fullYear = year.length === 2 ? `20${year}` : year;
          return `${fullYear}-${month}-${day}`;
        };

        // API 요청 데이터
        const requestData = {
          bankAccountId: bankAccountIdValue,
          title: goalName.trim(),
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          targetAmount: targetAmountValue,
          colorCode: 'FF6363',
          iconId: 1,
        };

        console.log('목표 생성 요청 데이터:', requestData);

        // 1단계: 목표 생성
        const createResult = await createGoalMutation.mutateAsync(requestData);
        console.log('목표 생성 성공:', createResult);

        // 2단계: 계좌 연결 (목표 생성 응답에서 goalId 가져오기)
        const createdGoalId = createResult.result.goalId;
        console.log('계좌 연결 시도 - goalId:', createdGoalId, 'accountId:', bankAccountIdValue);

        await linkAccountMutation.mutateAsync({
          goalId: createdGoalId,
          data: { accountId: bankAccountIdValue },
        });
        console.log('계좌 연결 성공');

        navigate('/goal/create/complete');
      } catch (error) {
        console.error('목표 생성 실패:', error);

        // 에러 응답 상세 로그
        if (error && typeof error === 'object' && 'response' in error) {
          const errorWithResponse = error as { response?: { status?: number; data?: { message?: string } } };
          if (errorWithResponse.response) {
            console.error('서버 응답 상태:', errorWithResponse.response.status);
            console.error('서버 응답 데이터:', errorWithResponse.response.data);
          }
          const errorMessage =
            errorWithResponse.response?.data?.message || '목표 생성에 실패했습니다. 다시 시도해주세요.';
          alert(errorMessage);
        } else {
          alert('목표 생성에 실패했습니다. 다시 시도해주세요.');
        }
      }
    }
  }, [
    currentStep,
    navigate,
    openAccountSheet,
    createGoalMutation,
    linkAccountMutation,
    selectedAccount,
    goalName,
    startDate,
    endDate,
    goalAmount,
  ]);

  const primaryButtonText = useMemo(() => (currentStep === 6 ? '추가하기' : '다음으로'), [currentStep]);

  const shouldShowPrimaryButton = useMemo(() => {
    // step 5는 버튼 대신 '계좌 연동' 필드를 눌러 바텀시트를 여는 UX로 처리
    if (currentStep === 5) return false;
    if (currentStep === 6) return selectedAccount !== null && goalAmount.length > 0;

    const currentValue =
      currentStep === 1 ? goalName : currentStep === 2 ? startDate : currentStep === 3 ? endDate : goalAmount;

    return hasInputStarted && currentValue.length > 0;
  }, [currentStep, endDate, goalAmount, goalName, hasInputStarted, selectedAccount, startDate]);

  return {
    // step
    currentStep,
    setCurrentStep,

    // form values
    goalName,
    startDate,
    endDate,
    goalAmount,
    selectedAccount,
    accountDisplay,

    // bottom sheet
    isAccountSheetOpen,
    openAccountSheet,
    closeAccountSheet,

    // actions
    updateField,
    handleBack,
    handleNext,
    handleAccountSelect,

    // footer
    shouldShowPrimaryButton,
    primaryButtonText,
  };
}
