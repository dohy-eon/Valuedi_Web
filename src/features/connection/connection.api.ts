/**
 * 금융 연동 관련 API 함수들
 */

import { apiGet, apiPost, apiDelete, ApiResponse, ApiError } from '@/utils/api';

// ApiError를 re-export하여 features/connection에서 사용할 수 있도록 함
export { ApiError };

// ========== 타입 정의 ==========

export interface Connection {
  connectionId: number;
  organizationCode: string; // API 응답 필드명
  organizationName?: string; // API 응답 필드명 (선택적)
  businessType: 'BK' | 'CD'; // API 응답 필드명 (BK: 은행, CD: 카드)
  connectedAt: string;
  // 하위 호환성을 위한 별칭
  organization?: string; // organizationCode의 별칭
  type?: 'BK' | 'CD'; // businessType의 별칭
}

export interface ConnectionListResponse {
  connections: Connection[];
}

export interface CreateConnectionRequest {
  organization: string; // 금융사 코드 (예: "0020", "0309")
  businessType: 'BK' | 'CD'; // BK: 은행, CD: 카드
  loginId: string;
  loginPassword: string;
  countryCode?: string; // 기본값: "KR"
  clientType?: string; // 기본값: "P"
  loginType?: string; // 기본값: "1"
}

// ========== API 함수들 ==========

/**
 * 모든 연동 목록 조회
 * GET /api/connections
 */
export const getConnectionsApi = async (): Promise<ApiResponse<Connection[]>> => {
  return apiGet<Connection[]>('/api/connections');
};

/**
 * 금융사 계정 연동
 * POST /api/connections
 */
export const createConnectionApi = async (
  data: CreateConnectionRequest
): Promise<ApiResponse<null>> => {
  // 기본값 설정
  const requestData: CreateConnectionRequest = {
    ...data,
    countryCode: data.countryCode || 'KR',
    clientType: data.clientType || 'P',
    loginType: data.loginType || '1',
  };

  return apiPost<null>('/api/connections', requestData);
};

/**
 * 금융사 연동 해제
 * DELETE /api/connections/{connectionId}
 */
export const deleteConnectionApi = async (connectionId: number): Promise<ApiResponse<null>> => {
  return apiDelete<null>(`/api/connections/${connectionId}`);
};
