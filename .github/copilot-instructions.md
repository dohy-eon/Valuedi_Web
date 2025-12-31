# Valuedi Web - AI Coding Agent Instructions

## Architecture Overview

This project follows **Feature-Based Architecture** where each feature is a self-contained module with its own components, API layer, and state management. The codebase is a React + TypeScript + Vite application with TanStack Query for server state and Zustand for client state.

### Key Technology Stack
- **Build Tool**: Vite with React plugin
- **State Management**: TanStack Query (server state) + Zustand (client state)
- **Styling**: Tailwind CSS with custom design tokens
- **Path Aliases**: `@/` resolves to `src/` (configured in both `tsconfig.json` and `vite.config.ts`)

## Project Structure Patterns

### Feature Module Structure
Features live in `src/features/[feature-name]/` with this standard organization:
```
features/[feature-name]/
├── [Feature]Page.tsx       # Main page component
├── [feature].api.ts        # TanStack Query hooks and API calls
├── [feature].store.ts      # Zustand store for client state
├── components/             # Feature-specific components
└── index.ts               # Public exports ONLY
```

**Critical**: Always export through `index.ts`. External imports must use `@/features/[feature-name]`, never direct file paths.

Example from `features/auth/index.ts`:
```typescript
export { AuthPage } from './AuthPage';
export { useAuthStore } from './auth.store';
export * from './auth.api';
```

### Component Organization
- **Shared components**: `src/components/` - reusable across multiple features
- **Feature components**: `src/features/[feature]/components/` - feature-specific only
- **Always export through**: `src/components/index.ts` for shared components

### State Management Guidelines
1. **Server state** (API data, caching): Use TanStack Query in `*.api.ts` files
2. **Client state** (UI state, auth): Use Zustand in `*.store.ts` files
3. TanStack Query client is pre-configured in `src/lib/queryClient.ts` with:
   - `refetchOnWindowFocus: false`
   - `retry: 1`
   - `staleTime: 5 * 60 * 1000` (5 minutes)

## Design System (CRITICAL)

### Typography - Use Typography Component
**Always use** the `Typography` component from `@/components` for text content:

```tsx
import { Typography } from '@/components';

<Typography variant="title-1" weight="bold" color="title">
  Main Title
</Typography>

<Typography variant="body-1" weight="regular" color="body">
  Body text
</Typography>
```

**Variants**: `title-1|2|3`, `headline-1|2|3`, `body-1|2|3`, `caption-1|2`
**Weights**: `bold`, `medium`, `regular`, `semi-bold` (semi-bold auto-applies Preahvihear font)
**Colors**: `title`, `body`, `sub-body`, `disabled`, or any custom string

### Color System
All colors are defined as CSS variables in `src/styles/design-tokens.css` and mapped in `tailwind.config.js`:

- **Neutrals**: `neutral-{0|10|20|30|40|50|60|70|80|90|100}`
- **Primary**: `primary` (or `primary-normal|strong|heavy|light`)
- **Semantic text**: `text-title`, `text-body`, `text-sub-body`, `text-disabled`
- **Atomic colors**: `atomic-{red|orange|lime|green|cyan|blue|purple}-{10-99}`

**Always use Tailwind classes**: `bg-primary`, `text-neutral-50`, `text-text-title`
**Never use direct CSS variables** unless absolutely necessary.

### Font System
Two font families defined in `design-tokens.css`:
- **Pretendard** (default): `font-pretendard` - use for most text
- **Preahvihear**: `font-preahvihear` - automatically applied with `semi-bold` weight

Font files in `src/assets/fonts/` support weights 100-900.

## Utility Functions

### cn() - Class Name Merging
Always use `cn()` from `@/utils/cn` to merge Tailwind classes safely:

```tsx
import { cn } from '@/utils/cn';

<div className={cn('px-2 py-1', className, isActive && 'bg-primary')} />
```

This combines `clsx` and `tailwind-merge` to prevent class conflicts.

## Development Workflow

### Available Scripts
- `npm run dev` - Start dev server (Vite)
- `npm run build` - Type check + production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format with Prettier
- `npm run type-check` - TypeScript check without emitting

### Adding a New Feature
1. Create `src/features/[feature-name]/` directory
2. Add standard files: `[Feature]Page.tsx`, `[feature].api.ts`, `[feature].store.ts`, `index.ts`
3. Export public API through `index.ts`
4. If needed, create `components/` subdirectory for feature-specific components
5. Add page route in `src/pages/` or routing configuration

### Creating Components
1. Shared components go in `src/components/[ComponentName].tsx`
2. Export through `src/components/index.ts`
3. Use TypeScript interfaces for props (exported alongside component)
4. Always use `cn()` for className merging when accepting custom classes

## Documentation References

Each directory has a `README.md` explaining its purpose:
- [src/features/auth/README.md](src/features/auth/README.md) - Feature structure example
- [src/styles/README.md](src/styles/README.md) - Complete design system guide
- [STRUCTURE.md](STRUCTURE.md) - Comprehensive architecture documentation

## Common Patterns

### Importing with Path Aliases
```typescript
// ✅ Correct
import { Typography } from '@/components';
import { useAuthStore } from '@/features/auth';
import { cn } from '@/utils/cn';

// ❌ Avoid
import { Typography } from '../../components/Typography';
```

### Component Structure
```tsx
import { cn } from '@/utils/cn';

interface ComponentProps {
  className?: string;
  // ... other props
}

export const Component = ({ className, ...props }: ComponentProps) => {
  return (
    <div className={cn('base-classes', className)}>
      {/* content */}
    </div>
  );
};
```

### API Layer Pattern (TanStack Query)
```typescript
// features/[feature]/[feature].api.ts
import { useQuery, useMutation } from '@tanstack/react-query';

export const useFeatureData = () => {
  return useQuery({
    queryKey: ['feature-data'],
    queryFn: async () => {
      // API call
    },
  });
};
```

### State Management Pattern (Zustand)
```typescript
// features/[feature]/[feature].store.ts
import { create } from 'zustand';

interface FeatureStore {
  data: SomeType;
  setData: (data: SomeType) => void;
}

export const useFeatureStore = create<FeatureStore>((set) => ({
  data: initialValue,
  setData: (data) => set({ data }),
}));
```
