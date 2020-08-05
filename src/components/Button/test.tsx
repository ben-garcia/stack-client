import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Button from '.';

describe('<Button />', () => {
  it('should be defined', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button type="button">Button</Button>
    );

    expect(wrapper).toBeDefined();
  });

  it('should render with default props', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button type="button">button here</Button>
    );

    expect(wrapper.prop('disabled')).toBe(false);
    expect(wrapper.prop('type')).toBe('button');
    expect(wrapper.prop('title')).toBe('');
  });

  it('should render the correct text', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button type="button">button here</Button>
    );

    expect(wrapper.text()).toBe('button here');
  });

  it('should call the onClick function when button is clicked', () => {
    const mockOnClick = jest.fn();
    const wrapper: ShallowWrapper = shallow(
      <Button onClick={mockOnClick} type="button">
        button here
      </Button>
    );

    wrapper.simulate('click');

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should set a title', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button title="best title" type="button">
        button here
      </Button>
    );

    expect(wrapper.prop('title')).toBe('best title');
  });

  it('should set a custom attribute', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button customAttribute={{ testId: 'custom' }} type="button">
        button here
      </Button>
    );

    expect(wrapper.prop('data-testid')).toBe('custom');
  });

  it('should contain disabled atribute when prop is passed', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button disabled type="button">
        button is here
      </Button>
    );

    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('should not call the onClick function when button is clicked and is disabled', () => {
    const mockOnClick = jest.fn();
    const wrapper: ShallowWrapper = shallow(
      <Button disabled onClick={mockOnClick} type="button">
        button here
      </Button>
    );

    wrapper.simulate('click');

    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
});
