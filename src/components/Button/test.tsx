import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Button from '.';

describe('<Button />', () => {
  afterAll(cleanup);

  const mockOnClick = jest.fn();

  it('should render', () => {
    const { container } = render(
      <Button type="button" onClick={mockOnClick}>
        Button
      </Button>
    );
    expect(container).toBeInTheDocument();
  });

  it('should call the onClick handler when button is pressed', () => {
    const { getByText } = render(
      <Button type="button" onClick={mockOnClick}>
        Button
      </Button>
    );

    expect(mockOnClick).not.toHaveBeenCalled();

    fireEvent.click(getByText('Button'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  describe('stories', () => {
    it('should have primary color', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button type="button" onClick={mockOnClick}>
          Button
        </Button>
      );

      expect(wrapper.hasClass('button--primary')).toBe(true);
    });

    it('should have transparent color when color is transparent', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button type="button" color="transparent">
          Button
        </Button>
      );

      expect(wrapper.hasClass('button--transparent')).toBe(true);
    });

    it('should contain an onClick prop', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button type="button" onClick={mockOnClick}>
          Button
        </Button>
      );

      expect(wrapper.prop('onClick')).toEqual(mockOnClick);
    });
  });
});
