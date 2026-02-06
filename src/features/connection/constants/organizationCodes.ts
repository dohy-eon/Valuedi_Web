/**
 * 은행/카드 ID를 기관 코드로 매핑하는 상수
 */

// 은행 ID -> 기관 코드 매핑
export const BANK_ORGANIZATION_CODES: Record<string, string> = {
  ibk: '0002', // 산업은행
  kdb: '0003', // 기업은행
  kb: '0004', // 국민은행
  suhyup: '0007', // 수협은행
  nh: '0011', // 농협은행
  woori: '0020', // 우리은행
  sc: '0023', // SC은행
  citi: '0027', // 씨티은행
  dgb: '0037', // 전북은행
  busan: '0032', // 부산은행
  gwangju: '0034', // 광주은행
  jeju: '0035', // 제주은행
  gyeongnam: '0039', // 경남은행
  saemaul: '0045', // 새마을금고
  shinhyup: '0048', // 신협은행
  postbank: '0071', // 우체국
  hana: '0081', // KEB하나은행
  shinhan: '0088', // 신한은행
  kbank: '0089', // K뱅크
};

// 카드 ID -> 기관 코드 매핑 (카드사도 동일한 기관 코드 사용)
export const CARD_ORGANIZATION_CODES: Record<string, string> = {
  ibk: '0002', // IBK카드
  kdb: '0003', // 기업카드
  kb: '0004', // KB국민카드
  suhyup: '0007', // 수협카드
  nh: '0011', // NH농협카드
  woori: '0020', // 우리카드
  sc: '0023', // SC카드
  citi: '0027', // 씨티카드
  busan: '0032', // 부산카드
  gwangju: '0034', // 광주카드
  jeju: '0035', // 제주카드
  dgb: '0037', // 전북카드 (전북은행 코드)
  gyeongnam: '0039', // 경남카드
  saemaul: '0045', // 새마을카드
  shinhyup: '0048', // 신협카드
  postbank: '0071', // 우체국카드
  hana: '0081', // 하나카드
  shinhan: '0088', // 신한카드
};

/**
 * 은행 ID를 기관 코드로 변환
 */
export const getBankOrganizationCode = (bankId: string): string | null => {
  return BANK_ORGANIZATION_CODES[bankId] || null;
};

/**
 * 카드 ID를 기관 코드로 변환
 */
export const getCardOrganizationCode = (cardId: string): string | null => {
  return CARD_ORGANIZATION_CODES[cardId] || null;
};

/**
 * 기관 코드를 은행 ID로 변환 (역방향)
 */
export const getBankIdFromOrganizationCode = (orgCode: string): string | null => {
  const entry = Object.entries(BANK_ORGANIZATION_CODES).find(([, code]) => code === orgCode);
  return entry ? entry[0] : null;
};

/**
 * 기관 코드를 카드 ID로 변환 (역방향)
 */
export const getCardIdFromOrganizationCode = (orgCode: string): string | null => {
  const entry = Object.entries(CARD_ORGANIZATION_CODES).find(([, code]) => code === orgCode);
  return entry ? entry[0] : null;
};
