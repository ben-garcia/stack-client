import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';

import { userReducer } from 'store/user';
import { workspaceReducer } from 'store/workspace';
import Workspace from '.';

describe('<Workspace />', () => {
  const mockState = {
    currentWorkspace: {
      name: 'workspace name',
    },
    user: { username: 'user525' },
  };
  const rootReducer = combineReducers({
    currentWorkspace: workspaceReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Workspace />
        </MemoryRouter>
      </Provider>
    );
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <section>', () => {
    const workspaceWrapper: ReactWrapper = wrapper.find('Workspace');
    expect(workspaceWrapper.childAt(0).name()).toBe('section');
  });

  it('should render the workspace name when there is a currentWorkspace', () => {
    expect(wrapper.find('Text.workspace__name').text()).toBe(
      mockState.currentWorkspace.name
    );
  });

  it('should render the workspace name when there is no currentWorkspace', () => {
    const newState = {
      ...mockState,
      currentWorkspace: {},
    };
    const newStore = createStore(rootReducer, newState as any);
    const newWrapper = mountComponent(newStore);

    expect(newWrapper.find('Text.workspace__name').text()).toBe(
      'No workspace yet'
    );
  });

  it('should rende the username', () => {
    expect(wrapper.find('Text.workspace__username').text()).toBe(
      mockState.user.username
    );
  });

  describe('render <Modal>', () => {
    // add the div node for the modal
    const modalRoot = (global as any).document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = (global as any).document.querySelector('body');
    body.appendChild(modalRoot);

    it('should render a <Modal> with <MenuDrawer> when button is clicked', () => {
      expect(wrapper.find('Modal').exists()).toBe(false);
      expect(wrapper.find('MenuDrawer').exists()).toBe(false);

      wrapper.find('Button.workspace__inner').simulate('click');

      expect(wrapper.find('Modal').exists()).toBe(true);
      expect(wrapper.find('MenuDrawer').exists()).toBe(true);
    });

    it('should render a <Modal> with <CreateWorkspaceForm> when button is clicked', () => {
      expect(wrapper.find('Modal').exists()).toBe(false);
      expect(wrapper.find('CreateWorkspaceForm').exists()).toBe(false);

      wrapper.find('Button.workspace__add-button').simulate('click');

      expect(wrapper.find('Modal').exists()).toBe(true);
      expect(wrapper.find('CreateWorkspaceForm').exists()).toBe(true);
    });
  });
});
