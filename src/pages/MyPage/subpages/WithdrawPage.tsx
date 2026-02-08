import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import BackPageGNB from '@/components/gnb/BackPageGNB';
import { Typography } from '@/components';
import { LoginButton } from '@/components/buttons';
import CheckBoxButton from '@/components/mypage/WithdrawCheckBoxButton';
import { cn } from '@/utils/cn';

const WITHDRAW_REASONS = [
  '금융 관리에 도움이 되지 않았어요',
  '사용이 어려워요',
  '필요한 기능이 없어요',
  '보안이 걱정돼요',
  '오류가 자주 발생해요',
  '기타',
];

export const WithdrawPage = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleWithdraw = () => {
    if (!selectedReason) return;
    // 💡 탈퇴 처리 로직 후 로그인 페이지로 이동
    console.log('선택된 탈퇴 사유:', selectedReason);
    navigate('/login', { replace: true });
  };

  return (
    <MobileLayout className={cn('bg-neutral-0 flex flex-col h-screen')}>
      {/* 1. 상단 GNB */}
      <BackPageGNB
        title="탈퇴하기"
        onBack={() => navigate(-1)}
        className="bg-neutral-0"
        titleColor="text-neutral-90"
        text=""
      />

      <div className={cn('flex flex-col flex-1 px-[20px] justify-between')}>
        {/* 상단 타이틀 및 설명 영역 */}
        <div className={cn('flex flex-col gap-[12px] mt-[20px]')}>
          <Typography style="text-headline-3-18-semi-bold" className={cn('text-neutral-90')}>
            밸류디를 떠나는 사유를
            <br />
            선택해 주세요
          </Typography>
        </div>

        {/* 3. 탈퇴 사유 리스트 영역 */}
        <div className="w-full">
          {WITHDRAW_REASONS.map((reason) => {
            const isSelected = selectedReason === reason;
            return (
              <div
                key={reason}
                className={cn('flex items-center w-full py-3 px-3')}
                onClick={() => setSelectedReason(reason)}
              >
                <CheckBoxButton isChecked={isSelected} className="mr-[12px] shrink-0" />
                <Typography variant="body-2" weight="medium" className={cn('flex-1 text-left text-neutral-90')}>
                  {reason}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. 하단 안내 및 버튼 영역 */}
      <div className="px-5 py-5">
        {/* 하단 안내 문구 박스 (디자인 가이드 준수) */}
        <div className="bg-neutral-10 p-4 rounded-xl mb-6">
          <Typography variant="caption-1" className="text-neutral-50 leading-[18px] tracking-[-0.02em]">
            밸류디 탈퇴 시 모든 전송요구는 철회되며, 회원 탈퇴와 동시에 서비스 이용이 종료됩니다. 밸류디는 원칙적으로
            이용자의 개인정보를 회원 탈퇴 시까지 보유하며, 회원 탈퇴 시 그동안 수집한 개인신용정보는 모두 삭제됩니다.
            다만, 관련 법령 준수, 부정 이용 및 남용 방지, 분쟁 및 민원 처리를 위해 필요한 최소한의 개인정보는 최대 5년간
            보관될 수 있습니다.
            <br />
            자세한 내용은<span className="underline cursor-pointer ml-1">개인정보처리방침</span>을 참고하시기 바랍니다.
          </Typography>
        </div>

        <div className="flex flex-col items-center justify-center">
          <LoginButton
            text="탈퇴하기"
            onClick={handleWithdraw}
            disabled={!selectedReason}
            className={cn(
              'border-none',
              selectedReason ? 'text-neutral-90 font-bold' : 'bg-atomic-yellow-70 text-neutral-40'
            )}
          />
        </div>
      </div>
    </MobileLayout>
  );
};
