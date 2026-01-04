import React from 'react';
import { cn } from '@/utils/cn';
import { Typography } from '@/components';
import SocialLoginButtons from '@/components/buttons/SocialLoginButtons'; // 💡 만들어둔 컴포넌트 import

interface SocialLoginContainerProps {
  className?: string;
  onKakaoClick?: () => void;
  onEmailClick?: () => void;
}

const SocialLoginContainer: React.FC<SocialLoginContainerProps> = ({ 
  className,
  onKakaoClick,
  onEmailClick 
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center bg-white', className)}>
      {/* 1. 상단 텍스트 영역 */}
      <div className="text-center space-y-4 my-4">
        <div className="space-y-1">
          <Typography variant="headline-2" weight="bold" className="text-neutral-100">
            로그인하고
          </Typography>
          <Typography variant="headline-2" weight="bold" className="text-neutral-100">
            금융 목표를 이뤄보세요.
          </Typography>
        </div>
        <Typography variant="body-2" className="text-neutral-60">
          당신을 위한 금융 서비스, 밸류디
        </Typography>
      </div>
      {/* 2. 버튼 그룹 영역 (컴포넌트 호출) */}
      <div className="mt-8">
        <SocialLoginButtons 
          onKakaoClick={onKakaoClick}
          onEmailClick={onEmailClick}
          text="통합로그인으로 계속하기" // 💡 원하는 텍스트로 커스텀

        />
      </div>
    </div>
  );
};


export default SocialLoginContainer;
