import { TrophyIconKey } from './trophyIcons';

export interface TrophyDefinition {
  id: number;
  iconKey: TrophyIconKey;
  title: string;
  description: string;
}

export interface EarnedTrophy extends TrophyDefinition {
  badge: string;
  currentValue: number;
  label: string;
}

export const MY_TROPHIES: EarnedTrophy[] = [
  {
    id: 1,
    iconKey: 'coffee',
    title: '커피중독자',
    badge: '이번달 3번 달성',
    label: '일일 평균 소비금액',
    currentValue: 8100,
    description: '하루 4500원 이상 카페 · 간식 카테고리 소비',
  },
  {
    id: 2,
    iconKey: 'night',
    title: '야식의 왕',
    badge: '이번달 3번 달성',
    label: '일일 평균 소비금액',
    currentValue: 23000,
    description: '21시 이후 50,000원 이상 음식 카테고리 소비',
  },
  {
    id: 3,
    iconKey: 'no_spend',
    title: '무지출데이',
    badge: '이번달 3번 달성',
    label: '금일 소비금액',
    currentValue: 0,
    description: '하루 500원 이하 소비',
  },
  {
    id: 4,
    iconKey: 'max_spend',
    title: '금요일 최다 지출',
    badge: '이번 주',
    label: '금요일 소비금액',
    currentValue: 9999000,
    description: '하루 50,000원 이상 소비',
  },
  {
    id: 5,
    iconKey: 'min_spend',
    title: '수요일 최소 지출',
    badge: '이번 주',
    label: '수요일 소비금액',
    currentValue: 1000,
    description: '하루 4500원 이하 소비',
  },
];

// 트로피 정의
export const TROPHY_GUIDE: TrophyDefinition[] = [
  {
    id: 101,
    iconKey: 'coffee',
    title: '커피중독자',
    description: '하루 4500원 이상 카페 · 간식 카테고리 소비',
  },
  {
    id: 102,
    iconKey: 'min_spend',
    title: '최소소비',
    description: '하루 4500원 이하 소비',
  },
  {
    id: 103,
    iconKey: 'max_spend',
    title: '최다소비',
    description: '하루 50,000원 이상 소비',
  },
  {
    id: 104,
    iconKey: 'no_spend',
    title: '무지출데이',
    description: '하루 500원 이하 소비',
  },
  {
    id: 105,
    iconKey: 'night',
    title: '야식의 왕',
    description: '21시 이후 50,000원 이상 음식 카테고리 소비',
  },
];
