export interface AccountInfo {
  bankName: string;
  accountNumber: string;
  balance: number;
  bgColor: string;
  themeColor: string;
}

export interface TransactionItem {
  id: number;
  title: string;
  sub: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

export interface TransactionGroup {
  date: string;
  dailyTotal: number;
  items: TransactionItem[];
}