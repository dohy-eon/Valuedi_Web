/**
 * 자산/거래 분석 및 계좌 관련 API
 * Swagger: https://api.valuedi.site/swagger-ui/index.html → Ledger (거래내역)
 */

import { apiGet, apiPost, ApiResponse } from '@/utils/api';

// ========== POST /api/transactions/rematch-categories (카테고리 재매칭) ==========

/** rematchCategories 요청 (Swagger 스펙에 맞게 조정) */
export interface RematchCategoriesRequest {
  yearMonth?: string; // YYYY-MM
  [key: string]: unknown;
}

/** rematchCategories 응답 */
export interface RematchCategoriesResult {
  matchedCount?: number;
  message?: string;
  [key: string]: unknown;
}

/**
 * 거래 내역 카테고리 재매칭 (키워드 등으로 재분류)
 * POST /api/transactions/rematch-categories
 * Swagger: Ledger (거래내역) → rematchCategories
 */
export const rematchCategoriesApi = async (
  params?: RematchCategoriesRequest
): Promise<ApiResponse<RematchCategoriesResult | null>> => {
  return apiPost<RematchCategoriesResult | null>(
    '/api/transactions/rematch-categories',
    params ?? {}
  );
};

// ========== GET /api/transactions/by-category (getCategoryStats) ==========

/** 카테고리별 소비 집계 응답 한 항목 */
export interface TransactionByCategoryItem {
  categoryCode: string;
  categoryName: string;
  totalAmount: number;
  percentage: number; // 0~100 또는 0~1 (백엔드 스펙에 맞춰 매핑 시 처리)
}

/**
 * 카테고리별 소비 집계
 * GET /api/transactions/by-category?yearMonth=YYYY-MM
 * Swagger: Ledger (거래내역) → getCategoryStats
 */
export const getTransactionsByCategoryApi = async (
  yearMonth: string
): Promise<ApiResponse<TransactionByCategoryItem[]>> => {
  return apiGet<TransactionByCategoryItem[]>(
    `/api/transactions/by-category?yearMonth=${encodeURIComponent(yearMonth)}`
  );
};

// ========== GET /api/transactions (거래 내역 조회) ==========

/** API가 내려주는 카테고리 객체 (중첩 시, camel/snake 둘 다 허용) */
export interface LedgerCategoryRef {
  code?: string;
  name?: string;
  id?: number;
  category_code?: string;
  category_name?: string;
  category_id?: number;
  [key: string]: unknown;
}

export interface LedgerTransactionItem {
  transactionId?: number;
  date?: string;
  transactionAt?: string; // API가 ISO 날짜로 내려줄 수 있음
  amount?: number;
  title?: string;
  categoryCode?: string;
  categoryName?: string;
  categoryId?: number;
  /** snake_case 응답 대응 */
  category_code?: string;
  category_name?: string;
  category_id?: number;
  /** 문자열이면 코드, 객체면 { code, name, id } */
  category?: string | LedgerCategoryRef;
  type?: string;
  [key: string]: unknown;
}

export interface LedgerListResponse {
  content?: LedgerTransactionItem[];
  totalElements?: number;
  totalPages?: number;
  [key: string]: unknown;
}

// ========== POST /api/transactions/sync (거래 동기화·목록) ==========

/** sync 요청 (Swagger 스펙에 맞게 조정) */
export interface SyncTransactionsRequest {
  yearMonth?: string; // YYYY-MM
  [key: string]: unknown;
}

/** sync 응답 - 동기화 후 거래 목록을 내려줄 수 있음 */
export interface SyncTransactionsResult {
  content?: LedgerTransactionItem[];
  totalElements?: number;
  totalPages?: number;
  syncedCount?: number;
  [key: string]: unknown;
}

/**
 * 거래 내역 동기화 (외부 연동 후 최신 거래 반영, 응답에 목록 포함 시 사용)
 * POST /api/transactions/sync
 * Swagger: Ledger (거래내역) → sync
 */
