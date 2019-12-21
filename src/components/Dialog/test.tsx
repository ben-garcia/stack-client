import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Dialog from '.';

describe('<Dialog />', () => {
  it('should render', () => {
    const wrapper: ShallowWrapper = shallow(
      <Dialog header="Header" content="content" />
    );

    expect(wrapper).toBeDefined();
  });
});
