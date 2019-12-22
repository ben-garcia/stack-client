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

  describe('stories', () => {
    it('should have class of dialog', () => {
      const wrapper: ShallowWrapper = shallow(
        <Dialog content="more content" />
      );

      expect(wrapper.hasClass('dialog')).toBe(true);
      expect(wrapper.hasClass('dialog--succes')).toBe(false);
      expect(wrapper.hasClass('dialog--failure')).toBe(false);
    });

    it('should have class of dialog--success when success prop is passed', () => {
      const wrapper: ShallowWrapper = shallow(
        <Dialog success content="testingtesting" />
      );

      expect(wrapper.hasClass('dialog--success')).toBe(true);
      expect(wrapper.hasClass('dialog--failure')).toBe(false);
    });

    it('should have class of dialog-failure whe failure prop is passed', () => {
      const wrapper: ShallowWrapper = shallow(
        <Dialog failure content="more testing" />
      );

      expect(wrapper.hasClass('dialog--failure')).toBe(true);
      expect(wrapper.hasClass('dialog--success')).toBe(false);
    });

    it('should have class when className prop is passed', () => {
      const wrapper: ShallowWrapper = shallow(
        <Dialog
          content="more content while testing"
          className="testing-class"
        />
      );

      expect(wrapper.hasClass('testing-class')).toBe(true);
    });
  });
});
