import React from 'react';
import { cn } from '@/utils/cn';
import type { ColorToken, TypographyStyle } from '@/styles/design-system';

export type TypographyVariant =
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'headline-1'
  | 'headline-2'
  | 'headline-3'
  | 'body-1'
  | 'body-1-reading'
  | 'body-2'
  | 'body-3'
  | 'caption-1'
  | 'caption-2';

export type TypographyWeight = 'bold' | 'medium' | 'regular' | 'semi-bold';

export type TypographyFontFamily = 'pretendard' | 'preahvihear';

export interface TypographyProps {
  /**
   * 타이포그래피 변형
   */
  variant: TypographyVariant;
  /**
   * 폰트 두께
   * @default 'regular'
   */
  weight?: TypographyWeight;
  /**
   * 폰트 패밀리
   * @default 'pretendard'
   */
  fontFamily?: TypographyFontFamily;
  /**
   * HTML 태그
   * @default 'p'
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * 텍스트 색상
   * ColorToken 타입을 우선 사용하며, 기존 호환성을 위해 string도 허용합니다.
   */
  color?: ColorToken | 'title' | 'body' | 'sub-body' | 'disabled' | string;
  /**
   * 자식 요소
   */
  children: React.ReactNode;
  /**
   * 추가 클래스명
   */
  className?: string;
}

/**
 * Typography 컴포넌트
 *
 * 디자인 시스템의 타이포그래피를 타입 안전하게 사용할 수 있게 해주는 컴포넌트입니다.
 * 모든 스타일은 Tailwind 클래스를 통해 적용됩니다.
 *
 * @example
 * ```tsx
 * <Typography variant="title-1" weight="bold" color="title">
 *   메인 제목
 * </Typography>
 *
 * <Typography variant="body-1" weight="regular" color="body">
 *   본문 텍스트
 * </Typography>
 * ```
 */

/**
 * variant를 Tailwind fontSize 클래스로 변환
 */
const variantToFontSizeClass: Record<TypographyVariant, string> = {
  'title-1': 'text-title-1',
  'title-2': 'text-title-2',
  'title-3': 'text-title-3',
  'headline-1': 'text-headline-1',
  'headline-2': 'text-headline-2',
  'headline-3': 'text-headline-3',
  'body-1': 'text-body-1',
  'body-1-reading': 'text-body-1-reading',
  'body-2': 'text-body-2',
  'body-3': 'text-body-3',
  'caption-1': 'text-caption-1',
  'caption-2': 'text-caption-2',
};

/**
 * weight를 Tailwind fontWeight 클래스로 변환
 */
const weightToFontWeightClass: Record<TypographyWeight, string> = {
  bold: 'font-bold',
  medium: 'font-medium',
  regular: 'font-regular',
  'semi-bold': 'font-semi-bold',
};

/**
 * ColorToken을 Tailwind text color 클래스로 매핑하는 객체
 * design-system.ts의 ColorToken과 1:1 매핑
 */
const colorTokenToClass: Record<ColorToken, string> = {
  // Neutral colors
  'neutral-0': 'text-neutral-0',
  'neutral-10': 'text-neutral-10',
  'neutral-20': 'text-neutral-20',
  'neutral-30': 'text-neutral-30',
  'neutral-40': 'text-neutral-40',
  'neutral-50': 'text-neutral-50',
  'neutral-60': 'text-neutral-60',
  'neutral-70': 'text-neutral-70',
  'neutral-80': 'text-neutral-80',
  'neutral-90': 'text-neutral-90',
  'neutral-100': 'text-neutral-100',
  // Base colors
  'white': 'text-white',
  'black': 'text-black',
  'bg': 'text-bg',
  // Primary colors
  'pri-normal': 'text-primary-normal',
  'pri-strong': 'text-primary-strong',
  'pri-heavy': 'text-primary-heavy',
  'pri-light': 'text-primary-light',
  // Text colors
  'text-title': 'text-text-title',
  'text-body': 'text-text-body',
  'text-sub-body': 'text-text-sub-body',
  'text-disabled': 'text-text-disabled',
};

/**
 * 기존 호환성을 위한 별칭 매핑 (title -> text-text-title)
 */
const colorAliasToClass: Record<'title' | 'body' | 'sub-body' | 'disabled', string> = {
  'title': 'text-text-title',
  'body': 'text-text-body',
  'sub-body': 'text-text-sub-body',
  'disabled': 'text-text-disabled',
};

/**
 * color prop을 Tailwind text color 클래스로 변환
 * ColorToken 타입을 우선 처리하며, 기존 호환성을 위해 string도 지원합니다.
 * 
 * @param color - ColorToken 또는 색상 문자열
 * @returns Tailwind text color 클래스명
 */
