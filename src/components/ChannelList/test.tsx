import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { channelsReducer } from 'store/channels';

import ChannelList from '.';

describe('<ChannelList />', () => {
  const mockState = {
    currentChannel: { id: 1 },
    channels: {
      list: [],
    },
  };
  const store = createStore(channelsReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <ChannelList />
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
    const channelListWrapper: ReactWrapper = wrapper.find('ChannelList');
    expect(channelListWrapper.childAt(0).name()).toBe('section');
  });

  it('should render "Channels" inside a <Text>', () => {
    expect(wrapper.find('Text').text()).toBe('Channels');
  });

  it('should render empty <ul> tag when there are no channels', () => {
    const ulWrapper: ReactWrapper = wrapper.find('ul');
    expect(ulWrapper.text()).toBe('');
  });

  it('should render 3 <li> tags when there are 3 channels', () => {
    const stateWithThreeChannels = {
      ...mockState,
      channels: { list: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    };
    const newWrapper = mountComponent(
      createStore(channelsReducer, stateWithThreeChannels as any)
    );
    const liWrapper: ReactWrapper = newWrapper.find('ListItem').find('li');

    expect(liWrapper.length).toBe(3);
  });

  it('should render the name of the channel in a <Text>', () => {
    const stateWithThreeChannels = {
      ...mockState,
      channels: { list: [{ id: 1, name: 'channelName' }] },
    };
    const newWrapper = mountComponent(
      createStore(channelsReducer, stateWithThreeChannels as any)
    );
    const textWrapper: ReactWrapper = newWrapper.find('ListItem').find('Text');

    expect(textWrapper.text()).toBe('channelName');
  });

  it('should call dispatch a total of 5 times when channel button is clicked(currentChannel.id !== channel.id)', () => {
    const channel = {
      id: 3,
      name: 'channel name',
      description: 'channel description',
      private: false,
      topic: 'channel topic',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const stateWithThreeChannels = {
      ...mockState,
      channels: { list: [channel] },
    };
    const storeWithSpy = createStore(
      channelsReducer,
      stateWithThreeChannels as any
    );
    storeWithSpy.dispatch = jest.fn();
    const newWrapper = mountComponent(storeWithSpy);
    const expectedGetCurrentChannel = {
      payload: channel,
      type: 'GET_CURRENT_CHANNEL',
    };
    const expectedGetCurrentTeammate = {
      payload: { id: 0, username: '' },
      type: 'GET_CURRENT_TEAMMATE',
    };
    const expectedRequestChannelMembers = {
      type: 'REQUEST_CHANNEL_MEMBERS',
    };
    const expectedRequestChannelMessages = {
      type: 'REQUEST_CHANNEL_MESSAGES',
    };
    const expectedClearDirectMessages = {
      type: 'CLEAR_DIRECT_MESSAGES',
    };

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);

    newWrapper
      .find('li')
      .find('Button')
      .simulate('click');

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(5);
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      1,
      expectedGetCurrentChannel
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      2,
      expectedGetCurrentTeammate
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      3,
      expectedRequestChannelMembers
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      4,
      expectedRequestChannelMessages
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      5,
      expectedClearDirectMessages
    );
  });

  it('should call dispatch a total of 0 times when channel button is clicked(currentChannel.id === channel.id)', () => {
    const channel = {
      id: 1,
    };
    const stateWithThreeChannels = {
      ...mockState,
      channels: { list: [channel] },
    };
    const storeWithSpy = createStore(
      channelsReducer,
      stateWithThreeChannels as any
    );
    storeWithSpy.dispatch = jest.fn();
    const newWrapper = mountComponent(storeWithSpy);

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);

    newWrapper
      .find('li')
      .find('Button')
      .simulate('click');

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should render a <Modal> with a <CreateChannelForm> when the create channel button is clicked', () => {
    const newState = {
      currentChannel: { id: 1 },
      channels: {
        list: [{ id: 10 }],
      },
      directMessages: { list: [] },
      messages: { list: [] },
      teammates: { list: [] },
    };
    // add the div node for the modal
    const modalRoot = (global as any).document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    const body = (global as any).document.querySelector('body');
    body.appendChild(modalRoot);

    const anotherStore = createStore(channelsReducer, newState as any);
    const newWrapper = mountComponent(anotherStore);
    const createNewChannelButton = newWrapper.find('div');

    expect(newWrapper.find('Modal').length).toBe(0);
    expect(newWrapper.find('Modal').find('CreateChannelForm').length).toBe(0);

    createNewChannelButton
      .find('Button')
      .at(0)
      .simulate('click');

    expect(newWrapper.find('Modal').length).toBe(1);
    expect(newWrapper.find('Modal').find('CreateChannelForm').length).toBe(1);
  });
});
