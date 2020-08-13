import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';

import Workspace from '.';

describe('<Workspace />', () => {
  const store = createStore(() => {}, {} as any);
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Workspace />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <div>', () => {
    const menuDrawerWrapper: ReactWrapper = wrapper.find('MenuDrawer');
    expect(menuDrawerWrapper.childAt(0).name()).toBe('div');
  });

  it('should render a button that contains "Logout"', () => {
    expect(wrapper.find('Button.menu-drawer__button').exists()).toBe(true);
  });
});
