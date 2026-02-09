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

/** 홈 등에서 사용하는 계좌 타입 (목표 연동 정보 포함) */
export interface Account {
  accountId: number;
  accountName: string;
  balanceAmount: number;
  connectedGoalId: number | null;
  goalInfo: { goalId: number; title: string } | null;
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

// ========== 자산 요약 및 목록 조회 타입 ==========

// 자산 요약 정보
export interface AssetSummary {
  totalAccountCount: number; // 연동된 계좌 개수
  totalCardCount: number; // 연동된 카드 개수
  totalBalance?: number; // 총 잔액 (선택적)
}

// API 응답 - 자산 요약
export interface AssetSummaryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: AssetSummary;
}

// 계좌 상세 정보 (전체 계좌 목록 조회용)
export interface AccountDetail {
  accountId: number;
  accountName: string;
  accountNumber?: string;
  balanceAmount: number;
  bankCode: string;
  bankName: string;
  connectedGoalId: number | null;
  status?: string; // ACTIVE, INACTIVE 등
}

// API 응답 - 전체 계좌 목록
export interface AccountsListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: AccountDetail[];
}

// 카드 상세 정보 (전체 카드 목록 조회용)
export interface CardDetail {
  cardId: number;
  cardName: string;
  cardNumber?: string;
  issuerCode: string;
  issuerName: string;
  status?: string; // ACTIVE, INACTIVE 등
}

// API 응답 - 전체 카드 목록
export interface CardsListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: CardDetail[];
}

// 카드사별 카드 상세 정보
export interface CardIssuerCardDetail {
  cardId: number;
  cardName: string;
  cardNumber?: string;
  status?: string; // ACTIVE, INACTIVE 등
}

// API 응답 - 카드사별 카드 목록
export interface CardIssuerCardsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    issuerName: string;
    totalCardCount: number;
    cardList: CardIssuerCardDetail[];
  };
}
