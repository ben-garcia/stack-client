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
import ViewWrapper from '.';

describe('<ViewWrapper />', () => {
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
        <ViewWrapper />
      </Provider>
    );
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <main>', () => {
    const viewWrapper: ReactWrapper = wrapper.find('ViewWrapper');
    expect(viewWrapper.childAt(0).name()).toBe('main');
  });

  describe('<Placeholder>', () => {
    it('render when directMessage.isLoading ', () => {
      const newState = {
        ...mockState,
        directMessages: { isLoading: true, list: [{}] },
      };
      const newStore = createStore(rootReducer, newState as any);
      const newWrapper = mountComponent(newStore);

      expect(newWrapper.find('Placeholder').exists()).toBe(true);
    });

    it('render when messages.isLoading ', () => {
      const newState = {
        ...mockState,
        messages: { isLoading: true, list: [{}] },
      };
      const newStore = createStore(rootReducer, newState as any);
      const newWrapper = mountComponent(newStore);

      expect(newWrapper.find('Placeholder').exists()).toBe(true);
    });
  });

  it('should render <ChannelView', () => {
    expect(wrapper.find('ChannelView').exists()).toBe(true);
  });

  it('should render <TeammateView', () => {
    const newState = {
      ...mockState,
      currentChannel: { ...mockState.currentChannel, id: 0 },
      currentTeammate: { ...mockState.currentTeammate, id: 1 },
    };
    const newStore = createStore(rootReducer, newState as any);
    const newWrapper = mountComponent(newStore);
    expect(newWrapper.find('TeammateView').exists()).toBe(true);
  });

  it('should render <ChannelDetails>', () => {
    const newState = {
      ...mockState,
      channelDetails: { isOpen: true },
    };
    const newStore = createStore(rootReducer, newState as any);
    const newWrapper = mountComponent(newStore);

    expect(newWrapper.find('ChannelDetails').exists()).toBe(true);
  });
});
