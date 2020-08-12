import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { channelDetailsReducer } from 'store/channelDetails';
import { teammateReducer } from 'store/teammate';
import { teammatesReducer } from 'store/teammates';
import { viewportReducer } from 'store/viewport';
import { editChannelTopicModalReducer } from 'store/editChannelTopicModal';
import { membersReducer } from 'store/members';
import { userReducer } from 'store/user';
import AddPeople from '.';

describe('<AddPeople />', () => {
  const mockState = {
    currentChannel: {
      id: 1,
      name: 'channel name',
    },
    teammates: {
      list: [
        { id: 1, username: 'user123' },
        { id: 2, username: 'user321' },
      ],
    },
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    channelDetails: channelDetailsReducer,
    currentTeammate: teammateReducer,
    editChannelTopicModalIsOpen: editChannelTopicModalReducer,
    members: membersReducer,
    teammates: teammatesReducer,
    user: userReducer,
    viewport: viewportReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <AddPeople />
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
    const addPeopleWrapper: ReactWrapper = wrapper.find('AddPeople');
    expect(addPeopleWrapper.childAt(0).name()).toBe('Form');
  });

  it('should render correct text to inform the user what this form is for', () => {
    const textWrapper: ReactWrapper = wrapper.find('Text.form__message');
    expect(textWrapper.first().text()).toMatch(
      /Select the teammate\/s you would like to become member\/s/
    );
    expect(textWrapper.first().text()).toMatch(mockState.currentChannel.name);
  });

  it('should render correct text to inform the user about inviting teammates', () => {
    const textWrapper: ReactWrapper = wrapper.find('Text.form__message');
    expect(textWrapper.at(1).text()).toBe(
      `To add a teammate who is not on Stack, you will need toinvite them first`
    );
  });

  it('should render the usernames of the teammates', () => {
    const buttonsWrapper = wrapper.find('Button.form__button');
    expect(buttonsWrapper.at(0).text()).toBe(
      mockState.teammates.list[0].username
    );
    expect(buttonsWrapper.at(1).text()).toBe(
      mockState.teammates.list[1].username
    );
  });

  it('should call dispatch 2 times when "invite them first" button is clicked', () => {
    const newStore = createStore(rootReducer, mockState as any);
    const expectedCloseAddPeopleModal = {
      type: 'CLOSE_ADD_PEOPLE_MODAL',
    };
    const expectedOpenInvitePeopleModal = {
      type: 'OPEN_INVITE_PEOPLE_MODAL',
    };

    newStore.dispatch = jest.fn();

    const newWrapper = mountComponent(newStore);

    newWrapper.find('Button.form__open-invite-button').simulate('click');

    expect(newStore.dispatch).toHaveBeenCalledTimes(2);
    expect(newStore.dispatch).toHaveBeenNthCalledWith(
      1,
      expectedCloseAddPeopleModal
    );
    expect(newStore.dispatch).toHaveBeenNthCalledWith(
      2,
      expectedOpenInvitePeopleModal
    );
  });
});
