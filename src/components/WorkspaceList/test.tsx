import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import WorkspaceList from '.';

const workspaces = [
  {
    id: 1,
    name: 'testing 1',
    createdAt: 'gjgjgjg',
    updatedAt: 'gjgjgjgjg',
  },
  {
    id: 2,
    name: 'testing 2',
    createdAt: 'igjhgghghghg',
    updatedAt: '258585858558',
  },
];

describe('<WorkspaceList />', () => {
  it('should render', () => {
    const wrapper: ShallowWrapper = shallow(
      <WorkspaceList workspaces={workspaces} />
    );

    expect(wrapper.hasClass('workspace-list')).toBe(true);
  });
});
