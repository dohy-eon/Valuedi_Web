import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import type {
  GetGoalsParams,
  GoalsResponse,
  CreateGoalRequest,
  CreateGoalResponse,
  GoalDetailResponse,
  LinkAccountRequest,
  LinkAccountResponse,
  UpdateGoalRequest,
  UpdateGoalResponse,
  DeleteGoalResponse,
  GoalLedgersResponse,
  GetGoalLedgersParams,
  GoalUnlinkedAccountsResponse,
} from './goal.types';

const GOALS_PATH_PREFIX = '/api/goals';

interface ApiError extends Error {
  response?: {
    status: number;
    data: unknown;
  };
}

export const goalApi = {
  async getGoals(params?: GetGoalsParams): Promise<GoalsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.status) {
      queryParams.append('status', params.status);
    }
    if (params?.sort) {
      queryParams.append('sort', params.sort);
    }
    if (params?.limit !== undefined) {
      queryParams.append('limit', params.limit.toString());
    }

    const url = `${API_BASE_URL}${GOALS_PATH_PREFIX}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch goals: ${response.statusText}`);
    }

    return response.json();
  },

  // 목표 추가

  async createGoal(data: CreateGoalRequest): Promise<CreateGoalResponse> {
    const url = `${API_BASE_URL}${GOALS_PATH_PREFIX}`;

    console.log('목표 생성 API 요청:', {
      url,
      method: 'POST',
      data,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // 에러 응답 본문 읽기
      let errorData;
      try {
        errorData = await response.json();
        console.error('서버 에러 응답:', errorData);
      } catch {
        errorData = { message: response.statusText };
      }

      const error: ApiError = new Error(`Failed to create goal: ${response.statusText}`);
      error.response = {
        status: response.status,
        data: errorData,
      };
      throw error;
    }

    const result = await response.json();
    console.log('목표 생성 성공:', result);
    return result;
  },

  // 목표 상세 조회

  async getGoalDetail(goalId: number): Promise<GoalDetailResponse> {
    const url = `${API_BASE_URL}${GOALS_PATH_PREFIX}/${goalId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('목표를 찾을 수 없습니다.');
      }
      throw new Error(`Failed to fetch goal detail: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data?.result;
    if (result && typeof result === 'object') {
      if (result.start_date != null && result.startDate == null) result.startDate = result.start_date;
      if (result.end_date != null && result.endDate == null) result.endDate = result.end_date;
    }
    return data;
  },

  // 목표에 연결되지 않은 계좌 목록 조회

  async getGoalUnlinkedAccounts(): Promise<GoalUnlinkedAccountsResponse> {
    const url = `${API_BASE_URL}${GOALS_PATH_PREFIX}/accounts`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      const error: ApiError = new Error(`Failed to fetch goal unlinked accounts: ${response.statusText}`);
      error.response = { status: response.status, data: errorData };
      throw error;
    }

    return response.json();
  },

  // 목표-계좌 연결

  async linkAccount(goalId: number, data: LinkAccountRequest): Promise<LinkAccountResponse> {
    const url = `${API_BASE_URL}${GOALS_PATH_PREFIX}/${goalId}/linked-accounts`;

    console.log('목표-계좌 연결 API 요청:', {
      url,
      method: 'PUT',
      goalId,
      data,
    });

    const response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // 에러 응답 본문 읽기
      let errorData;
      try {
        errorData = await response.json();
        console.error('서버 에러 응답:', errorData);
      } catch {
        errorData = { message: response.statusText };
      }

      const error: ApiError = new Error(`Failed to link account: ${response.statusText}`);
      error.response = {
        status: response.status,
        data: errorData,
      };
      throw error;
    }

    const result = await response.json();
    console.log('계좌 연결 성공:', result);
    return result;
  },

  // 목표 수정
  async updateGoal(goalId: number, data: UpdateGoalRequest): Promise<UpdateGoalResponse> {
    const url = `${API_BASE_URL}${GOALS_PATH_PREFIX}/${goalId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorData: { message?: string; code?: string; result?: unknown };
      try {
        errorData = await response.json();
        if (response.status === 400) {
          console.error('목표 수정 400 에러 응답:', errorData);
          if (errorData?.result && typeof errorData.result === 'object') {
            console.error('검증 상세(result):', errorData.result);
          }
        }
      } catch {
        errorData = { message: response.statusText };
      }
      const message =
        typeof errorData?.message === 'string' ? errorData.message : `Failed to update goal: ${response.statusText}`;
      const err: ApiError = new Error(message);
      err.response = { status: response.status, data: errorData };
      throw err;
    }
    return response.json();
  },

  // 목표 삭제

  async deleteGoal(goalId: number): Promise<DeleteGoalResponse> {
    const url = `${API_BASE_URL}${GOALS_PATH_PREFIX}/${goalId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      const err: ApiError = new Error(`Failed to delete goal: ${response.statusText}`);
      err.response = { status: response.status, data: errorData };
      throw err;
    }
    return response.json();
  },

  // 목표 거래내역 조회

  async getGoalLedgers(goalId: number, params?: GetGoalLedgersParams): Promise<GoalLedgersResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page !== undefined) queryParams.append('page', params.page.toString());
    if (params?.size !== undefined) queryParams.append('size', params.size.toString());

    const url = `${API_BASE_URL}${GOALS_PATH_PREFIX}/${goalId}/ledgers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch goal ledgers: ${response.statusText}`);
    }
    return response.json();
  },
};

/** 목표 상세 조회 (HomePage 등에서 직접 호출용) */
export const getGoalDetailApi = (goalId: number) => goalApi.getGoalDetail(goalId);
