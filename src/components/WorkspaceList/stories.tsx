import React from 'react';
import { storiesOf } from '@storybook/react';

import WorkspaceList from '.';

const workspaces = [
  {
    id: 1,
    name: 'testing 1',
    ownerId: 1,
    createdAt: 'gjgjgjg',
    updatedAt: 'gjgjgjgjg',
  },
  {
    id: 2,
    name: 'testing 2',
    ownerId: 1,
    createdAt: 'igjhgghghghg',
    updatedAt: '258585858558',
  },
];

storiesOf('WorkspaceList', module).add('default', () => (
  <WorkspaceList workspaces={workspaces} />
));
