import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const BottomSheet = ({ isOpen, onClose, title, children }: BottomSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. 배경(Dimmer): MobileLayout의 너비에 맞추고 중앙 정렬 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 w-full max-w-[360px] mx-auto left-0 right-0"
          />

          {/* 2. 시트 본체: MobileLayout 하단에 딱 붙도록 설정 */}
          <motion.div
            initial={{ y: '100%', x: '-50%' }} // x: '-50%'는 중앙 정렬을 위해 필요해요!
            animate={{ y: 0, x: '-50%' }}
            exit={{ y: '100%', x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            // 💡 left-1/2와 max-w-[360px]가 핵심입니다! ㅋ
            className="fixed bottom-0 left-1/2 z-[101] w-full max-w-[360px] rounded-t-3xl bg-white px-8 pb-10 pt-12 shadow-2xl"
          >
            <div className="absolute left-1/2 top-4 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gray-200" />

            {title && <h2 className="mb-8 text-2xl font-bold text-gray-900">{title}</h2>}

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;