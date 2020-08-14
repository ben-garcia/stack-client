import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Placeholder from '.';

describe('<Plaeholder />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Placeholder color="dark" type="info" />);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <div>', () => {
    expect(wrapper.name()).toBe('div');
  });

  it('should render a single div of the selected type by default', () => {
    expect(wrapper.find('div.p-info__wrapper').length).toBe(1);
  });

  describe('numberOfTags', () => {
    it('should render a 3 div of the selected type', () => {
      const newWrapper = shallow(
        <Placeholder color="dark" numberOfTags={3} type="info" />
      );
      expect(newWrapper.find('div.p-info__wrapper').length).toBe(3);
    });

    it('should render with correct height', () => {
      const newWrapper = shallow(
        <Placeholder color="dark" numberOfTags={3} type="info" />
      );
      expect(newWrapper.find('div.p-info__wrapper').length).toBe(3);
      expect(
        (newWrapper
          .find('div.p-info__wrapper')
          .at(0)
          .props() as any).style.height
      ).toBe(`${(1 / 3) * 100}%`);
    });
  });

  it('should render with type of "message"', () => {
    const newWrapper = shallow(<Placeholder color="dark" type="message" />);
    expect(newWrapper.find('div.p-message__wrapper').length).toBe(1);
  });

  it('should render with type of "list"', () => {
    const newWrapper = shallow(<Placeholder color="dark" type="list" />);
    expect(newWrapper.find('div.p-list__wrapper').length).toBe(1);
  });

  it('should render with correct height', () => {
    const newWrapper = shallow(
      <Placeholder color="dark" type="list" height="50px" />
    );
    expect(newWrapper.props().style.height).toBe('50px');
  });

  it('should render with default height, and width values', () => {
    expect((wrapper.props() as any).style.height).toBe('');
    expect((wrapper.props() as any).style.width).toBe('');
  });

  it('should render with correct width', () => {
    const newWrapper = shallow(
      <Placeholder color="dark" type="list" width="50px" />
    );
    expect(newWrapper.props().style.width).toBe('50px');
  });
});