export const syncTransactionsApi = async (
  params?: SyncTransactionsRequest
): Promise<ApiResponse<SyncTransactionsResult | null>> => {
  return apiPost<SyncTransactionsResult | null>('/api/transactions/sync', params ?? {});
};

/**
 * 거래 내역 조회 (월별/일별, 페이징)
 * GET /api/transactions?yearMonth=YYYY-MM&date=YYYY-MM-DD&page=0&size=20&sort=LATEST
 * Swagger: Ledger (거래내역) → getTransactions
 */
export const getTransactionsApi = async (params: {
  yearMonth: string;
  date?: string;
  page?: number;
  size?: number;
  sort?: 'LATEST' | 'OLDEST' | 'AMOUNT_DESC' | 'AMOUNT_ASC';
}): Promise<ApiResponse<LedgerListResponse>> => {
  const search = new URLSearchParams({ yearMonth: params.yearMonth });
  if (params.date) search.set('date', params.date);
  if (params.page != null) search.set('page', String(params.page));
  if (params.size != null) search.set('size', String(params.size));
  if (params.sort) search.set('sort', params.sort);
  return apiGet<LedgerListResponse>(`/api/transactions?${search.toString()}`);
};

// ========== GET /api/transactions/summary (월 소비 내역 요약) ==========

export interface LedgerSummaryResult {
  totalIncome?: number;
  totalExpense?: number;
  previousMonthExpense?: number;
  expenseDiff?: number; // 전월 대비 증감 (음수: 덜 씀, 양수: 더 씀)
  [key: string]: unknown;
}

/**
 * 월 소비 내역 요약 (총 수입/지출, 전월 대비)
 * GET /api/transactions/summary?yearMonth=YYYY-MM
 * Swagger: Ledger (거래내역) → getMonthlySummary
 */
export const getMonthlySummaryApi = async (
  yearMonth: string
): Promise<ApiResponse<LedgerSummaryResult>> => {
  return apiGet<LedgerSummaryResult>(
    `/api/transactions/summary?yearMonth=${encodeURIComponent(yearMonth)}`
  );
};

// ========== GET /api/transactions/trend (월별 지출 추이) ==========

export interface TrendItem {
  yearMonth?: string; // "YYYY-MM"
  amount?: number;
  totalExpense?: number;
  [key: string]: unknown;
}

/**
 * 월별 지출 추이 (차트용)
 * GET /api/transactions/trend?fromYearMonth=YYYY-MM&toYearMonth=YYYY-MM
 * Swagger: Ledger (거래내역) → getTrend
 */
export const getTrendApi = async (params: {
  fromYearMonth: string;
  toYearMonth: string;
}): Promise<ApiResponse<TrendItem[]>> => {
  const search = new URLSearchParams({
    fromYearMonth: params.fromYearMonth,
    toYearMonth: params.toYearMonth,
  });
  return apiGet<TrendItem[]>(`/api/transactions/trend?${search.toString()}`);
};

// ========== GET /api/transactions/top-category (최다 소비 항목) ==========

export interface TopCategoryItem {
  categoryCode?: string;
  categoryName?: string;
  totalAmount?: number;
  percentage?: number;
  [key: string]: unknown;
}

/**
 * 최다 소비 항목 (상위 N개)
 * GET /api/transactions/top-category?yearMonth=YYYY-MM&limit=3
 * Swagger: Ledger (거래내역) → getTopCategories
 */
export const getTopCategoriesApi = async (params: {
  yearMonth: string;
  limit?: number;
}): Promise<ApiResponse<TopCategoryItem[]>> => {
  const search = new URLSearchParams({ yearMonth: params.yearMonth });
  if (params.limit != null) search.set('limit', String(params.limit));
  return apiGet<TopCategoryItem[]>(`/api/transactions/top-category?${search.toString()}`);
};

// ========== 자산(계좌) 관련 타입 ==========

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

// ========== 자산(계좌) API ==========

/**
 * 전체 계좌 목록 조회
 * GET /api/assets/accounts
 */
export const getAccountsApi = async (): Promise<ApiResponse<AccountListResponse>> => {
  return apiGet<AccountListResponse>('/api/assets/accounts');
};
