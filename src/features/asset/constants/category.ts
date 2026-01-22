import WIcon from '@/assets/icons/asset/W.svg';
import LeisureIcon from '@/assets/icons/asset/Leisure.svg';
import TrafficIcon from '@/assets/icons/asset/Traffic.svg';
//import FoodIcon from '@/assets/icons/asset/Food.svg';
import ShoppingIcon from '@/assets/icons/asset/Shopping.svg';
import MedicalIcon from '@/assets/icons/asset/Medical.svg';
import DishIcon from '@/assets/icons/asset/Dish.svg';
import ShoppingBag from '@/assets/icons/asset/Shopping-Bag.svg';
import LivingIcon from '@/assets/icons/asset/Living.svg';
import CafeIcon from '@/assets/icons/asset/Cafe.svg';
import DefaultIcon from '@/assets/icons/asset/Default.svg';
import OthersIcon from '@/assets/icons/asset/Others.svg';

export interface CategoryStyle {
  bgColor: string;
  barColor: string;
  icon: string;
}

// 💡 새로 추가할 한글 라벨 정의
export const CATEGORY_LABELS: Record<string, string> = {
  transfer: '이체',
  traffic: '교통 · 자동차',
  shopping: '쇼핑',
  food: '식비',
  leisure: '취미 · 여가',
  medical: '의료 · 건강',
  market: '편의점 · 마트 · 잡화',
  living: '주거 · 통신',
  cafe: '카페 · 디저트',
  others: '그외', // 상세 페이지에서도 쓰이니 추가해두면 좋아요
  default: '카테고리 없음',
};

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  transfer: { bgColor: 'bg-atomic-yellow-90', barColor: 'bg-atomic-yellow-50', icon: WIcon }, // 이체
  shopping: { bgColor: 'bg-atomic-orange-90', barColor: 'bg-atomic-orange-50', icon: ShoppingBag }, // 쇼핑
  traffic: { bgColor: 'bg-atomic-red-90', barColor: 'bg-atomic-red-50', icon: TrafficIcon }, // 교통
  food: { bgColor: 'bg-atomic-blue-90', barColor: 'bg-atomic-blue-50', icon: DishIcon }, // 음식
  leisure: { bgColor: 'bg-neutral-10', barColor: 'bg-neutral-30', icon: LeisureIcon }, // 여가
  default: { bgColor: 'bg-neutral-30', barColor: 'bg-neutral-50', icon: DefaultIcon }, // 기본값
  medical: { bgColor: 'bg-neutral-40', barColor: 'bg-neutral-60', icon: MedicalIcon }, // 의료
  market: { bgColor: 'bg-atomic-light-blue-90', barColor: 'bg-atomic-light-blue-50', icon: ShoppingIcon }, // 마켓
  living: { bgColor: 'bg-atomic-purple-90', barColor: 'bg-atomic-purple-50', icon: LivingIcon }, // 주거
  cafe: { bgColor: 'bg-atomic-green-90', barColor: 'bg-atomic-green-50', icon: CafeIcon }, // 카페
  others: { bgColor: 'bg-neutral-60', barColor: 'bg-neutral-80', icon: OthersIcon }, // 그외
};