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
import InvitePeopleForm from '.';

describe('<InvitePeopleForm />', () => {
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
        <InvitePeopleForm />
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
    const invitePeopleWrapper: ReactWrapper = wrapper.find('InvitePeopleForm');
    expect(invitePeopleWrapper.childAt(0).name()).toBe('div');
  });

  it('should render correct text to inform the user what this form is for', () => {
    const textWrapper: ReactWrapper = wrapper.find(
      'Text.invite-people-form__sub-header'
    );
    expect(textWrapper.first().text()).toMatch(
      /Invite people who are part of your team./
    );
  });

  it('should render correct text to inform the user about inviting people', () => {
    const textWrapper: ReactWrapper = wrapper.find(
      'Text.invite-people-form__message'
    );
    expect(textWrapper.text()).toBe(
      'New members will automatically join public channels.'
    );
  });

  it('should render with a single input field by default', () => {
    expect(wrapper.find('input[type="text"]').length).toBe(1);
  });

  it('should render 3 input field when "Add another" is clicked 3 times', () => {
    const buttonWrapper = wrapper.find(
      'Button.invite-people-form__add-input-button'
    );
    buttonWrapper.simulate('click');
    buttonWrapper.simulate('click');
    expect(wrapper.find('input[type="text"]').length).toBe(3);
  });
});
