import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { messagesReducer } from 'store/messages';

import MessageList from '.';

describe('<MessageList />', () => {
  const mockState = {
    messages: {
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
      list: [],
    },
    members: { list: [{}] },
    user: { color: 'black', username: 'user123' },
  };
  const store = createStore(messagesReducer, mockState as any);
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

  it('should render as a <ul>', () => {
    const messageListWrapper: ReactWrapper = wrapper.find('List.message-list');
    expect(messageListWrapper.childAt(0).name()).toBe('ul');
  });

  it('should render empty <ul> tag when there are no messages', () => {
    const newMockState = { ...mockState, messages: { list: [] } };
    const newMockstore = createStore(messagesReducer, newMockState as any);
    const newWrapper = mountComponent(newMockstore);
    const ulWrapper: ReactWrapper = newWrapper.find('ul.message-list');
    expect(ulWrapper.text()).toBe('');
  });

  it('should render 1 <li> tag when there are 1 message', () => {
    const liWrapper: ReactWrapper = wrapper.find('ListItem').find('li');
    expect(liWrapper.length).toBe(1);
  });

  it('should render the formattedDate, username, timestamp, content of the message', () => {
    const receivedDateCreated = wrapper.find('span.message__date-created');
    const receivedMessageUsername = wrapper.find('span.message__username');
    const receivedMessageTimestamp = wrapper.find('span.message__timestamp');
    const receivedMessageContent = wrapper.find('span.message__content');
    const expectedTimestamp = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;

    expect(receivedDateCreated.text()).toBe('Today');
    expect(receivedMessageUsername.text()).toBe(
      mockState.messages.list[0].user.username
    );
    expect(receivedMessageTimestamp.text()).toMatch(expectedTimestamp);
    expect(receivedMessageContent.text()).toBe(
      mockState.messages.list[0].content
    );
  });

  it('should render the formattedDate, username, timestamp, content of the directMessage', () => {
    const newMockState = {
      ...mockState,
      messages: { list: [] },
      directMessages: mockState.messages,
    };
    const newMockstore = createStore(messagesReducer, newMockState as any);
    const newWrapper = mountComponent(newMockstore);

    const receivedDateCreated = newWrapper.find('span.message__date-created');
    const receivedMessageUsername = newWrapper.find('span.message__username');
    const receivedMessageTimestamp = newWrapper.find('span.message__timestamp');
    const receivedMessageContent = newWrapper.find('span.message__content');
    const expectedTimestamp = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;

    expect(receivedDateCreated.text()).toBe('Today');
    expect(receivedMessageUsername.text()).toBe(
      mockState.messages.list[0].user.username
    );
    expect(receivedMessageTimestamp.text()).toMatch(expectedTimestamp);
    expect(receivedMessageContent.text()).toBe(
      mockState.messages.list[0].content
    );
  });
});
