import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { userReducer } from 'store/user';
import EditChannelTopic from '.';

describe('<EditChannelTopic />', () => {
  const mockState = {
    currentChannel: {
      id: 1,
      name: 'channel name',
      topic: 'channel topic',
    },
    user: { id: 1, username: 'user525' },
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <EditChannelTopic value={mockState.currentChannel.topic} />
      </Provider>
    );
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <Form>', () => {
    const editChannelTopicWrapper: ReactWrapper = wrapper.find(
      'EditChannelTopic'
    );
    expect(editChannelTopicWrapper.childAt(0).name()).toBe('Form');
  });

  it('should render with a textarea field', () => {
    expect(wrapper.find('textarea').length).toBe(1);
  });

  it('should render submit button with "Set topic"', () => {
    expect(wrapper.find('Button').text()).toBe('Set topic');
  });

  it('should render channel topic when channel has a topic', () => {
    expect(wrapper.find('textarea').text()).toBe(
      mockState.currentChannel.topic
    );
  });

  it('should change value when user types', () => {
    const textareaWrapper = wrapper.find('textarea');
    textareaWrapper.simulate('change', { target: { value: 'new topic' } });
    expect(textareaWrapper.text()).toBe('new topic');
  });

  it('should render nothing when channel.topic === ""', () => {
    const newWrapper = mount(
      <Provider store={store}>
        <EditChannelTopic value="" />
      </Provider>
    );
    expect(newWrapper.find('textarea').text()).toBe('');
  });
});
