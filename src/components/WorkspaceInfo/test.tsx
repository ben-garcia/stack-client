import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import WorkspaceInfo from '.';

const user = {
  isLoggedIn: true,
  id: 1,
  username: 'test',
  email: 'test@test.com',
  createdAt: 'testing',
  updatedAt: 'testingtseting',
};

describe('<WorkspaceInfo />', () => {
  it('should render', () => {
    const wrapper: ShallowWrapper = shallow(<WorkspaceInfo user={user} />);

    expect(wrapper.hasClass('workspace-info')).toBe(true);
  });
});
