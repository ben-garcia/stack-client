import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { channelMessagesReducer } from 'store/channelMessages';

import MessageList from '.';

describe('<MessageList />', () => {
  const mockState = {
    channelMessages: {
      list: [
        {
          content: 'message content',
          createdAt: new Date().toISOString(),
          id: 1,
          user: { color: 'red', username: 'user123' },
        },
      ],
    },
    directMessages: {
      list: [
        {
          content: 'message content',
          createdAt: new Date().toISOString(),
          id: 1,
          user: { color: 'red', username: 'user123' },
        },
      ],
    },
    members: { list: [{}] },
    user: { color: 'black', username: 'user123' },
    workspaces: { list: [{}] },
  };
  const store = createStore(channelMessagesReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <MessageList />
      </Provider>
    );
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render the formattedDate, username, timestamp, content of the channel message', () => {
    const newMockState = {
      ...mockState,
      channelMessages: { list: [] },
      directMessages: mockState.directMessages,
    };
    const newMockstore = createStore(
      channelMessagesReducer,
      newMockState as any
    );
    const newWrapper = mountComponent(newMockstore);

    const receivedDateCreated = newWrapper.find('span.message__date-created');
    const receivedMessageUsername = newWrapper.find('span.message__username');
    const receivedMessageTimestamp = newWrapper.find('span.message__timestamp');
    const receivedMessageContent = newWrapper.find('span.message__content');
    const expectedTimestamp = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;

    expect(receivedDateCreated.text()).toBe('Today');
    expect(receivedMessageUsername.text()).toBe(
      mockState.channelMessages.list[0].user.username
    );
    expect(receivedMessageTimestamp.text()).toMatch(expectedTimestamp);
    expect(receivedMessageContent.text()).toBe(
      mockState.channelMessages.list[0].content
    );
  });

  it('should render the formattedDate, username, timestamp, content of the directMessage', () => {
    const newMockState = {
      ...mockState,
      channelMessages: { list: [] },
      directMessages: mockState.directMessages,
    };
    const newMockstore = createStore(
      channelMessagesReducer,
      newMockState as any
    );
    const newWrapper = mountComponent(newMockstore);

    const receivedDateCreated = newWrapper.find('span.message__date-created');
    const receivedMessageUsername = newWrapper.find('span.message__username');
    const receivedMessageTimestamp = newWrapper.find('span.message__timestamp');
    const receivedMessageContent = newWrapper.find('span.message__content');
    const expectedTimestamp = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;

    expect(receivedDateCreated.text()).toBe('Today');
    expect(receivedMessageUsername.text()).toBe(
      mockState.channelMessages.list[0].user.username
    );
    expect(receivedMessageTimestamp.text()).toMatch(expectedTimestamp);
    expect(receivedMessageContent.text()).toBe(
      mockState.channelMessages.list[0].content
    );
  });
});
