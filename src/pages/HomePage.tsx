import { useState } from 'react';

import {
  AuthRequestButton,
  AuthVerifyButton,
  LoginButton,
  MenuToggleButton,
  SocialLoginButtons,
  DuplicateCheckButton,
  SmallLoginButton,
  MenuButton,
  ViewMode,
  CheckBoxButton,
  ViewToggleButton,
  CategoryButton,
  MoreViewButton, // 👈 추가됨
} from '@/components/buttons';

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isAuthSent, setIsAuthSent] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedMenu, setSelectedMenu] = useState(false);

  const categories = ['전체', '자유적금', '정기예금', '청년도약계좌'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 font-sans">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">UI Component Gallery</h1>
        <p className="text-gray-500">Button System</p>
      </div>

      {/* 그리드 레이아웃 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ----------------------------------------------------------------
            Section 1: 주요 로그인/가입 액션
        ---------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center gap-6">
          <h2 className="text-lg font-bold text-gray-800 w-full border-b pb-4 mb-2">Main Actions</h2>

          {/* 로그인 */}
          <div className="w-full flex flex-col gap-3">
            <LoginButton />
            <LoginButton disabled />
          </div>

          <div className="w-full border-t border-gray-100"></div>

          {/* 작은 로그인 */}
          <SmallLoginButton />
        </section>

        {/* ----------------------------------------------------------------
            Section 2: 소셜 & 메뉴 네비게이션
        ---------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center gap-8">
          <h2 className="text-lg font-bold text-gray-800 w-full border-b pb-4 mb-2">Social & Nav</h2>

          {/* 소셜 로그인 */}
          <SocialLoginButtons />

          <div className="w-full border-t border-gray-100"></div>

          {/* 메뉴 토글 */}
          <div
            className="p-4 bg-gray-50 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuToggleButton isOpen={isMenuOpen} onClick={() => {}} />
          </div>

          {/* 메뉴 탭 버튼 */}
          <div className="flex gap-4">
            <div onClick={() => setSelectedMenu(false)} className="cursor-pointer">
              <MenuButton isSelected={!selectedMenu} />
            </div>
            <div onClick={() => setSelectedMenu(true)} className="cursor-pointer">
              <MenuButton isSelected={selectedMenu} />
            </div>
          </div>

          <div className="w-full border-t border-gray-100"></div>

          {/* 👇 MoreViewButton 추가된 부분 👇 */}
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-500 font-medium">더보기 아이콘</span>
            <MoreViewButton onClick={() => console.log('더보기 클릭!')} />
          </div>
        </section>

        {/* ----------------------------------------------------------------
            Section 3: 폼 기능 & 인증
        ---------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-8">
          <h2 className="text-lg font-bold text-gray-800 w-full border-b pb-4 mb-2">Form & Auth</h2>

          {/* 중복 확인 */}
          <div className="flex gap-3 justify-center">
            <DuplicateCheckButton />
            <DuplicateCheckButton disabled />
          </div>

          <div className="w-full border-t border-gray-100"></div>

          {/* 인증 요청/완료 플로우 */}
          <div className="flex items-center justify-center gap-3">
            <AuthRequestButton isSent={isAuthSent} onClick={() => setIsAuthSent(!isAuthSent)} />
            <span className="text-gray-300">➜</span>
            <AuthVerifyButton onClick={() => alert('인증 확인!')} />
          </div>

          <div className="w-full border-t border-gray-100"></div>

          {/* 체크박스 */}
          <div
            className="flex items-center justify-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded"
            onClick={() => setIsChecked(!isChecked)}
          >
            <CheckBoxButton isChecked={isChecked} />
            <span className={`text-sm ${isChecked ? 'text-black font-bold' : 'text-gray-400'}`}>약관에 동의합니다</span>
          </div>
        </section>

        {/* ----------------------------------------------------------------
            Section 4: 뷰 전환 & 필터
        ---------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-6 md:col-span-2 lg:col-span-3">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-4">View Control & Filters</h2>

          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            {/* 뷰 토글 */}
            <ViewToggleButton mode={viewMode} onToggle={setViewMode} />

            {/* 구분선 (모바일:가로, PC:세로) */}
            <div className="hidden md:block w-[1px] h-[60px] bg-gray-100"></div>
            <div className="block md:hidden w-full h-[1px] bg-gray-100"></div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <CategoryButton
                  key={cat}
                  text={cat}
                  isSelected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
