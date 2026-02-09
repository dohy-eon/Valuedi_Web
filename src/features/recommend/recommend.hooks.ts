import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSavingsRecommendationsApi,
  createSavingsRecommendationsApi,
  getSavingsDetailApi,
  getTop3RecommendationsApi,
} from './recommend.api';

// Query Key 팩토리
export const recommendKeys = {
  all: ['recommendations'] as const,
  savings: () => [...recommendKeys.all, 'savings'] as const,
  savingsList: (rsrvType?: 'S' | 'F') => [...recommendKeys.savings(), 'list', rsrvType] as const,
  savingsDetail: (finPrdtCd: string) => [...recommendKeys.savings(), 'detail', finPrdtCd] as const,
  top3: () => [...recommendKeys.savings(), 'top3'] as const,
};

/**
 * 최신 추천 15개 조회
 * @param rsrvType 적립유형 필터 (S=정기적금, F=자유적금). 미입력 시 전체
 */
export function useSavingsRecommendations(rsrvType?: 'S' | 'F') {
  return useQuery({
    queryKey: recommendKeys.savingsList(rsrvType),
    queryFn: () => getSavingsRecommendationsApi(rsrvType),
    select: (data) => data.result,
  });
}

/**
 * 적금 추천 생성/저장 (15개)
 */
export function useCreateSavingsRecommendations() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createSavingsRecommendationsApi(),
    onSuccess: () => {
      // 모든 추천 목록 쿼리 무효화 (모든 필터 타입)
      queryClient.invalidateQueries({ queryKey: recommendKeys.savingsList() });
      queryClient.invalidateQueries({ queryKey: recommendKeys.top3() });
    },
  });
}

/**
 * 추천 상품 상세 조회
 * @param finPrdtCd 금융상품 코드
 */
export function useSavingsDetail(finPrdtCd?: string) {
  return useQuery({
    queryKey: recommendKeys.savingsDetail(finPrdtCd!),
    queryFn: () => getSavingsDetailApi(finPrdtCd!),
    enabled: !!finPrdtCd,
    select: (data) => data.result,
  });
}

/**
 * 최신 추천 Top3 조회
 */
export function useTop3Recommendations() {
  return useQuery({
    queryKey: recommendKeys.top3(),
    queryFn: () => getTop3RecommendationsApi(),
    select: (data) => data.result,
  });
}
