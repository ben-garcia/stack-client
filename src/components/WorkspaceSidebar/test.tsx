import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelsReducer } from 'store/channels';
import { teammatesReducer } from 'store/teammates';
import { workspaceReducer } from 'store/workspace';
import { userReducer } from 'store/user';

import WorkspaceSidebar from '.';

describe('<WorkspaceSidebar />', () => {
  const mockState = {
    channels: { isLoading: false, list: [] },
    currentWorkspace: {
      name: 'workspace name',
    },
    teammates: { isLoading: false, list: [] },
    user: { username: 'user15151' },
  };
  const rootReducer = combineReducers({
    channels: channelsReducer,
    currentWorkspace: workspaceReducer,
    teammates: teammatesReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <WorkspaceSidebar />
      </Provider>
    );
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <div>', () => {
    const workspaceSidebarWrapper: ReactWrapper = wrapper.find(
      'WorkspaceSidebar'
    );
    expect(workspaceSidebarWrapper.childAt(0).name()).toBe('div');
  });

  it('should render <Workspace> ONLY when channels.isLoading === false', () => {
    expect(wrapper.find('Workspace').exists()).toBe(true);
    expect(wrapper.find('Scrollbar').exists()).toBe(false);
    expect(wrapper.find('ChannelList').exists()).toBe(false);
    expect(wrapper.find('TeammatesList').exists()).toBe(false);
    expect(wrapper.find('Placeholder').exists()).toBe(false);
  });

  it('should render <Placeholder> ONLY when channels.isLoading === true', () => {
    const newState = {
      ...mockState,
      channels: { ...mockState.channels, isLoading: true },
      teammates: { ...mockState.teammates, isLoading: true },
    };
    const newStore = createStore(rootReducer, newState as any);
    const newWrapper = mountComponent(newStore);
    expect(newWrapper.find('Placeholder').exists()).toBe(true);
    expect(newWrapper.find('Workspace').exists()).toBe(false);
    expect(newWrapper.find('Scrollbar').exists()).toBe(false);
    expect(newWrapper.find('ChannelList').exists()).toBe(false);
    expect(newWrapper.find('TeammatesList').exists()).toBe(false);
  });

  it('should render <Workspace>, <Scrollbar>, <ChannelList>, <TeammatesList> when currentWorkspace.id !== 0', () => {
    const newState = {
      ...mockState,
      currentWorkspace: { ...mockState.currentWorkspace, id: 1 },
    };
    const newStore = createStore(rootReducer, newState as any);
    const newWrapper = mountComponent(newStore);

    expect(newWrapper.find('Workspace').exists()).toBe(true);
    expect(newWrapper.find('Scrollbar').exists()).toBe(true);
    expect(newWrapper.find('ChannelList').exists()).toBe(true);
    expect(newWrapper.find('TeammatesList').exists()).toBe(true);
    expect(newWrapper.find('Placeholder').exists()).toBe(false);
  });
});
