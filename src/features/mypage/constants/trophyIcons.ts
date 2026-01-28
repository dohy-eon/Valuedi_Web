import CoffeeIcon from '@/assets/icons/trophy/coffee.svg?react';
import NightIcon from '@/assets/icons/trophy/night.svg?react';
import NoSpendIcon from '@/assets/icons/trophy/no_spend.svg?react';
import MaxSpendIcon from '@/assets/icons/trophy/max_spend.svg?react';
import MinSpendIcon from '@/assets/icons/trophy/min_spend.svg?react';

export const TROPHY_ICONS = {
  coffee: CoffeeIcon,
  night: NightIcon,
  no_spend: NoSpendIcon,
  max_spend: MaxSpendIcon,
  min_spend: MinSpendIcon,
};

export type TrophyIconKey = keyof typeof TROPHY_ICONS;