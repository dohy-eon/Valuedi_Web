/**
 * 자산 관련 API 함수들
 */

import { apiGet, ApiResponse } from '@/utils/api';

// ========== 타입 정의 ==========

export interface Account {
  accountId: number;
  accountName: string;
  balanceAmount: number;
  organization: string;
  createdAt: string;
  goalInfo: {
    goalId: number;
    title: string;
  } | null;
}

export interface AccountListResponse {
  accountList: Account[];
  totalCount: number;
}

// ========== API 함수들 ==========

/**
 * 전체 계좌 목록 조회
 * GET /api/assets/accounts
 */
export const getAccountsApi = async (): Promise<ApiResponse<AccountListResponse>> => {
  return apiGet<AccountListResponse>('/api/assets/accounts');
};
