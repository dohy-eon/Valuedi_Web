import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AccountInfo, TransactionGroup } from '@/features/asset/constants/account';
import { useAccounts, useCards } from '@/features/asset';
import {
  getAccountTransactionsApi,
  getCardTransactionsApi,
  getTransactionsApi,
  syncTransactionsApi,
  type LedgerTransactionItem,
  type AssetTransactionsResult,
} from '@/features/asset/asset.api';
import { inferCategoryFromTitle, normalizeCategoryCode } from '@/features/asset/constants/category';
import { getBankDisplayName } from '@/features/connection/constants/organizationCodes';
import type { ColorToken } from '@/shared/styles/design-system';

// 은행 코드 → 색상 토큰 매핑 (자산 목록과 동일한 규칙 사용)
const getBankColorByOrgCode = (orgCode?: string | null): ColorToken => {
  switch (orgCode) {
    case '0004':
      return 'bank-kb';
    case '0089':
      return 'bank-kbank';
    case '0045':
      return 'bank-saemaul';
    case '0003':
      return 'bank-ibk';
    case '0032':
    case '0034':
    case '0037':
    case '0039':
      return 'bank-gwangju_jeonbuk';
    case '0011':
      return 'bank-nh';
    case '0007':
      return 'bank-suhyup';
    case '0020':
      return 'bank-woori';
    case '0023':
      return 'bank-sc';
    case '0048':
      return 'bank-shinhyup';
    case '0071':
      return 'bank-postbank';
    case '0081':
      return 'bank-hana';
    case '0088':
      return 'bank-shinhan';
    default:
      return 'bank-plus';
  }
};

const getCardColorByOrgCode = (orgCode?: string | null): ColorToken => {
  switch (orgCode) {
    case '0301':
      return 'bank-kb';
    case '0306':
      return 'bank-shinhan';
    case '0313':
      return 'bank-hana';
    case '0304':
      return 'bank-nh';
    case '0309':
      return 'bank-woori';
    default:
      return 'bank-plus';
  }
};

const parseTransactionDay = (rawDate: unknown): number | null => {
  if (typeof rawDate !== 'string' || !rawDate.trim()) return null;

  const normalized = rawDate.replace(/[./]/g, '-').trim();
  const ymdMatch = normalized.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (ymdMatch) {
    const day = Number(ymdMatch[3]);
    return Number.isFinite(day) && day >= 1 && day <= 31 ? day : null;
  }

  const compactMatch = normalized.match(/(\d{4})(\d{2})(\d{2})/);
  if (compactMatch) {
    const day = Number(compactMatch[3]);
    return Number.isFinite(day) && day >= 1 && day <= 31 ? day : null;
  }

  const dateObj = new Date(normalized);
  if (Number.isNaN(dateObj.getTime())) return null;
  const day = dateObj.getDate();
  return Number.isFinite(day) ? day : null;
};

const getCategoryDisplayName = (item: LedgerTransactionItem): string | undefined => {
  if (typeof item.categoryName === 'string' && item.categoryName.trim()) return item.categoryName;
  if (typeof item.category_name === 'string' && item.category_name.trim()) return item.category_name;
  if (item.category && typeof item.category === 'object') {
    const fromObject = item.category as { name?: string; category_name?: string };
    if (typeof fromObject.name === 'string' && fromObject.name.trim()) return fromObject.name;
    if (typeof fromObject.category_name === 'string' && fromObject.category_name.trim())
      return fromObject.category_name;
  }
  return undefined;
};

const getCategoryKey = (item: LedgerTransactionItem): string => {
  const rawCategory = item.category && typeof item.category === 'object' ? item.category : undefined;
  const categoryObj = rawCategory as
    | {
        code?: string;
        category_code?: string;
        name?: string;
        category_name?: string;
        id?: number;
        category_id?: number;
      }
    | undefined;

  const code = item.categoryCode ?? item.category_code ?? categoryObj?.code ?? categoryObj?.category_code;
  const name = getCategoryDisplayName(item) ?? categoryObj?.name ?? categoryObj?.category_name;
  const id = item.categoryId ?? item.category_id ?? categoryObj?.id ?? categoryObj?.category_id;

  let normalized = normalizeCategoryCode(code, name, id);
  if (normalized === 'others') {
    const inferred = inferCategoryFromTitle(item.title);
    if (inferred) normalized = inferred;
  }
  return normalized || 'default';
};

