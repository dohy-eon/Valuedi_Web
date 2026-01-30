import ConnectionDetailListItem from '@/components/mypage/ConnectionDetailListItem';

interface ConnectionListProps {
  bankName: string;
}

export const ConnectionList = ({ bankName }: ConnectionListProps) => {
  // 💡 '카드'라는 글자가 포함되어 있는지 확인하여 모드 결정
  const isCard = bankName.includes('카드');

  // 💡 요청사항 반영: 은행(false)이면 4개, 카드(true)면 2개
  const listItems = isCard ? [1, 2] : [1, 2, 3, 4];

  return (
    <section className="px-5 pb-8 space-y-2">
      {listItems.map((_, i) => (
        <ConnectionDetailListItem
          key={i}
          // 💡 은행/카드 여부에 따라 표시 명칭 변경
          displayName={isCard ? 'KB국민ONE카드' : 'KB국민ONE통장-저축예금'}
          accountNumber="592802-04-****25"
          isCardType={isCard}
        />
      ))}
    </section>
  );
};
