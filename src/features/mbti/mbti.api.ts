import { apiGet, apiPost, ApiResponse } from '@/utils/api';

export interface MbtiQuestion {
  id: number;
  content: string;
}

export interface MbtiResultResponse {
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

export interface MbtiTypeDetail {
  type: string;
  title: string;
  tagline: string;
  detail: string;
  cautions: string[];
  recommendedActions: string[];
}

/** 1. 질문지 리스트 가져오기 */
export const getMbtiQuestions = async (): Promise<ApiResponse<MbtiQuestion[]>> => {
  return apiGet<MbtiQuestion[]>('/api/finance-mbti/questions');
};

/** 2. 답변 제출하기 */
export const submitMbtiTest = async (answers: { questionId: number; choiceValue: number }[]) => {
  return apiPost('/api/finance-mbti/test', { answers });
};

/** 3. 내 결과 조회하기 */
export const getMbtiResult = async (): Promise<ApiResponse<MbtiResultResponse>> => {
  return apiGet<MbtiResultResponse>('/api/finance-mbti/result');
};

/** 4. 모든 MBTI 유형 상세 정보 가져오기 */
export const getMbtiTypeDetails = async (): Promise<ApiResponse<MbtiTypeDetail[]>> => {
  return apiGet<MbtiTypeDetail[]>('/api/finance-mbti/result/type');
};
