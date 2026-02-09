import type { ConnectedBanksResponse, BankAccountsResponse, Account } from './asset.types';

export type { Account };

const API_BASE_URL = 'https://api.valuedi.site';

// 인증 헤더 생성 함수
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const assetApi = {
  /**
   * 연동된 은행 목록 조회
   */
  async getConnectedBanks(): Promise<ConnectedBanksResponse> {
    const url = `${API_BASE_URL}/api/assets/banks`;

    console.log('연동된 은행 목록 조회 API 요청:', { url });

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('서버 에러 응답:', errorData);
      } catch {
        errorData = { message: response.statusText };
      }

      const error = new Error(`Failed to fetch connected banks: ${response.statusText}`) as Error & {
        response?: { status: number; data: typeof errorData };
      };
      error.response = {
        status: response.status,
        data: errorData,
      };
      throw error;
    }

    const result = await response.json();
    console.log('연동된 은행 목록 조회 성공:', result);
    return result;
  },

  /**
   * 은행별 계좌 및 목표 목록 조회
   */
  async getBankAccounts(bankCode: string): Promise<BankAccountsResponse> {
    const url = `${API_BASE_URL}/api/assets/banks/${encodeURIComponent(bankCode)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('서버 에러 응답:', errorData);
      } catch {
        errorData = { message: response.statusText };
      }

      const error = new Error(`Failed to fetch bank accounts: ${response.statusText}`) as Error & {
        response?: { status: number; data: typeof errorData };
      };
      error.response = {
        status: response.status,
        data: errorData,
      };
      throw error;
    }

    const result = await response.json();
    return result;
  },
};

/** 연동 은행 목록 + 은행별 계좌를 합쳐 accountList, totalCount 형태로 반환 (홈 등에서 사용) */
export interface GetAccountsApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    accountList: Account[];
    totalCount: number;
  };
}

export async function getAccountsApi(): Promise<GetAccountsApiResponse> {
  const banksRes = await assetApi.getConnectedBanks();
  const banks = banksRes?.result?.filter((b) => b.status === 'ACTIVE') ?? [];
  const accountList: Account[] = [];

  for (const bank of banks) {
    try {
      const res = await assetApi.getBankAccounts(bank.organizationCode);
      if (!res?.result) continue;
      const { accountList: list, goalList } = res.result;
      list.forEach((acc) => {
        const goal = goalList?.find((g) => g.linkedAccountId === acc.accountId);
        accountList.push({
          accountId: acc.accountId,
          accountName: acc.accountName,
          balanceAmount: acc.balanceAmount,
          connectedGoalId: acc.connectedGoalId,
          goalInfo: goal ? { goalId: goal.goalId, title: goal.title } : null,
        });
      });
    } catch {
      // 은행별 조회 실패 시 해당 은행만 스킵
    }
  }

  return {
    isSuccess: true,
    code: 'OK',
    message: '',
    result: {
      accountList,
      totalCount: accountList.length,
    },
  };
}
