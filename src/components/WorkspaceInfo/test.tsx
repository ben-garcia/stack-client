import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import WorkspaceInfo from '.';

describe('<WorkspaceInfo />', () => {
  it('should render', () => {
    const wrapper: ShallowWrapper = shallow(<WorkspaceInfo />);

    expect(wrapper.hasClass('workspace-info')).toBe(true);
  });
});
