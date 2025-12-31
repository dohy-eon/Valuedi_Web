import { useAuthForm } from '@/hooks/useAuthForm';
import AuthInput from '@/components/login/AuthInput';
import { AddButton, AuthRequestButton, AuthVerifyButton, KakaoContinueButton, LoginButton, MenuToggleButton, SocialLoginButtons, DuplicateCheckButton } from '@/components/buttons';
import { useState } from 'react';

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthSent, setIsAuthSent] = useState(false);
  // 커스텀 훅에서 모든 상태와 핸들러를 가져옵니다.
  const auth = useAuthForm();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">공용 컴포넌트</h1>
        </div>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans">
          <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* [좌측] 버튼 모음 테스트 섹션 */}
              <div className="space-y-6">
                <p className="text-gray-500">버튼 모음입니다.</p>
                
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

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">
                  <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-6 w-full text-left">
                    소셜 연결 (Social Connect)
                  </h2>
                  <SocialLoginButtons />
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-6">인터랙션 (Interactive)</h2>
                  <div className="flex justify-around items-center py-2">
                    <div className="flex flex-col items-center gap-3 group cursor-pointer">
                      <AddButton onClick={() => alert('Add Clicked!')} />
                      <span className="text-xs text-gray-400 font-mono">Add</span>
                    </div>
                    <div className="w-[1px] h-[50px] bg-gray-100"></div>
                    <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <MenuToggleButton isOpen={isMenuOpen} onClick={() => {}} />
                      <span className="text-xs text-gray-400 font-mono">{isMenuOpen ? 'Open' : 'Closed'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-6">폼 기능 (Form Utilities)</h2>
                  <div className="flex flex-col gap-8">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-90"></span>
                        <h3 className="text-sm font-semibold text-gray-700">중복 확인 (Single Action)</h3>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="flex flex-col gap-1 items-center">
                          <DuplicateCheckButton />
                          <span className="text-[10px] text-gray-400 font-mono">Active</span>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                          <DuplicateCheckButton disabled />
                          <span className="text-[10px] text-gray-400 font-mono">Disabled</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full border-t border-gray-100 border-dashed"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-normal"></span>
                        <h3 className="text-sm font-semibold text-gray-700">인증 프로세스 (Flow)</h3>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-6">
                        <div className="flex flex-col gap-2">
                          <span className="text-xs text-gray-500 font-medium">Step 1. 정상 케이스</span>
                          <div className="flex flex-wrap gap-2 items-center">
                            <AuthRequestButton isSent={isAuthSent} onClick={() => setIsAuthSent(!isAuthSent)} />
                            <span className="text-gray-300">→</span>
                            <AuthVerifyButton onClick={() => alert('인증 완료')} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        {/* [우측] 회원가입 폼 테스트 섹션 */}
        <div className="space-y-6">
          <p className="text-gray-500">로그인 모음입니다.</p>
          
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 space-y-10">
            
            {/* 1. 아이디 테스트 (단독) */}
            <AuthInput
              label="아이디"
              value={auth.id}
              onChange={auth.handleIdChange}
              placeholder="아이디를 입력해주세요."
              error={auth.idError}
            />

            {/* 2. 비밀번호 테스트 (단독) */}
            <AuthInput
              label="비밀번호"
              type="password"
              value={auth.pw}
              onChange={auth.handlePwChange}
              placeholder="비밀번호를 입력해주세요."
              error={auth.pwError}
            />

            {/* 3. 아이디 중복 확인 (버튼 결합형) */}
            <AuthInput
              label="아이디 중복 확인"
              value={auth.idCheck}
              onChange={(e) => { auth.setIdCheck(e.target.value); auth.setIsTyping(true); }}
              placeholder="아이디를 입력해주세요."
              rightElement={
                <DuplicateCheckButton 
                  disabled={auth.idCheck.length === 0 || !auth.isTyping} 
                  onClick={auth.handleDuplicateCheck}
                />
              }
              error={auth.idCheckError}
              success={auth.idCheckSuccess}
            />

            {/* 4. 이름 */}
            <AuthInput
              label="이름"
              value={auth.userName}
              onChange={auth.handleNameChange}
              placeholder="이름을 입력해주세요."
              error={auth.nameError}
              success={auth.userName.length >= 2 && !auth.nameError ? "올바른 이름 형식입니다." : ""}
            />

            {/* 5. 전화번호 인증 섹션 (212px 조합) */}
            <div className="space-y-2">
              <AuthInput
                label="전화번호"
                value={auth.phone}
                width="212px"
                onChange={auth.handlePhoneChange}
                placeholder="-없이 전화번호를 입력해주세요"
                error={auth.phoneError}
                rightElement={
                  <AuthRequestButton 
                    disabled={auth.phone.length < 10 || !!auth.phoneError || auth.isVerified} 
                    isSent={auth.isRequested} 
                    onClick={() => auth.setIsRequested(true)} 
                  />
                }
              />
              <AuthInput
                name="auth_code"
                value={auth.verifyCode}
                width="232px" 
                isGrayBg={!auth.isRequested || auth.isVerified}
                onChange={(e) => auth.setVerifyCode(e.target.value)}
                placeholder="인증번호를 입력해주세요"
                error={auth.verifyError}
                success={auth.verifySuccess}
                rightElement={
                  <AuthVerifyButton 
                    disabled={!auth.isRequested || auth.verifyCode.length === 0 || auth.isVerified} 
                    onClick={auth.handleVerifyButtonClick} 
                  />
                }
              />
            </div>

            {/* 6. 비밀번호 재확인 테스트 (세로 배치형) */}
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <AuthInput
                  label="비밀번호"
                  type="password"
                  value={auth.pw2}
                  onChange={auth.handlePw2Change}
                  placeholder="비밀번호를 입력해주세요."
                  error={auth.pw2Error}
                />
                <AuthInput
                  type="password"
                  value={auth.confirmPw2}
                  onChange={auth.handleConfirmPw2Change}
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  error={auth.confirmPw2Error}
                  success={auth.confirmPw2Success}
                />
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