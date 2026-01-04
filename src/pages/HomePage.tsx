import React from 'react';
import SignUpContainer from '@/components/login/SignUpContainer';
import { useAuthForm } from '@/hooks/useAuthForm';

export const HomePage = () => {
  // 💡 최종 회원가입 완료 시 호출되는 함수
  const handleSignUpSubmit = (auth: ReturnType<typeof useAuthForm>) => {
    // 서버로 보낼 최종 데이터 객체 구성
    const finalData = {
      id: auth.id,
      name: auth.userName,
      residentNumber: `${auth.residentFront}-${auth.residentBack}`,
      email: auth.email,
      password: auth.pw,
      verifyCode: auth.verifyCode,
    };

    console.log('회원가입 최종 데이터:', finalData);
    alert(`${finalData.name}님, 회원가입이 완료되었습니다!`);
  };

  return (
    // 배경색과 중앙 정렬 설정
      <div className="w-full">
        <SignUpContainer onSignUp={handleSignUpSubmit} />
      </div>
  );
};

export default HomePage;