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
            className="fixed inset-0 bg-black/40 z-[100]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[101] px-8 pt-12 pb-10 shadow-2xl"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#E5E8EB] rounded-full" />
            <h2 className="text-2xl font-bold text-[#191F28] mb-8">{item.type}</h2>

            <div className="relative mb-3 border rounded-xl border-[#E0E0E0] p-2 py-4">
              <input
                type="text"
                placeholder="메모를 남겨주세요 (최대 20자)"
                className="w-full text-[16px] outline-none placeholder:text-[#ADB5BD]"
              />
              <img
                src={WriteIcon}
                alt="edit memo"
                className="absolute w-5 h-5 right-4 top-4 opacity-40"
              />
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
              className="w-full bg-[#FFE500] py-5 rounded-2xl font-bold text-lg active:scale-[0.98]"
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
  <div className="flex justify-between text-[15px]">
    <span className="text-[#8B95A1]">{label}</span>
    <span className={isBold ? 'text-[#191F28] font-bold' : 'text-[#4E5968]'}>{value}</span>
  </div>
);

export default TransactionBottomSheet;