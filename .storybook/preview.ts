import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (360px)',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        mobileLarge: {
          name: 'Mobile Large (375px)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobileXL: {
          name: 'Mobile XL (414px)',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        tabletLarge: {
          name: 'Tablet Large (1024px)',
          styles: {
            width: '1024px',
            height: '1366px',
          },
        },
        desktop: {
          name: 'Desktop (1280px)',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
        desktopLarge: {
          name: 'Desktop Large (1920px)',
          styles: {
            width: '1920px',
            height: '1080px',
          },
        },
      },
      defaultViewport: 'mobile',
    },
  },
};

export default preview;
