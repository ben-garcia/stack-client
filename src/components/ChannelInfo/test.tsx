import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { editChannelTopicModalReducer } from 'store/editChannelTopicModal';
import { membersReducer } from 'store/members';
import ChannelInfo from '.';

describe('<ChannelInfo />', () => {
  const channel = {
    id: 1,
    description: 'channel description',
    name: 'channel name',
    topic: 'channel topic',
    private: false,
    createdAt: '',
    updatedAt: '',
  };
  const mockState = {
    currentChannel: {
      name: 'current channel name',
      topic: 'current channel topic',
    },
    editChannelTopicModalIsOpen: false,
    members: { list: [{}] },
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    editChannelTopicModalIsOpen: editChannelTopicModalReducer,
    members: membersReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <ChannelInfo channel={channel} />
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
    const channelInfoWrapper: ReactWrapper = wrapper.find('ChannelInfo');
    expect(channelInfoWrapper.childAt(0).name()).toBe('section');
  });

  it('should render name, topic from currentChannel and membersSize', () => {
    const channelTopicWrapper: ReactWrapper = wrapper.find(
      'Text.channel__topic'
    );
    const channelNameWrapper: ReactWrapper = wrapper
      .find('.channel__name')
      .find('Text');
    const membersSizeWrapper: ReactWrapper = wrapper.find(
      'Text.channel__members-count'
    );
    const { topic: expectedChannelTopic } = mockState.currentChannel;

    expect(channelTopicWrapper.text()).toBe(expectedChannelTopic);
    expect(channelNameWrapper.text()).toBe(channel.name);
    expect(membersSizeWrapper.text()).toBe(
      mockState.members.list.length.toString()
    );
  });

  it('should render currentChannel.name, membersSize and "Add a topic" when topic is empty string', () => {
    const newMockState = {
      ...mockState,
      currentChannel: { ...mockState.currentChannel, topic: '' },
    };
    const newMockStore = createStore(channelReducer, newMockState as any);
    const newWrapper = mount(
      <Provider store={newMockStore}>
        <ChannelInfo channel={{ ...channel, topic: '' }} />
      </Provider>
    );
    const channelTopicWrapper: ReactWrapper = newWrapper.find(
      'Text.channel__topic'
    );
    const channelNameWrapper: ReactWrapper = newWrapper
      .find('.channel__name')
      .find('Text');
    const membersSizeWrapper: ReactWrapper = newWrapper.find(
      'Text.channel__members-count'
    );

    expect(channelTopicWrapper.text()).toBe('Add a topic');
    expect(channelNameWrapper.text()).toBe(channel.name);
    expect(membersSizeWrapper.text()).toBe(
      mockState.members.list.length.toString()
    );
  });

  it('should call dispatch 1 time when "Edit channel topic" button is clicked', () => {
    const storeWithSpy = createStore(channelReducer, mockState as any);

    storeWithSpy.dispatch = jest.fn();

    const newWrapper = mountComponent(storeWithSpy as any);
    const expectedOpenEditChannelTopicModal = {
      type: 'OPEN_EDIT_CHANNEL_TOPIC_MODAL',
    };

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);

    newWrapper.find('Button.channel__edit-topic').simulate('click');

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(1);
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      1,
      expectedOpenEditChannelTopicModal
    );
  });

  it('should render a <Modal> with a <EditChannelTopic> when the "Edit" button is clicked', () => {
    // add the div node for the modal
    const modalRoot = (global as any).document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = (global as any).document.querySelector('body');
    body.appendChild(modalRoot);

    expect(wrapper.find('Modal').length).toBe(0);
    expect(wrapper.find('Modal').find('EditChannelTopic').length).toBe(0);

    wrapper.find('Button.channel__edit-topic').simulate('click');

    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.find('Modal').find('EditChannelTopic').length).toBe(1);
  });
});
