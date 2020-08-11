import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Form from '.';

describe('<Form/>', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Form>form</Form>);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render form element', () => {
    expect(wrapper.name()).toBe('form');
  });

  it('should call "onSubmit" callback prop when submitting form', () => {
    const onSubmitSpy = jest.fn();
    const newWrapper = shallow(<Form onSubmit={onSubmitSpy}>form</Form>);

    newWrapper.simulate('submit');

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should set noValidate when "onSubmit" prop is passed', () => {
    const newWrapper = shallow(<Form onSubmit={() => {}}>form</Form>);

    expect(newWrapper.props().noValidate).toBe(true);
  });

  it('should NOT set noValidate by default', () => {
    const newWrapper = shallow(<Form>form</Form>);

    expect(newWrapper.props().noValidate).toBeUndefined();
  });

  it('should NOT call "onSubmit" callback prop by default', () => {
    const onSubmitSpy = jest.fn();

    wrapper.simulate('submit');

    expect(onSubmitSpy).toHaveBeenCalledTimes(0);
  });
});
