import { DEFAULT_RESULT } from '@/features/mbti/constants/mbtiData';

type Answers = Record<number, number>;

export const calculateMbtiScore = (_answers: Answers) => {
  return {
    mbtiCode: 'SPGV',
    data: DEFAULT_RESULT,
    scores: {
      emotion: 50,
      control: 50,
      risk: 50,
      decision: 50,
    },
  };
};
