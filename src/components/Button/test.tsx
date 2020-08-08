import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Button from '.';

describe('<Button />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<Button type="button">Button</Button>);
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render with default props', () => {
    expect(wrapper.prop('disabled')).toBe(false);
    expect(wrapper.prop('type')).toBe('button');
    expect(wrapper.prop('title')).toBe('');
  });

  it('should render the correct text', () => {
    expect(wrapper.text()).toBe('Button');
  });

  it('should call the onClick function when button is clicked', () => {
    const mockOnClick = jest.fn();
    const newWrapper: ShallowWrapper = shallow(
      <Button onClick={mockOnClick} type="button">
        button here
      </Button>
    );
    newWrapper.simulate('click');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should set a title', () => {
    const newWrapper: ShallowWrapper = shallow(
      <Button title="best title" type="button">
        button here
      </Button>
    );

    expect(newWrapper.prop('title')).toBe('best title');
  });

  it('should set a custom attribute', () => {
    const newWrapper: ShallowWrapper = shallow(
      <Button customAttribute={{ testId: 'custom' }} type="button">
        button here
      </Button>
    );
    expect(newWrapper.prop('data-testid')).toBe('custom');
  });

  it('should contain disabled atribute when prop is passed', () => {
    const newWrapper: ShallowWrapper = shallow(
      <Button disabled type="button">
        button is here
      </Button>
    );
    expect(newWrapper.prop('disabled')).toBe(true);
  });

  it('should not call the onClick function when button is clicked and is disabled', () => {
    const mockOnClick = jest.fn();
    const newWrapper: ShallowWrapper = shallow(
      <Button disabled onClick={mockOnClick} type="button">
        button here
      </Button>
    );
    newWrapper.simulate('click');
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
});
