import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelDetailsReducer } from 'store/channelDetails';
import { channelReducer } from 'store/channel';
import { membersReducer } from 'store/members';
import { userReducer } from 'store/user';
import ChannelDetails from '.';

describe('<ChannelDetails />', () => {
  const user = { id: 1, username: 'user1' };
  const members = [
    user,
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
  ];
  const mockState = {
    channelDetails: { withMembers: false },
    currentChannel: {
      createdAt: new Date().toISOString(),
      description: 'channel description',
      name: 'channel name',
      topic: 'channel topic',
    },
    members: { list: members },
    user,
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    channelDetails: channelDetailsReducer,
    members: membersReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <ChannelDetails />
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
    const channelDetailsWrapper: ReactWrapper = wrapper.find('ChannelDetails');
    expect(channelDetailsWrapper.childAt(0).name()).toBe('section');
  });

  it('should render the top section correctly', () => {
    expect(wrapper.find('Text.channel-details__text').text()).toBe('Details');
    expect(wrapper.find('Text.channel-details__channel-name').text()).toBe(
      `# ${mockState.currentChannel.name}`
    );
    expect(wrapper.find('Button.channel-details__close-button').exists()).toBe(
      true
    );
  });

  it('should render "add-people" button with "Add"', () => {
    expect(
      wrapper.find('Button.channel-details__add-people-button').text()
    ).toBe('Add');
  });

  describe('about section', () => {
    it('should render channel.topic', () => {
      expect(
        wrapper
          .find('Text.channel-details__subtext')
          .at(1)
          .text()
      ).toBe(mockState.currentChannel.topic);
    });

    it('should render placeholder text when channel.topic === ""', () => {
      const newState = {
        ...mockState,
        currentChannel: { ...mockState.currentChannel, topic: '' },
      };
      const newStore = createStore(rootReducer, newState as any);
      const newWrapper = mountComponent(newStore);

      expect(
        newWrapper
          .find('Text.channel-details__subtext')
          .at(1)
          .text()
      ).toBe('Whats up for discussion?');
    });

    it('should render channel.description', () => {
      expect(
        wrapper
          .find('Text.channel-details__subtext')
          .at(3)
          .text()
      ).toBe(mockState.currentChannel.description);
    });

    it('should render "Created" text', () => {
      expect(wrapper.find('Text.channel-details__created').text()).toBe(
        'Created Today'
      );
    });
  });

  describe('members section', () => {
    it('should render the number of nembers', () => {
      expect(wrapper.find('Text.channel-details__member-count').text()).toBe(
        mockState.members.list.length.toString()
      );
    });

    it('should render the usernames of the members', () => {
      const listItemWrapper = wrapper.find('ListItem');

      expect(listItemWrapper.length).toBe(mockState.members.list.length);
      expect(listItemWrapper.at(0).text()).toBe(
        `${mockState.members.list[0].username}(you)`
      );
      expect(listItemWrapper.at(1).text()).toBe(
        mockState.members.list[1].username
      );
      expect(listItemWrapper.at(2).text()).toBe(
        mockState.members.list[2].username
      );
    });
  });

  describe('call dispatch', () => {
    let newWrapper: ReactWrapper;
    let newStore: any;

    beforeEach(() => {
      const newState = { ...mockState };
      newStore = createStore(rootReducer, newState as any);

      newStore.dispatch = jest.fn();

      newWrapper = mountComponent(newStore);
    });

    it('should call dispatch when "close-button" is clicked', () => {
      const expectedCloseChannelDetails = {
        type: 'CLOSE_CHANNEL_DETAILS',
      };

      newWrapper.find('Button.channel-details__close-button').simulate('click');

      expect(newStore.dispatch).toHaveBeenCalledTimes(1);
      expect(newStore.dispatch).toHaveBeenCalledWith(
        expectedCloseChannelDetails
      );
    });

    it('should call dispatch when "add-people" button is clicked', () => {
      const expectedOpenPeopleModal = {
        type: 'OPEN_ADD_PEOPLE_MODAL',
      };

      newWrapper
        .find('Button.channel-details__add-people-button')
        .simulate('click');

      expect(newStore.dispatch).toHaveBeenCalledTimes(1);
      expect(newStore.dispatch).toHaveBeenCalledWith(expectedOpenPeopleModal);
    });

    it('should call dispatch when "edit channel topic button" button is clicked', () => {
      const expectedOpenEditChannelTopicModal = {
        type: 'OPEN_EDIT_CHANNEL_TOPIC_MODAL',
      };

      newWrapper
        .find('Button.channel-details__edit-button')
        .first()
        .simulate('click');

      expect(newStore.dispatch).toHaveBeenCalledTimes(1);
      expect(newStore.dispatch).toHaveBeenCalledWith(
        expectedOpenEditChannelTopicModal
      );
    });

    it('should call dispatch when "edit channel description button" button is clicked', () => {
      const expectedOpenEditChannelDescriptionModal = {
        type: 'OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL',
      };

      newWrapper
        .find('Button.channel-details__edit-button')
        .at(1)
        .simulate('click');

      expect(newStore.dispatch).toHaveBeenCalledTimes(1);
      expect(newStore.dispatch).toHaveBeenCalledWith(
        expectedOpenEditChannelDescriptionModal
      );
    });
  });
});
