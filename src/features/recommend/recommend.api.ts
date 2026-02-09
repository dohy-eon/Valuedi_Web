/**
 * 추천 상품 관련 API 함수들
 */

import { apiGet, ApiResponse } from '@/utils/api';

// ========== 타입 정의 ==========

export interface RecommendedProduct {
  korCoNm: string;
  finPrdtCd: string;
  finPrdtNm: string;
  rsrvType: string;
  rsrvTypeNm: string;
}

export interface Top3RecommendationsResponse {
  totalCount: number;
  maxPageNo: number;
  nowPageNo: number;
  products: RecommendedProduct[];
}

// ========== API 함수들 ==========

/**
 * 최신 추천 Top3 조회
 * GET /api/savings/recommendations/top3
 */
export const getTop3RecommendationsApi = async (): Promise<ApiResponse<Top3RecommendationsResponse>> => {
  return apiGet<Top3RecommendationsResponse>('/api/savings/recommendations/top3');
};
