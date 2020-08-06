import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Header from '.';

describe('<Header />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(<Header heading="heading" />);

    expect(wrapper).toBeDefined();
  });

  it('should render as an <header> tag', () => {
    const wrapper: ShallowWrapper = shallow(<Header heading="best heading" />);

    expect(wrapper.name()).toBe('header');
  });

  describe('heading tag', () => {
    it('should render with an <h1> by default', () => {
      const wrapper: ShallowWrapper = shallow(<Header heading="h1 heading" />);
      const headingWrapper: ShallowWrapper = wrapper.find('h1');

      expect(headingWrapper.exists()).toBe(true);
      expect(headingWrapper.text()).toBe('h1 heading');
    });

    it('should render with an <h2>', () => {
      const wrapper: ShallowWrapper = shallow(
        <Header as="h2" heading="h2 heading" />
      );
      const headingWrapper = wrapper.find('h2');

      expect(headingWrapper.exists()).toBe(true);
      expect(headingWrapper.text()).toBe('h2 heading');
    });

    it('should render with an <h3>', () => {
      const wrapper: ShallowWrapper = shallow(
        <Header as="h3" heading="h3 heading" />
      );
      const headingWrapper: ShallowWrapper = wrapper.find('h3');

      expect(headingWrapper.exists()).toBe(true);
      expect(headingWrapper.text()).toBe('h3 heading');
    });

    it('should render with an <h4>', () => {
      const wrapper: ShallowWrapper = shallow(
        <Header as="h4" heading="h4 heading" />
      );
      const headingWrapper: ShallowWrapper = wrapper.find('h4');

      expect(headingWrapper.exists()).toBe(true);
      expect(headingWrapper.text()).toBe('h4 heading');
    });

    it('should render with an <h5>', () => {
      const wrapper: ShallowWrapper = shallow(
        <Header as="h5" heading="h5 heading" />
      );
      const headingWrapper: ShallowWrapper = wrapper.find('h5');

      expect(headingWrapper.exists()).toBe(true);
      expect(headingWrapper.text()).toBe('h5 heading');
    });

    it('should render with an <h6>', () => {
      const wrapper: ShallowWrapper = shallow(
        <Header as="h6" heading="h6 heading" />
      );
      const headingWrapper: ShallowWrapper = wrapper.find('h6');

      expect(headingWrapper.exists()).toBe(true);
      expect(headingWrapper.text()).toBe('h6 heading');
    });
  });
});
