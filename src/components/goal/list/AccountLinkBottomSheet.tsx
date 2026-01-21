import { useState } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import { BaseButton } from '@/components/buttons/BaseButton';
import { Typography } from '@/components/typography';

interface Account {
  id: string;
  bankName: string;
  accountNumber: string;
}

interface AccountLinkBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (account: Account) => void;
  accounts?: Account[];
}

const AccountLinkBottomSheet = ({
  isOpen,
  onClose,
  onSelect,
  accounts = [
    { id: '1', bankName: '국민은행', accountNumber: '9400803 04-190PGG' },
    { id: '2', bankName: '국민은행', accountNumber: '9400803 04-190PGG' },
    { id: '3', bankName: '국민은행', accountNumber: '9400803 04-190PGG' },
    { id: '4', bankName: '국민은행', accountNumber: '9400803 04-190PGG' },
  ],
}: AccountLinkBottomSheetProps) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleSelect = () => {
    if (selectedAccount) {
      onSelect(selectedAccount);
      setSelectedAccount(null);
      onClose();
    }
  };

  const handleManualAdd = () => {
    console.log('수동 추가하기');
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="연결 계좌 연동">
      <div className="flex items-center justify-between mb-6">
        <div />
        <button
          onClick={handleManualAdd}
          className="flex items-center gap-1 text-sm text-neutral-70"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2.66667V13.3333M2.66667 8H13.3333"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography style="text-body-3-13-regular" fontFamily="pretendard" color="neutral-70">
            수동 추가하기
          </Typography>
        </button>
      </div>

      <div className="mb-6 space-y-3 max-h-[400px] overflow-y-auto">
        {accounts.map((account) => (
          <div
            key={account.id}
            onClick={() => setSelectedAccount(account)}
            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedAccount?.id === account.id
                ? 'border-primary-normal bg-primary-light'
                : 'border-neutral-40 bg-white'
            }`}
          >
            <div className="w-10 h-10 bg-primary-normal rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <Typography
                style="text-body-1-16-medium"
                fontFamily="pretendard"
                className="text-neutral-90"
              >
                {account.bankName}
              </Typography>
              <Typography
                style="text-body-3-13-regular"
                fontFamily="pretendard"
                color="neutral-60"
              >
                {account.accountNumber}
              </Typography>
            </div>
            {selectedAccount?.id === account.id && (
              <div className="w-5 h-5 rounded-full bg-primary-normal flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6L4.5 8.5L10 3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <BaseButton
        size="large"
        variant="primary"
        text="선택하기"
        onClick={handleSelect}
        fullWidth
        disabled={!selectedAccount}
        typographyStyle="text-body-1-16-semi-bold"
        className="bg-primary-normal"
      />
    </BottomSheet>
  );
};

export default AccountLinkBottomSheet;
