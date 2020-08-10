import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { teammateReducer } from 'store/teammate';
import TeammateInfo from '.';

describe('<TeammateInfo />', () => {
  const currentTeammate = {
    active: true,
    id: 1,
    username: 'current teammate',
  };
  const mockState = {
    teammates: { list: [currentTeammate] },
    user: { username: 'current teammate' },
  };
  const store = createStore(teammateReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <TeammateInfo currentTeammate={currentTeammate} />
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
    const teammateInfoWrapper: ReactWrapper = wrapper.find('TeammateInfo');
    expect(teammateInfoWrapper.childAt(0).name()).toBe('section');
  });

  it('should render "currentTeammate.username(you)", "Active" status from currentTeammate(when user.id === currentTeammate.id)', () => {
    const teammateUsernameWrapper: ReactWrapper = wrapper.find(
      'Text.teammate__name'
    );
    const teammateActiveWrapper: ReactWrapper = wrapper.find(
      'Text.teammate__status'
    );

    expect(teammateUsernameWrapper.text()).toBe(
      `${currentTeammate.username}(you)`
    );
    expect(teammateActiveWrapper.text()).toBe('Active');
  });

  it('should render teammate.username, "Away" status from currentTeammate(user.id !== currentTeammate.id)', () => {
    const mockTeammate = {
      id: 2,
      username: 'user123',
      active: false,
    };
    const newMockState = {
      ...mockState,
      teammates: { list: [mockTeammate] },
    };
    const newMockStore = createStore(teammateReducer, newMockState as any);
    const newWrapper = mount(
      <Provider store={newMockStore}>
        <TeammateInfo currentTeammate={mockTeammate} />
      </Provider>
    );
    const teammateUsernameWrapper: ReactWrapper = newWrapper.find(
      'Text.teammate__name'
    );
    const teammateActiveWrapper: ReactWrapper = newWrapper.find(
      'Text.teammate__status'
    );

    expect(teammateUsernameWrapper.text()).toBe(
      newMockState.teammates.list[0].username
    );
    expect(teammateActiveWrapper.text()).toBe('Away');
  });
});
