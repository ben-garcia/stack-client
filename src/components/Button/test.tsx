import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { shallow, ShallowWrapper } from 'enzyme';

import Button from '.';

describe('<Button />', () => {
  afterAll(cleanup);

  const mockOnClick = jest.fn();

  it('should render', () => {
    const { container } = render(
      <Button text="Button" onClick={mockOnClick} />
    );
    expect(container).toBeInTheDocument();
  });

  it('should call the onClick handler when button is pressed', () => {
    const { getByText } = render(
      <Button text="Button" onClick={mockOnClick} />
    );

    expect(mockOnClick).not.toHaveBeenCalled();

    fireEvent.click(getByText('Button'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  describe('stories', () => {
    it('should render primary color by default', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button text="Button" onClick={mockOnClick} />
      );
      expect(wrapper.hasClass('button--primary')).toBe(true);
    });

    it('should render as transparent when passing transparent color prop', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button text="Button" color="transparent" onClick={mockOnClick} />
      );

      expect(wrapper.hasClass('button--transparent')).toBe(true);
    });

    it('should contain an onClick prop', () => {
      const wrapper: ShallowWrapper = shallow(
        <Button text="Button" onClick={mockOnClick} />
      );

      expect(wrapper.prop('onClick')).toEqual(mockOnClick);
    });
  });
});
