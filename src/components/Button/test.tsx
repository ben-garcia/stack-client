import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Button from '.';

describe('<Button />', () => {
  afterAll(cleanup);

  const mockOnClick = jest.fn();

  it('should render', () => {
    const { container } = render(
      <Button type="button" text="Button" onClick={mockOnClick} />
    );
    expect(container).toBeInTheDocument();
  });

  it('should call the onClick handler when button is pressed', () => {
    const { getByText } = render(
      <Button type="button" text="Button" onClick={mockOnClick} />
    );

    expect(mockOnClick).not.toHaveBeenCalled();

    fireEvent.click(getByText('Button'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  describe('stories', () => {
    describe('default render', () => {
      it('should have no text', () => {
        const wrapper: ShallowWrapper = shallow(
          <Button type="button" onClick={mockOnClick} />
        );
        expect(wrapper.find('.button').text()).toBe('');
      });

      it('should have primary color', () => {
        const wrapper: ShallowWrapper = shallow(
          <Button
            type="button"
            text="Button"
            color="transparent"
            onClick={mockOnClick}
          />
        );

        expect(wrapper.hasClass('button--transparent')).toBe(true);
      });

      it('should contain an onClick prop', () => {
        const wrapper: ShallowWrapper = shallow(
          <Button type="button" text="Button" onClick={mockOnClick} />
        );

        expect(wrapper.prop('onClick')).toEqual(mockOnClick);
      });
    });

    it('should contain a text prop when passed in', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button
          type="button"
          text="Button"
          onClick={mockOnClick}
          className="testing"
        />
      );

      expect(wrapper.find('.testing').text()).toBe('Button');
    });

    it('should render an Icon when passed the iconType prop', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button type="button" iconType="plus" onClick={mockOnClick} />
      );

      expect(typeof wrapper.find('.button').text).toBe('function');
      expect(wrapper.find('Icon')).toHaveLength(1);
    });
  });
});
