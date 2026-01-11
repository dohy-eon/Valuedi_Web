/**
 * 숫자를 한국 원화 형식으로 포맷팅
 * @param amount - 포맷팅할 금액
 * @returns 포맷팅된 문자열 (예: "10,000,000원")
 */
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString('ko-KR')}원`;
};