const isIncomeTransaction = (item: LedgerTransactionItem): boolean => {
  const txType = (item.transactionType ?? item.type ?? '').toString().trim().toUpperCase();
  if (txType === 'INCOME' || txType === 'DEPOSIT') return true;
  if (txType === 'EXPENSE' || txType === 'WITHDRAW' || txType === 'PAYMENT') return false;
  return /입금|수입/.test(txType);
};

// 거래 목록을 날짜별 그룹(TransactionGroup)으로 변환
const groupTransactionsByDate = (items: LedgerTransactionItem[]): TransactionGroup[] => {
  const groups = new Map<number, TransactionGroup>();

  items.forEach((item) => {
    const rawDate = (item.transactionAt ??
      item.date ??
      (item as { transactionDate?: string }).transactionDate ??
      (item as { approvedAt?: string }).approvedAt ??
      '') as string;
    const day = parseTransactionDay(rawDate);
    if (!day) return;

    let group = groups.get(day);
    if (!group) {
      group = {
        date: `${day}일`,
        day,
        dailyTotal: 0,
        totalIncome: 0,
        totalExpense: 0,
        items: [],
      };
      groups.set(day, group);
    }

    const rawAmount = Number(item.amount ?? 0);
    const isIncome = isIncomeTransaction(item);
    const amount = isIncome ? Math.abs(rawAmount) : -Math.abs(rawAmount);

    const categoryName = getCategoryDisplayName(item);
    const memo = item.memo as string | undefined;
    const sub = categoryName && memo ? `${categoryName} | ${memo}` : categoryName ? categoryName : memo ? memo : '기타';

    const txId = item.id ?? item.transactionId ?? Date.now() + group.items.length;

    group.items.push({
      id: txId,
      title: (item.title as string) ?? '',
      sub,
      amount,
      type: isIncome ? 'income' : 'expense',
      category: getCategoryKey(item),
    });

    if (isIncome) {
      group.totalIncome += Math.abs(amount);
      group.dailyTotal += Math.abs(amount);
    } else {
      group.totalExpense += Math.abs(amount);
      group.dailyTotal -= Math.abs(amount);
    }
  });

  return Array.from(groups.values()).sort((a, b) => b.day - a.day);
};

const extractTransactionList = (
  payload:
    | AssetTransactionsResult
    | {
        content?: LedgerTransactionItem[];
        transactions?: LedgerTransactionItem[];
        items?: LedgerTransactionItem[];
        transactionList?: LedgerTransactionItem[];
      }
    | unknown
): LedgerTransactionItem[] => {
  if (Array.isArray(payload)) return payload as LedgerTransactionItem[];
  if (!payload || typeof payload !== 'object') return [];

  const result = payload as {
    content?: LedgerTransactionItem[];
    transactions?: LedgerTransactionItem[];
    items?: LedgerTransactionItem[];
    transactionList?: LedgerTransactionItem[];
  };
  if (Array.isArray(result.content)) return result.content;
  if (Array.isArray(result.transactions)) return result.transactions;
  if (Array.isArray(result.items)) return result.items;
  if (Array.isArray(result.transactionList)) return result.transactionList;
  return [];
};

const dedupeTransactionsById = (items: LedgerTransactionItem[]): LedgerTransactionItem[] => {
  const seen = new Set<number>();
  const deduped: LedgerTransactionItem[] = [];

  for (const item of items) {
    const id = item.id ?? item.transactionId;
    // ID가 없으면 중복 판단이 어려워 그대로 유지
    if (id == null) {
      deduped.push(item);
      continue;
    }
    if (seen.has(id)) continue;
    seen.add(id);
    deduped.push(item);
  }

  return deduped;
};

