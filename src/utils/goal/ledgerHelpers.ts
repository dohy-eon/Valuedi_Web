import type { LedgerItem } from '@/features/goal';

export interface TransactionItem {
  id: number;
  type: string;
  amount: string;
  time: string;
  category: string;
  balanceAfter: string;
  account: string;
  isPositive: boolean;
}

export function formatLedgerTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch {
    return iso;
  }
}

export function ledgerToTransactionItem(ledger: LedgerItem, accountLabel: string): TransactionItem {
  const isIncome = ledger.type === 'INCOME';
  const amountStr = isIncome
    ? `${ledger.amount.toLocaleString('ko-KR')} 원`
    : `- ${Math.abs(ledger.amount).toLocaleString('ko-KR')} 원`;
  return {
    id: ledger.id,
    type: isIncome ? '입금' : '출금',
    amount: amountStr,
    time: formatLedgerTime(ledger.transactionAt),
    category: ledger.categoryName,
    balanceAfter: '-',
    account: accountLabel,
    isPositive: isIncome,
  };
}
