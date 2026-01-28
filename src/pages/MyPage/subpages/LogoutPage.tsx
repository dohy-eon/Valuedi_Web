import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { Typography } from '@/components';
import { LoginButton } from '@/components/buttons';
import { cn } from '@/utils/cn';

export const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 💡 실제 로그아웃 처리 로직 (예: 토큰 삭제, 스토리지 초기화 등)
    console.log('로그아웃 완료');

    // 💡 로그아웃 후 로그인 페이지(/login)로 이동
    // replace: true를 사용하여 로그아웃 후 뒤로가기를 눌러도 다시 이 페이지로 오지 않게 합니다.
    navigate('/login', { replace: true });
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지(설정)로 돌아가기
  };

  return (
    <MobileLayout className={cn('bg-neutral-0 flex flex-col h-screen')}>
      {/* 상단 GNB */}
      <BackPageGNB
        title="로그아웃"
        onBack={handleCancel}
        className="bg-neutral-0"
        titleColor="text-neutral-90"
        text=""
      />

      <div className={cn('flex flex-col flex-1 px-[20px] justify-between')}>
        {/* 상단 타이틀 및 설명 영역 */}
        <div className={cn('flex flex-col gap-[12px] mt-[20px]')}>
          <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90')}>
            밸류디를
            <br />
            로그아웃하시겠어요?
          </Typography>
          <Typography style="text-body-2-14-regular" className={cn('text-neutral-70')}>
            로그아웃 시 모든 전송요구는 철회되며,
            <br />
            개인신용정보 또한 모두 삭제됩니다.
          </Typography>
        </div>

        {/* 하단 버튼 영역 */}
        <div className={cn('flex flex-col items-center justify-center pb-[40px] gap-[8px]')}>
          <button type="button" onClick={handleCancel} className={cn('cursor-pointer px-[10px] py-[8px]')}></button>

          <LoginButton text="로그아웃하기" onClick={handleLogout} className="text-neutral-90 border-none" />
        </div>
      </div>
    </MobileLayout>
  );
};
