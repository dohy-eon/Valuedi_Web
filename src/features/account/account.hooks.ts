import { useQuery } from '@tanstack/react-query';
import { accountApi } from './account.api';

// Query Keys
export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
};

/**
 * 연결된 계좌 목록 조회
 */
export function useAccounts() {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: () => accountApi.getAccounts(),
  });
}
