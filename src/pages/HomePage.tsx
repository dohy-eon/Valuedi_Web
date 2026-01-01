import { Typography } from '@/components/Typography';
import SocialLoginContainer from '@/components/login/SocialLoginContainer';
import BaseLoginContainer from '@/components/login/BaseLoginContainer';
import SignUpContainer from '@/components/login/SignUpContainer';

export const HomePage = () => {
  const handleLogin = () => {
    console.log('로그인 시도');
  };

  const handleAction = (action: string, data?: any) => {
  console.log(`${action} action triggered`, data || '');
};


  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-10 font-pretendard">
      
      {/* 테스트 페이지 타이틀 */}
      <div className="mb-12 text-center">
        <Typography variant="headline-1" weight="bold" className="text-neutral-100">
          로그인 묶음 컴포넌트
        </Typography>
      </div>

      <div className="flex flex-row items-start justify-center gap-12 flex-wrap">
        
        {/* 1. 소셜 로그인 버전 (SocialLoginContainer) */}
        <div className="flex flex-col items-center gap-4">
        <Typography variant="body-2" className="text-neutral-60 mt-2">
          소셜로그인
        </Typography>
          <SocialLoginContainer />
        </div>

        {/* 2. 아이디/비밀번호 로그인 버전 (BaseLoginContainer) */}
        <div className="flex flex-col items-center gap-4">
          <Typography variant="body-2" className="text-neutral-60 mt-2">
          아이디/비밀번호 로그인
          </Typography>
          <BaseLoginContainer onLogin={handleLogin} />
        </div>

        {/* 3. 회원가입 (SignUpContainer) */}
        <div className="flex flex-col items-center gap-4">
          <Typography variant="body-2" className="text-neutral-60 mt-2">
          회원가입
          </Typography>
          <SignUpContainer onSignUp={(data) => handleAction('Sign Up', data)} />
        </div>

      </div>
    </div>
  );
};

export default HomePage;