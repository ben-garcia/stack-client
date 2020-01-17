import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Dialog } from '..';

describe('Dialog Integration', () => {
  it('should render a Paragraph component by default', () => {
    const wrapper: ReactWrapper = mount(<Dialog content="content" />);
    const Text: ReactWrapper = wrapper.find('Text');

    expect(Text.length).toBe(1);
    expect(Text.find('p').length).toBe(1);
    expect(Text.find('p').text()).toBe('content');
  });

  it('should reder a Header component when header prop is passed', () => {
    const wrapper: ReactWrapper = mount(
      <Dialog header="header" content="integration test" />
    );
    const Header: ReactWrapper = wrapper.find('Header');

    expect(Header.length).toBe(1);
    expect(Header.find('header').length).toBe(1);
    expect(Header.find('header').text()).toBe('header');
  });
});
