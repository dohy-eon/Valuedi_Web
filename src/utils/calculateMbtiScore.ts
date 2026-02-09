import { MBTI_TRAITS_CONFIG } from '@/features/mbti/constants/mbtiTrait';
import { MbtiResultResponse } from '@/features/mbti/mbti.api';

export const calculateMbtiScores = (scores: MbtiResultResponse) => {
  return MBTI_TRAITS_CONFIG.map((trait) => {
    const leftRawScore = scores[trait.keys.left as keyof MbtiResultResponse] as number;
    const rightRawScore = scores[trait.keys.right as keyof MbtiResultResponse] as number;

    const total = leftRawScore + rightRawScore;
    const leftPercent = total === 0 ? 50 : Math.round((leftRawScore / total) * 100);
    const isLeftDominant = leftPercent >= 50;

    return {
      title: trait.title,
      leftLabel: trait.leftLabel,
      rightLabel: trait.rightLabel,
      leftScore: leftPercent,
      description: isLeftDominant ? trait.leftDescription : trait.rightDescription,
      details: isLeftDominant ? trait.leftDetails : trait.rightDetails,
    };
  });
};
