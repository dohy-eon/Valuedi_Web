import { useMemo } from 'react';
import { useMbtiStore } from './useMbtiStore';
import { calculateMbtiScore } from '@/utils/calculateMbtiScore';

export const useGetMbtiTestResult = () => {
  const { answers } = useMbtiStore();

  const result = useMemo(() => {
    return calculateMbtiScore(answers);
  }, [answers]);

  return result;
};
