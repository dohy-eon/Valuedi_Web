import { ReactNode } from 'react';

export interface QuestionType {
  id: number;
  title: ReactNode;
  type: string;
}

export const MBTI_QUESTIONS: QuestionType[] = [
  {
    id: 1,
    title: '금융 결정을 내릴 때,\n손실 가능성 때문에 쉽게 불안해진다.',
    type: 'EI',
  },
  {
    id: 2,
    title: '돈을 투자하거나 지출할 때\n심리적 부담을 많이 느낀다.',
    type: 'PJ',
  },
  {
    id: 3,
    title: '소비 결정을 즉흥적으로\n내리는 경우가 많다.',
    type: 'TF',
  },
  {
    id: 4,
    title: '쇼핑하거나 지출할 때\n계획 없이 행동하는 편이다.',
    type: 'TF',
  },
  {
    id: 5,
    title: '높은 수익을 위해\n위험한 투자도 감수할 수 있다.',
    type: 'TF',
  },
  {
    id: 6,
    title: '원금 손실보다\n잠재적 수익을 더 중시한다.',
    type: 'TF',
  },
  {
    id: 7,
    title: '금융 결정을 자주 미루거나\n다른 사람의 의견을 먼저 참고한다.',
    type: 'TF',
  },
  {
    id: 8,
    title: '현재 소비의 즐거움이나 만족을\n장기 목표보다 우선시한다.',
    type: 'TF',
  },
];
