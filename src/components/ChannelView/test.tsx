import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { addPeopleModalReducer } from 'store/addPeopleModal';
import { channelReducer } from 'store/channel';
import { channelDetailsReducer } from 'store/channelDetails';
import { directMessagesReducer } from 'store/directMessages';
import { editChannelDescriptionModalReducer } from 'store/editChannelDescriptionModal';
import { membersReducer } from 'store/members';
import { messagesReducer } from 'store/messages';
import { teammateReducer } from 'store/teammate';
import { teammatesReducer } from 'store/teammates';
import { userReducer } from 'store/user';
import { viewportReducer } from 'store/viewport';
import { workspaceReducer } from 'store/workspace';
import ChannelView from '.';

describe('<ChannelView />', () => {
  const mockState = {
    addPeopleModalIsOpen: false,
    channelDetails: { isOpen: false, withMembers: false },
    currentChannel: {
      id: 1,
      createdAt: new Date().toISOString(),
      description: 'channel description',
      name: 'channel name',
      topic: 'channel topic',
    },
    currentTeammate: {
      id: 0,
      username: 'user644',
    },
    currentWorkspace: {
      id: 1,
      name: 'workspace name',
    },
    editChannelDescriptionModalIsOpen: false,
    directMessages: { isLoading: false, list: [] },
    members: { list: [] },
    messages: { isLoading: false, list: [] },
    user: { id: 1, username: 'user644' },
    teammates: { list: [] },
    viewport: { isDesktop: false, isPhone: false, isTablet: false },
  };
  const rootReducer = combineReducers({
    addPeopleModalIsOpen: addPeopleModalReducer,
    currentChannel: channelReducer,
    currentTeammate: teammateReducer,
    currentWorkspace: workspaceReducer,
    channelDetails: channelDetailsReducer,
    directMessages: directMessagesReducer,
    editChannelDescriptionModalIsOpen: editChannelDescriptionModalReducer,
    members: membersReducer,
    messages: messagesReducer,
    user: userReducer,
    teammates: teammatesReducer,
    viewport: viewportReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <ChannelView />
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
    const channelViewWrapper: ReactWrapper = wrapper.find('ChannelView');
    expect(channelViewWrapper.childAt(0).name()).toBe('div');
  });

  it('should render currentChannel.name', () => {
    expect(wrapper.find('Text.channel-view__name').text()).toBe(
      mockState.currentChannel.name
    );
  });

  it('should render currentChannel.createdAt', () => {
    expect(wrapper.find('div.channel-view__inner').text()).toMatch(
      'You created this channel onToday'
    );
  });

  it('should render currentChannel.description', () => {
    expect(wrapper.find('div.channel-view__inner').text()).toMatch(
      `This is the very beginning of the${mockState.currentChannel.name}`
    );
  });

  it('should call dispatch when "edit-button" is clicked', () => {
    const newState = { ...mockState };
    const newStore = createStore(rootReducer, newState as any);
    const expectedOpenEditChannelDescriptionModal = {
      type: 'OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL',
    };

    newStore.dispatch = jest.fn();

    const newWrapper = mountComponent(newStore);

    newWrapper.find('Button.channel-view__edit-button').simulate('click');

    expect(newStore.dispatch).toHaveBeenCalledTimes(1);
    expect(newStore.dispatch).toHaveBeenCalledWith(
      expectedOpenEditChannelDescriptionModal
    );
  });

  describe('<Modal>', () => {
    it('should render <Modal> with <EditChannelDescription> when "edit-button" is clicked', () => {
      // add the div node for the modal
      const modalRoot = (global as any).document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      const body = (global as any).document.querySelector('body');
      body.appendChild(modalRoot);

      expect(wrapper.find('Modal').exists()).toBe(false);
      expect(wrapper.find('EditChannelDescription').exists()).toBe(false);

      wrapper.find('Button.channel-view__edit-button').simulate('click');

      expect(wrapper.find('Modal').exists()).toBe(true);
      expect(wrapper.find('EditChannelDescription').exists()).toBe(true);
    });

    it('should render <Modal> with <AddPeople> when "user-icon" is clicked', () => {
      expect(wrapper.find('AddPeople').exists()).toBe(false);

      wrapper.find('Button.channel-view__user-icon').simulate('click');

      expect(wrapper.find('AddPeople').exists()).toBe(true);
    });
  });
});
