import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Text from '.';

describe('<Text />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<Text>text</Text>);

    expect(wrapper).toBeDefined();
  });

  it('should render as a <p> tag by default', () => {
    const wrapper: ShallowWrapper = shallow(<Text>text goes here</Text>);

    expect(wrapper.name()).toBe('p');
  });

  it('should render as a <span> tag', () => {
    const wrapper: ShallowWrapper = shallow(
      <Text tag="span">text goes here</Text>
    );

    expect(wrapper.name()).toBe('span');
  });

  it('should render as a <div> tag', () => {
    const wrapper: ShallowWrapper = shallow(
      <Text tag="div">text goes here</Text>
    );

    expect(wrapper.name()).toBe('div');
  });
});
