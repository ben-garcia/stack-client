import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Form from '.';

describe('<Form />', () => {
  it('should render', () => {
    const { container }: RenderResult = render(
      <Form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" />
      </Form>
    );

    expect(container).toBeInTheDocument();
    cleanup();
  });

  describe('stories', () => {
    it('should have at least 2 child', () => {
      const wrapper: ShallowWrapper = shallow(
        <Form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />
        </Form>
      );

      expect(wrapper.children().length).toBeGreaterThan(1);
    });

    it('should call onSubmit handler when submitting', () => {
      const onSubmitHandler = jest.fn();
      const wrapper: ShallowWrapper = shallow(
        <Form onSubmit={onSubmitHandler} />
      );

      expect(onSubmitHandler).toHaveBeenCalledTimes(0);

      wrapper.find('.form').simulate('submit');

      expect(onSubmitHandler).toHaveBeenCalledTimes(1);
    });
  });
});
