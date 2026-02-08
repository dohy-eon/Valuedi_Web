/**
 * 목표 관련 API 함수들
 */

import { apiGet, ApiResponse } from '@/utils/api';

// ========== 타입 정의 ==========

export interface GoalDetail {
  goalId: number;
  title: string;
  savedAmount: number;
  targetAmount: number;
  remainingDays: number;
  achievementRate: number;
  account: {
    bankName: string;
    accountNumber: string;
  };
  status: string;
  colorCode: string;
  iconId: number;
}

// ========== API 함수들 ==========

/**
 * 목표 상세 조회
 * GET /api/goals/{goalId}
 */
export const getGoalDetailApi = async (goalId: number): Promise<ApiResponse<GoalDetail>> => {
  return apiGet<GoalDetail>(`/api/goals/${goalId}`);
};
