import { useMemo } from 'react';

import { MBTI_QUESTIONS, MBTI_AXES, MBTI_RESULTS, DEFAULT_RESULT } from '@/features/mbti/constants/mbtiData';
import { useMbtiStore } from './useMbtiStore';

export const useGetMbtiTestResult = () => {
  const { answers } = useMbtiStore();

  const result = useMemo(() => {
    const scores = { emotion: 0, control: 0, risk: 0, decision: 0 };
    const maxScores = { emotion: 0, control: 0, risk: 0, decision: 0 };

    MBTI_QUESTIONS.forEach((q) => {
      const type = q.type as keyof typeof scores;
      const score = answers[q.id] || 3;

      // 점수가 높으면 왼쪽(A, I, G, V) 성향, 낮으면 오른쪽(S, P, C, R) 성향으로 가정
      // 혹은 그 반대일 수 있으나, 여기서는 점수가 높을수록 '왼쪽 성향(불안/충동/공격/회피)'라고 가정하고 구현했습니다.

      scores[type] += score;
      maxScores[type] += 5;
    });

    // 백분율 및 코드 도출
    // 점수가 높으면 (50%보다 클 경우) Left Code, 낮으면 Right Code
    const getCode = (type: keyof typeof MBTI_AXES, score: number, max: number) => {
      const percentage = (score / max) * 100;
      const axis = MBTI_AXES[type.toUpperCase() as keyof typeof MBTI_AXES];
      return {
        char: percentage > 50 ? axis.left : axis.right,
        percent: Math.round(percentage), // 왼쪽 성향의 퍼센트
      };
    };

    const emotion = getCode('EMOTION', scores.emotion, maxScores.emotion);
    const control = getCode('CONTROL', scores.control, maxScores.control);
    const risk = getCode('RISK', scores.risk, maxScores.risk);
    const decision = getCode('DECISION', scores.decision, maxScores.decision);

    // 최종 4글자 조합 (예: SPGV)
    const finalCode = `${emotion.char}${control.char}${risk.char}${decision.char}`;
    const data = MBTI_RESULTS[finalCode] || DEFAULT_RESULT;

    return {
      mbtiCode: finalCode,
      data,
      scores: {
        emotion: emotion.percent,
        control: control.percent,
        risk: risk.percent,
        decision: decision.percent,
      },
    };
  }, [answers]);

  return result;
};
