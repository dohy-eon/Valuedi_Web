/**
 * 금융 MBTI 관련 API 함수들
 */

import { apiGet, ApiResponse } from '@/utils/api';

// ========== 타입 정의 ==========

export interface FinanceMbtiResult {
  testId: number;
  memberId: number;
  resultType: string;
  anxietyScore: number;
  stabilityScore: number;
  impulseScore: number;
  planningScore: number;
  aggressiveScore: number;
  conservativeScore: number;
  avoidanceScore: number;
  rationalScore: number;
  createdAt: string;
}

// ========== API 함수들 ==========

/**
 * 사용자의 금융 MBTI 결과 조회
 * GET /api/finance-mbti/result
 */
export const getFinanceMbtiResultApi = async (): Promise<ApiResponse<FinanceMbtiResult>> => {
  return apiGet<FinanceMbtiResult>('/api/finance-mbti/result');
};
