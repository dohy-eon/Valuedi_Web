import { useState } from 'react';
import {
  KakaoContinueButton,
  LoginButton,
  SocialLoginButtons,
  DuplicateCheckButton,
  AuthRequestButton,
  AuthVerifyButton,
  AddButton,
  MenuToggleButton,
} from '@/components/buttons';

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthSent, setIsAuthSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">공용 컴포넌트</h1>
          <p className="text-gray-500">버튼 모음입니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            {/* 1. 메인 로그인 버튼들 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-6">로그인 (Login Actions)</h2>
              <div className="flex flex-col gap-4 items-center">
                <KakaoContinueButton />
                <KakaoContinueButton variant="white" />
                <div className="w-full border-t border-gray-100 my-1"></div>
                <LoginButton />
                <LoginButton disabled />
              </div>
            </div>

            {/* 2. 소셜 아이콘 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-6 w-full text-left">
                소셜 연결 (Social Connect)
              </h2>
              <SocialLoginButtons />
            </div>
          </div>

          <div className="space-y-6">
            {/* 3. 인터랙션 버튼 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-6">인터랙션 (Interactive)</h2>
              <div className="flex justify-around items-center py-2">
                {/* Add Button */}
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                    <AddButton onClick={() => alert('Add Clicked!')} />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">Add</span>
                </div>

                <div className="w-[1px] h-[50px] bg-gray-100"></div>

                {/* Menu Toggle */}
                <div
                  className="flex flex-col items-center gap-3 cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full">
                    <MenuToggleButton isOpen={isMenuOpen} onClick={() => {}} />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">{isMenuOpen ? 'Open' : 'Closed'}</span>
                </div>
              </div>
            </div>

            {/* 4. 폼 기능 버튼 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-6">폼 기능 (Form Utilities)</h2>

              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-90"></span>
                    <h3 className="text-sm font-semibold text-gray-700">중복 확인 (Single Action)</h3>
                  </div>

                  <div className="flex gap-3 items-center">
                    {/* Active */}
                    <div className="flex flex-col gap-1 items-center">
                      <DuplicateCheckButton />
                      <span className="text-[10px] text-gray-400 font-mono">Active</span>
                    </div>
                    {/* Disabled */}
                    <div className="flex flex-col gap-1 items-center">
                      <DuplicateCheckButton disabled />
                      <span className="text-[10px] text-gray-400 font-mono">Disabled</span>
                    </div>
                  </div>
                </div>

                <div className="w-full border-t border-gray-100 border-dashed"></div>

                {/* 섹션 B: 인증 프로세스 (흐름 동작) */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-normal"></span>
                    <h3 className="text-sm font-semibold text-gray-700">인증 프로세스 (Flow)</h3>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-6">
                    {/* 시나리오 1: 정상 동작 */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-gray-500 font-medium">Step 1. 정상 케이스</span>
                      <div className="flex flex-wrap gap-2 items-center">
                        <AuthRequestButton isSent={isAuthSent} onClick={() => setIsAuthSent(!isAuthSent)} />
                        <span className="text-gray-300">→</span>
                        <AuthVerifyButton onClick={() => alert('인증 완료')} />
                      </div>
                    </div>

                    {/* 시나리오 2: 비활성/에러 */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs text-gray-500 font-medium">Step 2. 비활성 케이스</span>
                      <div className="flex flex-wrap gap-2 items-center">
                        <AuthRequestButton disabled />
                        <span className="text-gray-300">→</span>
                        <AuthVerifyButton disabled />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
