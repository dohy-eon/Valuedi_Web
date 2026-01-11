// 은행사 아이콘 사용 (카드사별 아이콘이 준비되면 교체 가능)
import ibkIcon from '@/assets/icons/bank/ibk.svg';
import kdbIcon from '@/assets/icons/bank/kdb.svg';
import kbIcon from '@/assets/icons/bank/kb.svg';
import suhyupIcon from '@/assets/icons/bank/suhyup.svg';
import nhIcon from '@/assets/icons/bank/nh.svg';
import wooriIcon from '@/assets/icons/bank/woori.svg';
import scIcon from '@/assets/icons/bank/sc.svg';
import citiIcon from '@/assets/icons/bank/citi.svg';
import busanIcon from '@/assets/icons/bank/busan_gyeongnam.svg';
import gwangjuIcon from '@/assets/icons/bank/gwangju_jeonbuk.svg';
import dgbIcon from '@/assets/icons/bank/dgb.svg';
import jejuIcon from '@/assets/icons/bank/jeju_shinhan.svg';
import saemaulIcon from '@/assets/icons/bank/saemaul.svg';
import shinhyupIcon from '@/assets/icons/bank/shinhyup.svg';
import postbankIcon from '@/assets/icons/bank/postbank.svg';
import hanaIcon from '@/assets/icons/bank/hana.svg';
import shinhanIcon from '@/assets/icons/bank/jeju_shinhan.svg';

export interface Card {
  id: string;
  name: string;
  icon: string;
}

export const CARDS: Card[] = [
  { id: 'ibk', name: 'IBK카드', icon: ibkIcon },
  { id: 'kdb', name: '기업카드', icon: kdbIcon },
  { id: 'kb', name: 'KB국민카드', icon: kbIcon },
  { id: 'suhyup', name: '수협카드', icon: suhyupIcon },
  { id: 'nh', name: 'NH농협카드', icon: nhIcon },
  { id: 'woori', name: '우리카드', icon: wooriIcon },
  { id: 'sc', name: 'SC카드', icon: scIcon },
  { id: 'citi', name: '씨티카드', icon: citiIcon },
  { id: 'busan', name: '부산카드', icon: busanIcon },
  { id: 'gwangju', name: '광주카드', icon: gwangjuIcon },
  { id: 'jeju', name: '제주카드', icon: jejuIcon },
  { id: 'dgb', name: '전북카드', icon: dgbIcon },
  { id: 'gyeongnam', name: '경남카드', icon: busanIcon },
  { id: 'saemaul', name: '새마을카드', icon: saemaulIcon },
  { id: 'shinhyup', name: '신협카드', icon: shinhyupIcon },
  { id: 'postbank', name: '우체국카드', icon: postbankIcon },
  { id: 'hana', name: '하나카드', icon: hanaIcon },
  { id: 'shinhan', name: '신한카드', icon: shinhanIcon },
];
