import { motion, AnimatePresence } from 'framer-motion';
import WriteIcon from '@/assets/icons/goal/WriteIcon.svg';

type TransactionItem = {
  type: string;
  time: string;
  category: string;
  amount: string;
  balanceAfter: string;
  account: string;
};

interface TransactionBottomSheetProps {
  isOpen: boolean;
  item?: TransactionItem | null;
  onClose: () => void;
}

const TransactionBottomSheet = ({ isOpen, item, onClose }: TransactionBottomSheetProps) => {
  const isVisible = isOpen && !!item;

  if (!item) {
    return <AnimatePresence>{null}</AnimatePresence>;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[101] rounded-t-3xl bg-white px-8 pb-10 pt-12 shadow-2xl"
          >
            <div className="absolute left-1/2 top-4 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-200" />
            <h2 className="mb-8 text-2xl font-bold text-gray-900">{item.type}</h2>
            <div className="relative p-2 py-4 mb-3 border border-gray-200 rounded-xl">
              <input
                type="text"
                placeholder="메모를 남겨주세요 (최대 20자)"
                className="w-full text-base outline-none placeholder:text-gray-400"
              />
              <img src={WriteIcon} alt="edit memo" className="absolute w-5 h-5 right-4 top-4 opacity-40" />
            </div>

            <div className="mb-12 space-y-6">
              <DetailRow label="거래시간" value={item.time} />
              <DetailRow label="거래구분" value={item.category} />
              <DetailRow label="거래금액" value={item.amount.replace('-', '')} isBold />
              <DetailRow label="거래 후 잔액" value={item.balanceAfter} isBold />
              <DetailRow label="입금계좌" value={item.account} />
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-2xl bg-primary-normal py-5 text-lg font-bold transition-transform active:scale-[0.98]"
            >
              확인하기
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DetailRow = ({ label, value, isBold }: { label: string; value: string; isBold?: boolean }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className={`${isBold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{value}</span>
  </div>
);

export default TransactionBottomSheet;
