import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import CardGNB from '@/components/card/CardGNB';
import { Typography } from '@/components/typography';
import { BaseButton } from '@/components/buttons/BaseButton';
import AuthInput from '@/components/login/AuthInput';

const CardPasswordInputPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const userName = '김휘주'; // TODO: 실제 사용자 이름으로 변경

  const handleBack = () => {
    navigate(-1);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNext = () => {
    if (password.trim()) {
      // 카드 추가 연결 확인 페이지로 이동
      navigate('/card/additional');
    }
  };

  return (
    <MobileLayout>
      <div className="w-full bg-white">
        <CardGNB onBack={handleBack} />
      </div>

      {/* Title */}
      <div className="flex flex-col items-center justify-center w-[320px] mx-auto mt-[20px]">
        <div className="flex items-center w-full">
          <Typography style="text-headline-3-18-semi-bold" className="text-neutral-90 tracking-[-0.36px]">
            <p className="mb-0">{userName}님의 카드 비밀번호를</p>
            <p>알려주세요</p>
          </Typography>
        </div>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-[8px] items-start w-[320px] mx-auto mt-[48px]">
        <AuthInput
          label="카드사 비밀번호"
          placeholder="해당 카드사의 비밀번호를 입력해주세요."
          type="password"
          name="cardPassword"
          value={password}
          onChange={handlePasswordChange}
          width="full"
        />
      </div>

      {/* Button */}
      <div className="absolute bottom-[41px] left-1/2 transform -translate-x-1/2 w-[320px]">
        <BaseButton
          variant="primary"
          size="medium"
          text="다음으로"
          fullWidth
          onClick={handleNext}
          disabled={!password.trim()}
        />
      </div>
    </MobileLayout>
  );
};

export default CardPasswordInputPage;
