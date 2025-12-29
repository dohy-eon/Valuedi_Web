import React from 'react';
import { cn } from '@/utils/cn';

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
   */
  color?: 'title' | 'body' | 'sub-body' | 'disabled' | string;
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
// variant와 CSS 변수 매핑
const variantToStyles: Record<
  TypographyVariant,
  {
    fontSize: string;
    lineHeight: string;
    letterSpacing: string;
  }
> = {
  'title-1': {
    fontSize: 'var(--font-size-10)',
    lineHeight: 'var(--line-height-0)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'title-2': {
    fontSize: 'var(--font-size-9)',
    lineHeight: 'var(--line-height-3)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'title-3': {
    fontSize: 'var(--font-size-8)',
    lineHeight: 'var(--line-height-6)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'headline-1': {
    fontSize: 'var(--font-size-7)',
    lineHeight: 'var(--line-height-9)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'headline-2': {
    fontSize: 'var(--font-size-6)',
    lineHeight: 'var(--line-height-12)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'headline-3': {
    fontSize: 'var(--font-size-5)',
    lineHeight: 'var(--line-height-15)',
    letterSpacing: 'var(--letter-spacing-1)',
  },
  'body-1': {
    fontSize: 'var(--font-size-4)',
    lineHeight: 'var(--line-height-18)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'body-1-reading': {
    fontSize: 'var(--font-size-4)',
    lineHeight: 'var(--line-height-15)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'body-2': {
    fontSize: 'var(--font-size-3)',
    lineHeight: 'var(--line-height-24)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'body-3': {
    fontSize: 'var(--font-size-2)',
    lineHeight: 'var(--line-height-27)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'caption-1': {
    fontSize: 'var(--font-size-1)',
    lineHeight: 'var(--line-height-30)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
  'caption-2': {
    fontSize: 'var(--font-size-0)',
    lineHeight: 'var(--line-height-30)',
    letterSpacing: 'var(--letter-spacing-0)',
  },
};

// fontWeight 매핑
const weightToFontWeight: Record<TypographyWeight, string> = {
  bold: 'var(--font-weight-bold)',
  medium: 'var(--font-weight-medium)',
  regular: 'var(--font-weight-regular)',
  'semi-bold': 'var(--font-weight-regular)', // preahvihear 사용
};

// fontFamily 매핑
const familyToFontFamily: Record<TypographyFontFamily, string> = {
  pretendard: 'var(--font-family-pretendard)',
  preahvihear: 'var(--font-family-preahvihear)',
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

  // 폰트 패밀리 결정 로직
  // semi-bold는 preahvihear 사용
  const finalFontFamily = weight === 'semi-bold' ? 'preahvihear' : fontFamily;

  // 스타일 객체 생성
  const styles = variantToStyles[variant];
  const inlineStyles: React.CSSProperties = {
    fontSize: styles.fontSize,
    lineHeight: styles.lineHeight,
    letterSpacing: styles.letterSpacing,
    fontFamily: familyToFontFamily[finalFontFamily],
    fontWeight: weightToFontWeight[weight],
  };

  // 색상 클래스 생성
  const colorClass = color
    ? color.startsWith('text-') || color.includes('-')
      ? `text-${color}`
      : `text-text-${color}`
    : '';

  const classes = cn(colorClass, className);

  return (
    <Component className={classes} style={inlineStyles} {...(props as any)}>
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
