import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Dialog from '.';

describe('<Dialog />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<Dialog content="content" />);

    expect(wrapper).toBeDefined();
  });

  it('should render as an <div> tag', () => {
    const wrapper: ShallowWrapper = shallow(<Dialog content="content" />);

    expect(wrapper.name()).toBe('div');
  });

  it('should wrap content in a <Text> component', () => {
    const wrapper: ShallowWrapper = shallow(
      <Dialog content="this is content" />
    );
    const textWrapper = wrapper.find('Text');

    expect(textWrapper.name()).toBe('Text');
    expect(textWrapper.exists()).toBe(true);
    expect(textWrapper.dive().text()).toBe('this is content');
  });

  it('should render <ul> tag with no <li> or <Text> when content array is empty', () => {
    const wrapper: ShallowWrapper = shallow(<Dialog content={[]} />);
    const ulWrapper = wrapper.find('ul');

    expect(ulWrapper.exists()).toBe(true);
    expect(ulWrapper.find('li').exists()).toBe(false);
    expect(ulWrapper.find('Text').exists()).toBe(false);
  });

  it('should render <ul> tag wih <Text> wrapped in <li> when content array.length > 0 ', () => {
    const wrapper: ShallowWrapper = shallow(
      <Dialog content={['this', 'content']} />
    );
    const ulWrapper = wrapper.find('ul');
    const liWrapper = ulWrapper.find('li');
    const textWrapper = liWrapper.find('Text');

    expect(ulWrapper.exists()).toBe(true);
    expect(
      ulWrapper
        .childAt(0)
        .find('Text')
        .dive()
        .text()
    ).toBe('this');
    expect(
      ulWrapper
        .childAt(1)
        .find('Text')
        .dive()
        .text()
    ).toBe('content');
    expect(liWrapper.length).toBe(2);
    expect(textWrapper.length).toBe(2);
  });

  it('should render a <Header> component when header prop is passed', () => {
    const wrapper: ShallowWrapper = shallow(
      <Dialog content="content" header="heading" />
    );

    expect(wrapper.find('Header').exists()).toBe(true);
    expect(
      wrapper
        .find('Text')
        .dive()
        .text()
    ).toBe('content');
  });
});