export const useGetAccountDetail = (params?: { yearMonth?: string; date?: string; refreshKey?: number }) => {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();
  const assetId = id ? Number(id) : null;
  const isCardDetail = location.pathname.startsWith('/asset/card/');

  const { data: accountsData } = useAccounts();
  const { data: cardsData } = useCards();
  const [transactionHistory, setTransactionHistory] = useState<TransactionGroup[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [accountTxMeta, setAccountTxMeta] = useState<AssetTransactionsResult | null>(null);
  const [cardTxMeta, setCardTxMeta] = useState<AssetTransactionsResult | null>(null);

  // 상세 상단 정보는 계좌/카드 목록 API를 기반으로 구성
  const accountInfo: AccountInfo = useMemo(() => {
    if (isCardDetail) {
      const cardList = cardsData?.result?.cardList ?? [];
      const selected =
        (assetId && cardList.find((c) => c.cardId === assetId)) || (cardList.length > 0 ? cardList[0] : undefined);

      return {
        bankName: cardTxMeta?.assetName ?? selected?.cardName ?? '내 카드',
        accountNumber: cardTxMeta?.assetNumber ?? selected?.cardNoMasked ?? '카드번호 정보 없음',
        balance: null,
        bgColor: getCardColorByOrgCode(cardTxMeta?.organizationCode ?? selected?.organization),
        organizationCode: cardTxMeta?.organizationCode ?? selected?.organization,
      };
    }

    const accountList = accountsData?.result?.accountList ?? [];
    const selected =
      (assetId && accountList.find((a) => a.accountId === assetId)) ||
      (accountList.length > 0 ? accountList[0] : undefined);

    if (!selected) {
      return {
        bankName: '내 계좌',
        accountNumber: '연결된 계좌가 없습니다',
        balance: 0,
        bgColor: 'bank-plus',
        organizationCode: undefined,
      };
    }

    const bankName = accountTxMeta?.assetName ?? getBankDisplayName(selected.organization);
    const accountNumber = accountTxMeta?.assetNumber ?? `${bankName} | ${selected.accountName}`;

    return {
      bankName,
      accountNumber,
      balance: accountTxMeta?.currentBalance ?? selected.balanceAmount,
      bgColor: getBankColorByOrgCode(accountTxMeta?.organizationCode ?? selected.organization),
      organizationCode: accountTxMeta?.organizationCode ?? selected.organization,
    };
  }, [accountTxMeta, accountsData, assetId, cardTxMeta, cardsData, isCardDetail]);

  // 계좌/카드 상세내역 API로 조회
  useEffect(() => {
    let isCancelled = false;

    const fetchTransactions = async () => {
      try {
        const now = new Date();
        const defaultYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const targetYearMonth = params?.yearMonth ?? defaultYearMonth;
        let content: LedgerTransactionItem[] = [];
        let count = 0;
        let accountMeta: AssetTransactionsResult | null = null;
        let cardMeta: AssetTransactionsResult | null = null;

        if (!assetId) {
          await syncTransactionsApi({ yearMonth: targetYearMonth }).catch(() => {});
          const size = 50;
          let page = 0;
          let totalPages = 1;

          while (page < totalPages) {
            const txRes = await getTransactionsApi({
              yearMonth: targetYearMonth,
              date: params?.date,
              page,
              size,
              sort: 'LATEST',
            });

            const result = txRes?.result;
            if (!result) break;

            const pageContent = extractTransactionList(result);
            content = content.concat(pageContent);

            totalPages = result.totalPages ?? 1;
            page += 1;
          }

          count = content.length;
        } else if (isCardDetail && assetId) {
          const size = 50;
          let page = 0;
          let totalPages = 1;

          while (page < totalPages) {
            const cardRes = await getCardTransactionsApi(assetId, {
              yearMonth: targetYearMonth,
              date: params?.date,
              page,
              size,
            });

            const result = cardRes?.result;
            if (!result) break;
            if (!cardMeta) cardMeta = result;

            const pageContent = extractTransactionList(result);
            content = content.concat(pageContent);

            totalPages = result.totalPages ?? 1;
            page += 1;
          }

          count = cardMeta?.totalElements ?? content.length;
        } else {
          const size = 50;
          let page = 0;
          let totalPages = 1;

          while (page < totalPages) {
            const accountRes = await getAccountTransactionsApi(assetId, {
              yearMonth: targetYearMonth,
              date: params?.date,
              page,
              size,
            });

            const result = accountRes?.result;
            if (!result) break;
            if (!accountMeta) accountMeta = result;

            const pageContent = extractTransactionList(result);
            content = content.concat(pageContent);

            totalPages = result.totalPages ?? 1;
            page += 1;
          }

          count = accountMeta?.totalElements ?? content.length;
        }

        if (isCancelled) return;
        const uniqueContent = dedupeTransactionsById(content);
        setAccountTxMeta(accountMeta);
        setCardTxMeta(cardMeta);
        setTransactionHistory(groupTransactionsByDate(uniqueContent));
        setTotalCount(accountMeta?.totalElements ?? cardMeta?.totalElements ?? uniqueContent.length ?? count);
      } catch {
        if (isCancelled) return;
        setAccountTxMeta(null);
        setCardTxMeta(null);
        setTransactionHistory([]);
        setTotalCount(0);
      }
    };

    fetchTransactions();

    return () => {
      isCancelled = true;
    };
  }, [assetId, isCardDetail, params?.yearMonth, params?.date, params?.refreshKey]);

  return {
    accountInfo,
    transactionHistory,
    totalCount,
  };
};
