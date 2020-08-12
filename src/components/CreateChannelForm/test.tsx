import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { teammateReducer } from 'store/teammate';
import { messagesReducer } from 'store/messages';
import { directMessagesReducer } from 'store/directMessages';
import { teammatesReducer } from 'store/teammates';
import { workspaceReducer } from 'store/workspace';
import { userReducer } from 'store/user';
import CreateChannelForm from '.';

describe('<CreateChannelForm />', () => {
  const mockState = {
    currentChannel: {
      id: 1,
      name: 'channel name',
    },
    currentTeammate: {
      id: 1,
      usernamae: 'user1234',
    },
    currentWorkspace: { id: 1 },
    directMessages: { list: [{}] },
    messages: { list: [{}] },
    teammates: { list: [{}] },
    user: { id: 2, username: 'user22626' },
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    currentTeammate: teammateReducer,
    currentWorkspace: workspaceReducer,
    messages: messagesReducer,
    directMessages: directMessagesReducer,
    teammates: teammatesReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <CreateChannelForm createChannelFormIsOpen={() => {}} />
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
    const createChannelFormWrapper: ReactWrapper = wrapper.find(
      'CreateChannelForm'
    );
    expect(createChannelFormWrapper.childAt(0).name()).toBe('div');
  });

  it('should render the correct sub header', () => {
    const textWrapper: ReactWrapper = wrapper.find(
      'Text.create-channel__sub-header'
    );
    expect(textWrapper.first().text()).toMatch(
      'Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.'
    );
  });

  it('should render correct text to inform the user about public and private channels', () => {
    const channelInfoWrapper: ReactWrapper = wrapper.find(
      'Text.create-channel__message'
    );
    expect(channelInfoWrapper.at(0).text()).toBe(
      'When a channel is set to private, it can only be viewed or joined by invitation.'
    );
    expect(channelInfoWrapper.at(1).text()).toBe(
      'When a channel is set to public, ALL teammates will be added as members of the channel.'
    );
  });

  it('should render a button with text "Create" by default', () => {
    expect(wrapper.find('Button[type="submit"]').text()).toBe('Create');
  });

  describe('form', () => {
    it('should render with a 2 input field', () => {
      expect(wrapper.find('input[type="text"]').length).toBe(2);
    });

    it('should render a checkbox', () => {
      expect(wrapper.find('input[type="checkbox"]').length).toBe(1);
    });
  });
});
