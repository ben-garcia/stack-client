import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { channelDetailsReducer } from 'store/channelDetails';
import { teammateReducer } from 'store/teammate';
import { teammatesReducer } from 'store/teammates';
import { viewportReducer } from 'store/viewport';
import { editChannelTopicModalReducer } from 'store/editChannelTopicModal';
import { membersReducer } from 'store/members';
import { userReducer } from 'store/user';
import WorkspaceInfo from '.';

describe('<WorkspaceInfo />', () => {
  const mockState = {
    currentChannel: {
      id: 1,
    },
    channelDetails: { isOpen: false },
    currentTeammate: {},
    viewport: { isPhone: false, isDesktop: true, isTablet: false },
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    channelDetails: channelDetailsReducer,
    currentTeammate: teammateReducer,
    editChannelTopicModalIsOpen: editChannelTopicModalReducer,
    members: membersReducer,
    teammates: teammatesReducer,
    user: userReducer,
    viewport: viewportReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <WorkspaceInfo />
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
    const workspaceInfoWrapper: ReactWrapper = wrapper.find('WorkspaceInfo');
    expect(workspaceInfoWrapper.childAt(0).name()).toBe('div');
  });

  it('should render <ChannelInfo> when there is a currentChannel and no currentTeammate', () => {
    const channelInfoWrapper: ReactWrapper = wrapper.find('ChannelInfo');
    const teammateInfoWrapper: ReactWrapper = wrapper.find('TeammateInfo');

    expect(channelInfoWrapper.exists()).toBe(true);
    expect(teammateInfoWrapper.exists()).toBe(false);
  });

  it('should render "Details" button when there is a currentChannel and no currentTeammate', () => {
    const channelDetailsButtonWrapper: ReactWrapper = wrapper.find(
      'Text.details-button__text'
    );

    expect(channelDetailsButtonWrapper.exists()).toBe(true);
    expect(channelDetailsButtonWrapper.text()).toBe('Details');
  });

  it('should render <TeammateInfo> when there is a currentTeammate and no currentChannel', () => {
    const newMockState = {
      ...mockState,
      currentChannel: { id: 0 },
      currentTeammate: { id: 1, username: 'user123' },
      teammates: { list: [{ active: true, id: 2, username: 'anotherUser' }] },
      user: { id: 2, username: 'anotherUser' },
    };
    const newMockStore = createStore(rootReducer, newMockState as any);
    const newWrapper = mountComponent(newMockStore);
    const channelInfoWrapper: ReactWrapper = newWrapper.find('ChannelInfo');
    const teammateInfoWrapper: ReactWrapper = newWrapper.find('TeammateInfo');

    expect(channelInfoWrapper.exists()).toBe(false);
    expect(teammateInfoWrapper.exists()).toBe(true);
  });

  it('should NOT render "Details" button when there is a currentTeammate and no currentChannel', () => {
    const newMockState = {
      ...mockState,
      currentChannel: { id: 0 },
      currentTeammate: { id: 1, username: 'user123' },
      teammates: { list: [{ active: true, id: 2, username: 'anotherUser' }] },
      user: { id: 2, username: 'anotherUser' },
    };
    const newMockStore = createStore(rootReducer, newMockState as any);
    const newWrapper = mountComponent(newMockStore);
    const channelDetailsButtonWrapper: ReactWrapper = newWrapper.find(
      'Text.details-buton__text'
    );

    expect(channelDetailsButtonWrapper.exists()).toBe(false);
  });

  it('should render hamburger button when viewport.isPhone === true', () => {
    const newMockState = {
      ...mockState,
      viewport: { isDesktop: false, isPhone: true, isTablet: false },
      currentChannel: { id: 0 },
      currentTeammate: { id: 1, username: 'user123' },
      teammates: { list: [{ active: true, id: 2, username: 'anotherUser' }] },
      user: { id: 2, username: 'anotherUser' },
    };
    const newMockStore = createStore(rootReducer, newMockState as any);
    const newWrapper = mountComponent(newMockStore);
    const hamburgerButtonWrapper: ReactWrapper = newWrapper.find(
      'Button.hamburger-button'
    );

    expect(hamburgerButtonWrapper.exists()).toBe(true);
  });

  it('should call dispatch 1 time when "hanburger-button" button is clicked(viewport.isPhone === true)', () => {
    const newMockState = {
      ...mockState,
      viewport: { isDesktop: false, isPhone: true, isTablet: false },
      currentChannel: { id: 0 },
      currentTeammate: { id: 1, username: 'user123' },
      teammates: { list: [{ active: true, id: 2, username: 'anotherUser' }] },
      user: { id: 2, username: 'anotherUser' },
    };
    const newMockStore = createStore(rootReducer, newMockState as any);

    newMockStore.dispatch = jest.fn();

    const newWrapper = mountComponent(newMockStore);
    const expectedOpenMobileSidebar = {
      type: 'OPEN_MOBILE_SIDEBAR',
    };

    newWrapper.find('Button.hamburger-button').simulate('click');

    expect(newMockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(newMockStore.dispatch).toHaveBeenCalledWith(
      expectedOpenMobileSidebar
    );
  });

  it('should render hamburger button when viewport.isTablet === true', () => {
    const newMockState = {
      ...mockState,
      viewport: { isDesktop: false, isPhone: false, isTablet: true },
      currentChannel: { id: 0 },
      currentTeammate: { id: 1, username: 'user123' },
      teammates: { list: [{ active: true, id: 2, username: 'anotherUser' }] },
      user: { id: 2, username: 'anotherUser' },
    };
    const newMockStore = createStore(rootReducer, newMockState as any);
    const newWrapper = mountComponent(newMockStore);
    const hamburgerButtonWrapper: ReactWrapper = newWrapper.find(
      'Button.hamburger-button'
    );

    expect(hamburgerButtonWrapper.exists()).toBe(true);
  });

  it('should call dispatch 1 time when "hanburger-button" button is clicked(viewport.isTablet === true)', () => {
    const newMockState = {
      ...mockState,
      viewport: { isDesktop: false, isPhone: false, isTablet: true },
      currentChannel: { id: 0 },
      currentTeammate: { id: 1, username: 'user123' },
      teammates: { list: [{ active: true, id: 2, username: 'anotherUser' }] },
      user: { id: 2, username: 'anotherUser' },
    };
    const newMockStore = createStore(rootReducer, newMockState as any);

    newMockStore.dispatch = jest.fn();

    const newWrapper = mountComponent(newMockStore);
    const expectedOpenMobileSidebar = {
      type: 'OPEN_MOBILE_SIDEBAR',
    };

    newWrapper.find('Button.hamburger-button').simulate('click');

    expect(newMockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(newMockStore.dispatch).toHaveBeenCalledWith(
      expectedOpenMobileSidebar
    );
  });

  it('should NOT render hamburger button when viewport.isDesktop === true', () => {
    const newMockState = {
      ...mockState,
      viewport: { isDesktop: true, isPhone: false, isTablet: false },
      currentChannel: { id: 0 },
      currentTeammate: { id: 1, username: 'user123' },
      teammates: { list: [{ active: true, id: 2, username: 'anotherUser' }] },
      user: { id: 2, username: 'anotherUser' },
    };
    const newMockStore = createStore(rootReducer, newMockState as any);
    const newWrapper = mountComponent(newMockStore);
    const hamburgerButtonWrapper: ReactWrapper = newWrapper.find(
      'Button.hamburger-button'
    );

    expect(hamburgerButtonWrapper.exists()).toBe(false);
  });

  it('should call dispatch 1 time when "Details" button is clicked', () => {
    const newMockState = {
      ...mockState,
      viewport: { isDesktop: true, isPhone: false, isTablet: false },
      currentChannel: { id: 1 },
      currentTeammate: { id: 0, username: '' },
      teammates: { list: [{ active: true, id: 2, username: 'anotherUser' }] },
      user: { id: 2, username: 'anotherUser' },
    };
    const newMockStore = createStore(rootReducer, newMockState as any);

    newMockStore.dispatch = jest.fn();

    const newWrapper = mountComponent(newMockStore);
    const expectedOpenChannelDetails = {
      type: 'OPEN_CHANNEL_DETAILS',
    };

    newWrapper.find('Button.details-button').simulate('click');

    expect(newMockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(newMockStore.dispatch).toHaveBeenCalledWith(
      expectedOpenChannelDetails
    );
  });
});
