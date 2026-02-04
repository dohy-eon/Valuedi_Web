import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type GoalStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type GoalFormMode = 'create' | 'edit';

export interface SelectedAccount {
  id: string;
  bankName: string;
  accountNumber: string;
}

export interface SelectedIcon {
  colorId: string;
  iconId: string;
}

export type GoalFormField = 'goalName' | 'startDate' | 'endDate' | 'goalAmount';

export interface UseGoalFormOptions {
  mode?: GoalFormMode;
  initialValues?: Partial<Record<GoalFormField, string>> & { selectedAccount?: SelectedAccount | null };
  onSubmit?: (payload: {
    goalName: string;
    startDate: string;
    endDate: string;
    goalAmount: string;
    selectedAccount: SelectedAccount | null;
  }) => void | Promise<void>;
  onBack?: () => void;
}

export function useGoalForm(options: UseGoalFormOptions = {}) {
  const navigate = useNavigate();
  const mode = options.mode ?? 'create';
  const isEdit = mode === 'edit';

  const [currentStep, setCurrentStep] = useState<GoalStep>(1);
  const [goalName, setGoalName] = useState(options.initialValues?.goalName ?? '');
  const [startDate, setStartDate] = useState(options.initialValues?.startDate ?? '');
  const [endDate, setEndDate] = useState(options.initialValues?.endDate ?? '');
  const [goalAmount, setGoalAmount] = useState(options.initialValues?.goalAmount ?? '');
  const [selectedAccount, setSelectedAccount] = useState<SelectedAccount | null>(options.initialValues?.selectedAccount ?? null);
  const [selectedIcon, setSelectedIcon] = useState<SelectedIcon | null>(null);

  const [isAccountSheetOpen, setIsAccountSheetOpen] = useState(false);
  const [isIconSheetOpen, setIsIconSheetOpen] = useState(false);
  const [hasInputStarted, setHasInputStarted] = useState(false);

  const accountDisplay = useMemo(() => {
    if (!selectedAccount) return '';
    return `${selectedAccount.bankName} | ${selectedAccount.accountNumber}`;
  }, [selectedAccount]);

  const openAccountSheet = useCallback(() => setIsAccountSheetOpen(true), []);
  const closeAccountSheet = useCallback(() => setIsAccountSheetOpen(false), []);
  
  const openIconSheet = useCallback(() => setIsIconSheetOpen(true), []);
  const closeIconSheet = useCallback(() => setIsIconSheetOpen(false), []);

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
    if (options.onBack) {
      options.onBack();
      return;
    }
    if (isEdit) {
      navigate(-1);
      return;
    }
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as GoalStep);
      setHasInputStarted(false);
      return;
    }
    navigate('/goal/create');
  }, [currentStep, isEdit, navigate, options]);

  const handleAccountSelect = useCallback(
    (account: SelectedAccount) => {
      setSelectedAccount(account);
      setHasInputStarted(false);
      if (!isEdit) setCurrentStep(6);
    },
    [isEdit]
  );

  const handleIconSelect = useCallback((icon: SelectedIcon) => {
    setSelectedIcon(icon);
    closeIconSheet();
  }, [closeIconSheet]);

  const handleNext = useCallback(() => {
    if (isEdit) return;
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as GoalStep);
      setHasInputStarted(false);
      return;
    }

    if (currentStep === 5) {
      openAccountSheet();
      return;
    }

    if (currentStep === 6) {
      setCurrentStep(7);
      setHasInputStarted(false);
      return;
    }

    navigate('/goal/create/complete');
  }, [currentStep, isEdit, navigate, openAccountSheet]);

  const primaryButtonText = useMemo(() => {
    if (currentStep === 6) return '다음으로';
    if (currentStep === 7) return '추가하기';
    return '다음으로';
  }, [currentStep]);

  const shouldShowPrimaryButton = useMemo(() => {
    if (currentStep === 5) return false;
    if (currentStep === 6) return selectedAccount !== null && goalAmount.length > 0;
    if (currentStep === 7) return selectedIcon !== null;

    const currentValue =
      currentStep === 1 ? goalName : currentStep === 2 ? startDate : currentStep === 3 ? endDate : goalAmount;

    return hasInputStarted && currentValue.length > 0;
  }, [currentStep, endDate, goalAmount, goalName, hasInputStarted, selectedAccount, selectedIcon, startDate]);

  const canSubmit = useMemo(() => {
    if (!isEdit) return false;
    return (
      goalName.trim().length > 0 &&
      startDate.trim().length > 0 &&
      endDate.trim().length > 0 &&
      goalAmount.trim().length > 0 &&
      selectedAccount !== null
    );
  }, [endDate, goalAmount, goalName, isEdit, selectedAccount, startDate]);

  const submitButtonText = useMemo(() => (isEdit ? '수정하기' : ''), [isEdit]);

  const handleSubmit = useCallback(async () => {
    await options.onSubmit?.({ goalName, startDate, endDate, goalAmount, selectedAccount });
  }, [endDate, goalAmount, goalName, options, selectedAccount, startDate]);

  return {
    currentStep,
    setCurrentStep,
    goalName,
    startDate,
    endDate,
    goalAmount,
    selectedAccount,
    selectedIcon,
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
    canSubmit,
    submitButtonText,
    handleSubmit,
  };
}

