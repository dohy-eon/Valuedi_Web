import MbtiIcon from '@/assets/icons/Mbti.svg?react';

// 차트 하나의 데이터 타입 정의
export interface MbtiTraitType {
  key: string;
  leftLabel: string;
  rightLabel: string;
  descriptionTitle: string;
  description: string;
}

// 전체 결과 데이터 타입 정의
export interface MbtiResultType {
  key: string;
  mbtiType: string;
  subTitle: string;
  description: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  detailTitle: string;
  detailDescription: string;
  traits: MbtiTraitType[];
}

export const MBTI_RESULTS: Record<string, MbtiResultType> = {
  DEFAULT: {
    key: 'DEFAULT',
    mbtiType: '불안한 안정자산 추구형',
    subTitle: '금융은 아직 낯설지만, 손해 보고 싶지는 않아요.',
    description: '위험은 싫지만 목표 달성 의지가 강함, 계획보다는 순간의 충동 소비를 조절하려 노력해요',
    icon: MbtiIcon,
    detailTitle: '초보 안전형 저축가',
    detailDescription: `"금융은 아직 낯설지만, 손해 보고 싶지는 않아요."\n당신은 돈을 대하는 태도가 굉장히 조심스러운 편입니다.\n'잘 벌기'보다 '잃지 않는 것'이 훨씬 중요하고, 금융이라는 단어 자체가 아직은 어렵고 부담스럽게 느껴질 수 있어요.투자를 해야 한다는 이야기를 자주 듣지만, 막상 손실 가능성을 떠올리면 선뜻 시작하기가 쉽지 않습니다. 그래서 예금이나 적금처럼 구조가 명확하고 결과가 예측 가능한 상품에 자연스럽게 마음이 갑니다.\n소비에서는 충동적인 순간도 종종 있지만, 큰돈을 쓰는 결정 앞에서는 다시 한 번 멈춰 서는 타입입니다.\n"이게 꼭 필요한가?"를 스스로에게 물어보지만, 금융 결정을 스스로 내리는 것 자체가 아직은 익숙하지 않아 미루는 경우도 많아요. 그럼에도 불구하고, 이 유형의 가장 큰 장점은 망하지 않는다는 것입니다. 무리한 선택을 하지 않기 때문에 재정적으로 큰 위기를 겪을 확률이 낮아요.
지금 당신에게 가장 중요한 건 ‘대단한 투자’가 아니라 금융에 익숙해지는 경험입니다.\n자동이체 적금, 잔돈 저축, 월별 지출 확인 같은 작은 성공을 쌓아가는 것이 이후의 선택지를 넓혀줍니다.\n금융은 용기가 아니라 반복된 안정 경험으로 익숙해지는 영역이니까요.`,

    traits: [
      {
        key: 'EI',
        leftLabel: '불안형',
        rightLabel: '평온형',
        descriptionTitle: '불안형이란?',
        description: '안정적인 성향은 크게 돈을 잃지 않아 좋지만 때론 큰 기회를 놓칠 수 있어요.',
      },
      {
        key: 'SN',
        leftLabel: '충동형',
        rightLabel: '계획형',
        descriptionTitle: '충동형이란?',
        description: '순간의 감정에 이끌려 소비하는 경향이 있습니다. 예산을 세우고 지키는 연습이 필요해요.',
      },
      {
        key: 'TF',
        leftLabel: '공격형',
        rightLabel: '안전형',
        descriptionTitle: '공격형이란?',
        description: '높은 수익을 위해 위험을 감수하는 투자 성향입니다.',
      },
      {
        key: 'PJ',
        leftLabel: '회피-소비중심형',
        rightLabel: '합리-목표중심형',
        descriptionTitle: '회피형이란?',
        description: '금융 문제를 직면하기보다 피하려는 성향이 있습니다.',
      },
    ],
  },
};
