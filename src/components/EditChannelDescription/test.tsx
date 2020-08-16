import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { userReducer } from 'store/user';
import EditChannelDescription from '.';

describe('<EditChannelDescription />', () => {
  const mockState = {
    currentChannel: {
      id: 1,
      name: 'channel name',
      description: 'channel description',
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
        <EditChannelDescription value={mockState.currentChannel.description} />
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
    const editChannelDescriptionWrapper: ReactWrapper = wrapper.find(
      'EditChannelDescription'
    );
    expect(editChannelDescriptionWrapper.childAt(0).name()).toBe('Form');
  });

  it('should render with a textarea field', () => {
    expect(wrapper.find('textarea').length).toBe(1);
  });

  it('should render submit button with "Update description"', () => {
    expect(wrapper.find('Button').text()).toBe('Update description');
  });

  it('should render channel description when channel has a description', () => {
    expect(wrapper.find('textarea').text()).toBe(
      mockState.currentChannel.description
    );
  });

  it('should change value when user types', () => {
    const textareaWrapper = wrapper.find('textarea');
    textareaWrapper.simulate('change', {
      target: { value: 'new description' },
    });
    expect(textareaWrapper.text()).toBe('new description');
  });

  it('should render nothing when channel.description === ""', () => {
    const newWrapper = mount(
      <Provider store={store}>
        <EditChannelDescription value="" />
      </Provider>
    );
    expect(newWrapper.find('textarea').text()).toBe('');
  });
});
