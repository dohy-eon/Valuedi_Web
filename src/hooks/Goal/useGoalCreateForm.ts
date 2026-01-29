import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type GoalStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface SelectedAccount {
  id: string;
  bankName: string;
  accountNumber: string;
}

export type GoalFormField = 'goalName' | 'startDate' | 'endDate' | 'goalAmount';

export function useGoalForm() {
  const navigate = useNavigate();

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

  const handleNext = useCallback(() => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as GoalStep);
      setHasInputStarted(false);
      return;
    }

    if (currentStep === 5) {
      openAccountSheet();
      return;
    }

    // step 6
    navigate('/goal/create/complete');
  }, [currentStep, navigate, openAccountSheet]);

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
