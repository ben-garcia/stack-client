import { addParameters, configure } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../src/index.scss';

// automatically import all stories.tsx files.
configure(
  [
    require.context('../src/components', true, /stories.tsx$/),
    require.context('../src/pages', true, /stories.tsx$/),
  ],
  module
);
