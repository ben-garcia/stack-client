import { configure } from '@storybook/react';

// automatically import all stories.tsx files.
configure(require.context('../src/components', true, /stories.tsx$/), module);
