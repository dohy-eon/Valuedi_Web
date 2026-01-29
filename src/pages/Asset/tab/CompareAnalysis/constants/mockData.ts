/**
 * 💡 비교 분석 페이지용 기준 데이터 (또래 평균)
 * 내 소비 데이터와 비교할 '20대 또래 평균' 고정값들입니다.
 */

export const PEER_AVERAGE_DATA = {
  // 1. 또래별 비교 (전체 평균 합계)
  total: 124400,

  // 2. 카테고리별 비교 (각 카테고리별 또래 평균 지출액)
  categories: {
    transfer: 110000, // 송금
    food: 124400, // 식비
    traffic: 45000, // 교통
    shopping: 85000, // 쇼핑
    medical: 15000, // 의료
    cafe: 25000, // 카페/간식
    market: 30000, // 편의점/마트
    living: 60000, // 생활
    leisure: 40000, // 문화/여가
    default: 10000, // 기타
  } as Record<string, number>,
};
