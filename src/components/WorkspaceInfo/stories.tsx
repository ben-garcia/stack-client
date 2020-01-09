import React from 'react';
import { storiesOf } from '@storybook/react';

import WorkspaceInfo from '.';

const user = { isLoggedIn: false };

storiesOf('WorkspaceInfo', module).add('default', () => (
  <WorkspaceInfo user={user} />
));
