// Goal 상태
export type GoalStatus = 'ACTIVE' | 'COMPLETE' | 'FAILED';

// Goal 정렬
export type GoalSort = 'TIME_DESC' | 'PROGRESS_DESC';

// Goal 기본 정보
export interface Goal {
  goalId: number;
  title: string;
  savedAmount: number;
  remainingDays: number;
  achievementRate: number;
  status: GoalStatus;
  colorCode: string;
  iconId: number;
}

// API 응답 - 목표 목록
export interface GoalsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    goals: Goal[];
  };
}

// API 요청 - 목표 목록 조회
export interface GetGoalsParams {
  status?: GoalStatus;
  sort?: GoalSort;
  limit?: number;
}

// API 요청 - 목표 추가
export interface CreateGoalRequest {
  bankAccountId: number;
  title: string;
  startDate: string;
  endDate: string;
  targetAmount: number;
  colorCode: string;
  iconId: number;
}

// API 응답 - 목표 추가
export interface CreateGoalResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    goalId: number;
    title: string;
    targetAmount: number;
    startAmount: number;
    startDate: string;
    endDate: string;
    remainingDays: number;
    account: {
      bankName: string;
      accountNumber: string;
    };
    iconId: number;
  };
}

// Goal 상세 정보
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
  status: GoalStatus;
  colorCode: string;
  iconId: number;
}

// API 응답 - 목표 상세 조회
export interface GoalDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: GoalDetail;
}

// API 요청 - 목표-계좌 연결
export interface LinkAccountRequest {
  accountId: number;
}

// API 응답 - 목표-계좌 연결
export interface LinkAccountResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}
