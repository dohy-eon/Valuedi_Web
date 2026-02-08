// 연동된 은행 정보
export interface ConnectedBank {
  id: number;
  organizationCode: string;
  organizationName: string;
  connectedAt: string;
  status: string;
}

// API 응답 - 연동된 은행 목록
export interface ConnectedBanksResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ConnectedBank[];
}

// 은행별 계좌 정보
export interface BankAccountItem {
  accountId: number;
  accountName: string;
  balanceAmount: number;
  connectedGoalId: number | null;
}

// 은행별 목표 정보
export interface BankGoalItem {
  goalId: number;
  title: string;
  linkedAccountId: number;
}

// API 응답 - 은행별 계좌 및 목표 목록
export interface BankAccountsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    bankName: string;
    totalBalance: number;
    accountList: BankAccountItem[];
    goalList: BankGoalItem[];
  };
}
