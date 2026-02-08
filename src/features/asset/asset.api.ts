import type { ConnectedBanksResponse, BankAccountsResponse } from './asset.types';

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
