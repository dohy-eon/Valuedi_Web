export const COLOR_ORDER = [
  'FF6363', // 1. 빨강
  'FF7B2E', // 2. 주황
  'FFA938', // 3. 진한 노랑
  'F8D444', // 4. 밝은 노랑
  '6BE016', // 5. 연두
  '1ED45A', // 6. 초록
  '28D0ED', // 7. 하늘
  '3DC2FF', // 8. 라이트블루
  '3385FF', // 9. 파랑
  '7D5EF7', // 10. 보라
  'D478FF', // 11. 연보라
  'FA73E3', // 12. 핑크
] as const;

export function basenameNoExt(filePath: string) {
  const last = filePath.split('/').pop() ?? filePath;
  return last.replace(/\.svg$/i, '');
}
//YY-MM-DD 형식을 YYYY-MM-DD 형식으로 변환하는 함수
export function formatDate(dateStr: string) {
  if (/^\d{2}-\d{2}-\d{2}$/.test(dateStr)) {
    return `20${dateStr}`;
  }
  return dateStr;
}

/** API에서 받은 날짜(YYYY-MM-DD 또는 ISO)를 입력 필드용 YY-MM-DD로 변환 */
export function toInputDate(apiDate: string | undefined): string {
  if (!apiDate || typeof apiDate !== 'string') return '';
  const datePart = apiDate.trim().slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return datePart.slice(2);
  return apiDate;
}

/** ISO 또는 YYYY-MM-DD 날짜를 YY.MM.DD 형식으로 포맷 */
export function formatToYYMMDD(isoDate: string): string {
  if (!isoDate) return '-';
  const d = new Date(isoDate);
  const y = String(d.getFullYear()).slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

/** 계좌번호 마스킹 (앞자리 유지, 중간 ****, 뒤 2~4자리) */
export function maskAccountNumber(accountNumber: string): string {
  if (!accountNumber) return '-';
  const parts = accountNumber.replace(/\s/g, '').split('-');
  if (parts.length >= 3) {
    return `${parts[0]}-${parts[1]}-****${parts[parts.length - 1].slice(-2)}`;
  }
  if (parts.length === 1 && parts[0].length >= 4) {
    return `****${parts[0].slice(-4)}`;
  }
  return accountNumber;
}
