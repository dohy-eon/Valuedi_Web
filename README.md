# 💰 VALUEDI - 밸류디

> 개인의 소비 패턴 및 금융 성향을 분석하여 최적화된 맞춤형 자산 관리 경험을 제공하는 금융 솔루션

---

## 🌿 Branch Strategy

효율적인 협업을 위해 **이슈/기능 단위의 브랜치 전략**과 **Squash Merge** 방식 채택

### 브랜치 네이밍 규칙
형식: `태그/작업명`
- `feat/` : 신규 기능 개발
- `fix/` : 오류 수정
- `refactor/` : 코드 개선 및 리팩토링
- `docs/` : 문서 수정
- `chore/` : 기타 변경 사항
- **예시**: `feat/login`, `fix/login-error`, `refactor/main-api`

---

## 🚀 Tech Stack & Decision Making

### Framework & Language
- **React 18.2**
  - **보안 최우선**: React 19의 보안 취약점(CVE-2025-55182)을 고려하여 안정성이 검증된 버전 채택
  - **성능 최적화**: Concurrency Rendering 및 Automatic Batching을 활용한 UI 응답성 확보
- **TypeScript**: 정적 타이핑을 통해 런타임 에러를 방지하고 팀 간 인터페이스 협업 정확도 향상
- **Vite**: Webpack 대비 압도적인 빌드 속도와 효율적인 HMR을 통한 개발 생산성 극대화

### State Management
- **Zustand**: Context API의 불필요한 리렌더링 문제를 해결하고, Redux 대비 간결한 보일러플레이트로 상태 관리 로직 경량화
- **TanStack Query (v5)**: 직접 구현하기 복잡한 서버 데이터의 캐싱, 신선도 관리 및 HTTP 요청 상태를 선언적으로 처리

### Style & Interaction
- **Tailwind CSS**: CSS-in-JS의 런타임 오버헤드 없이 빌드 타임 스타일 생성을 통해 모바일 최적화 및 초기 렌더링 성능 확보
- **PostCSS**: Tailwind CSS의 핵심 엔진으로 활용하며, 최신 CSS 문법을 모든 브라우저에 대응하도록 자동 변환하여 호환성 보장
- **Framer-motion**: `react-spring` 대비 낮은 러닝 커브와 직관적인 API를 보유하여 바텀 시트 등 고도화된 인터랙션을 효율적으로 구현
- **Tailwind-merge / clsx**: 공용 컴포넌트 설계 시 외부 주입 스타일과 내부 기본 스타일 간의 충돌을 방지하고 조건부 스타일 가독성 확보

### Dev Tools
- **Storybook**: 비즈니스 로직과 분리된 독립적 UI 개발 환경을 구축하여 컴포넌트 재사용성 및 테스트 편의성 제고
- **Vite-plugin-svgr**: SVG 이미지를 React 컴포넌트화하여 Props 기반의 유연한 스타일링 제어 환경 구축
- **ESLint / Prettier**: 코드 컨벤션을 자동화하여 코드 품질을 유지하고 로직 설계에만 집중할 수 있는 환경 조성

---

## 🏛️ Project Architecture

```text
src/
├── assets/          # 정적 자원
├── components/      # 전역 공용 컴포넌트
├── features/        # 도메인별 비즈니스 로직 및 API
├── hooks/           # 커스텀 훅 및 글로벌 Store
├── lib/             # 라이브러리 설정
├── pages/           # 라우트별 페이지
├── router/          # 라우팅 정의
├── stories/         # Storybook 명세
├── styles/          # 전역 스타일 및 테마
├── utils/           # 범용 유틸리티 함수
├── App.tsx          # 루트 컴포넌트
└── main.tsx         # 엔트리 포인트
```

---

## 👥 Members
- **최도현** / **임혜미** / **강승희** / **변상우**