const getColorClass = (color?: ColorToken | 'title' | 'body' | 'sub-body' | 'disabled' | string): string => {
  if (!color) return '';

  // text- 접두사가 이미 있는 경우 그대로 사용 (기존 호환성)
  if (color.startsWith('text-')) {
    return color;
  }

  // ColorToken 직접 매핑 (O(1) 조회)
  if (color in colorTokenToClass) {
    return colorTokenToClass[color as ColorToken];
  }

  // 기존 호환성을 위한 별칭 처리 (title, body, sub-body, disabled)
  if (color in colorAliasToClass) {
    return colorAliasToClass[color as 'title' | 'body' | 'sub-body' | 'disabled'];
  }

  // primary 색상 처리 (pri-normal -> text-primary-normal)
  // ColorToken에 포함되어 있지만, 동적 처리도 지원
  if (color.startsWith('pri-')) {
    const primaryVariant = color.replace('pri-', '');
    return `text-primary-${primaryVariant}`;
  }

  // atomic 색상 처리 (예: atomic-red-50 -> text-atomic-red-50)
  // 주의: ColorToken에는 atomic 색상이 없지만, 확장성을 위해 지원
  if (color.startsWith('atomic-')) {
    return `text-${color}`;
  }

  // 기타 색상은 text- 접두사를 추가하여 처리
  return `text-${color}`;
};

export const Typography: React.FC<TypographyProps> = ({
  variant,
  weight = 'regular',
  fontFamily = 'pretendard',
  as,
  color,
  children,
  className,
  ...props
}) => {
  // variant에 따른 기본 태그 결정
  const defaultTag = getDefaultTag(variant);
  const Component = (as || defaultTag) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

  // 폰트 패밀리 클래스 생성
  const fontFamilyClass = `font-${fontFamily}`;

  // Tailwind 클래스 조합
  const fontSizeClass = variantToFontSizeClass[variant];
  const fontWeightClass = weightToFontWeightClass[weight];
  const colorClass = getColorClass(color);

  // 최종 클래스 조합
  const classes = cn(
    fontSizeClass,
    fontWeightClass,
    fontFamilyClass,
    colorClass,
    className
  );

  return (
    <Component className={classes} {...(props as React.HTMLAttributes<HTMLElement>)}>
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';

/**
 * variant에 따른 기본 HTML 태그 반환
 */
function getDefaultTag(variant: TypographyVariant): 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' {
  if (variant.startsWith('title')) return 'h1';
  if (variant.startsWith('headline')) return 'h2';
  if (variant.startsWith('body')) return 'p';
  if (variant.startsWith('caption')) return 'span';
  return 'p';
}

/**
 * TypographyStyle 타입을 파싱하여 variant와 weight를 추출
 * 
 * @note 현재 Typography 컴포넌트는 variant와 weight를 분리해서 사용하는 구조입니다.
 * TypographyStyle을 직접 사용하려면 컴포넌트 구조를 변경해야 합니다.
 * 이 함수는 향후 확장을 위해 제공되며, 현재는 사용되지 않습니다.
 * 
 * @example
 * ```tsx
 * const { variant, weight } = parseTypographyStyle('text-title-36-bold');
 * // { variant: 'title-1', weight: 'bold' }
 * ```
 */
export function parseTypographyStyle(style: TypographyStyle): { variant: TypographyVariant; weight: TypographyWeight } {
  // 'text-title-36-bold' -> ['text', 'title', '36', 'bold']
  const parts = style.replace('text-', '').split('-');
  
  // variant 추출
  let variant: TypographyVariant;
  const variantPart = parts[0]; // 'title', 'headline', 'body', 'caption'
  const sizePart = parts[1]; // '36', '28', '24', etc.
  const readingPart = parts[2]; // 'reading' (optional)
  
  if (variantPart === 'title') {
    if (sizePart === '36') variant = 'title-1';
    else if (sizePart === '28') variant = 'title-2';
    else if (sizePart === '24') variant = 'title-3';
    else variant = 'title-1'; // fallback
  } else if (variantPart === 'headline') {
    if (sizePart === '22') variant = 'headline-1';
    else if (sizePart === '20') variant = 'headline-2';
    else if (sizePart === '18') variant = 'headline-3';
    else variant = 'headline-1'; // fallback
  } else if (variantPart === 'body') {
    if (sizePart === '16') {
      variant = readingPart === 'reading' ? 'body-1-reading' : 'body-1';
    } else if (sizePart === '14') variant = 'body-2';
    else if (sizePart === '13') variant = 'body-3';
    else variant = 'body-1'; // fallback
  } else if (variantPart === 'caption') {
    if (sizePart === '12') variant = 'caption-1';
    else if (sizePart === '11') variant = 'caption-2';
    else variant = 'caption-1'; // fallback
  } else {
    variant = 'body-1'; // fallback
  }
  
  // weight 추출
  const weightIndex = readingPart === 'reading' ? 3 : 2;
  const weightPart = parts[weightIndex] || 'regular';
  const weight: TypographyWeight = 
    weightPart === 'bold' ? 'bold' :
    weightPart === 'medium' ? 'medium' :
    weightPart === 'semi-bold' ? 'semi-bold' :
    'regular';
  
  return { variant, weight };
}
