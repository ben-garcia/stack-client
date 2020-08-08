import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { teammatesReducer } from 'store/teammates';

import TeammatesList from '.';

describe('<TeammatesList />', () => {
  const mockState = {
    currentTeammate: { id: 1, username: 'user123' },
    invitePeopleModal: false,
    teammates: {
      list: [{ id: 2, username: 'anotheruser' }],
    },
    user: {},
  };
  const store = createStore(teammatesReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <TeammatesList />
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
    const channelListWrapper: ReactWrapper = wrapper.find('TeammatesList');
    expect(channelListWrapper.childAt(0).name()).toBe('section');
  });

  it('should render "Teammates" inside a <Text>', () => {
    expect(wrapper.find('Text.teammates-list__header').text()).toBe(
      'Teammates'
    );
  });

  it('should render one <ListItem> tag when there is 1 teammate with the teammates username', () => {
    const listItemWrapper: ReactWrapper = wrapper.find('ListItem');
    expect(listItemWrapper.length).toBe(1);
    expect(listItemWrapper.text()).toBe(mockState.teammates.list[0].username);
  });

  it('should render 3 <ListItem> tags when there are 3 teammates with username', () => {
    const newState = {
      ...mockState,
      teammates: {
        list: [
          { id: 10, username: 'teammate1' },
          { id: 20, username: 'teammate2' },
          { id: 30, username: 'teammate3' },
        ],
      },
    };
    const newWrapper = mountComponent(
      createStore(teammatesReducer, newState as any)
    );
    const listItemWrapper: ReactWrapper = newWrapper.find('ListItem');

    expect(listItemWrapper.length).toBe(3);
    expect(listItemWrapper.at(0).text()).toBe(
      newState.teammates.list[0].username
    );
    expect(listItemWrapper.at(1).text()).toBe(
      newState.teammates.list[1].username
    );
    expect(listItemWrapper.at(2).text()).toBe(
      newState.teammates.list[2].username
    );
  });

  it('should call dispatch a total of 4 times when teammate button is clicked(currentTeammate.id !== teammate.id)', () => {
    const storeWithSpy = createStore(teammatesReducer, mockState as any);

    storeWithSpy.dispatch = jest.fn();

    const newWrapper = mountComponent(storeWithSpy);
    const expectedGetCurrentTeammate = {
      payload: { ...mockState.teammates.list[0] },
      type: 'GET_CURRENT_TEAMMATE',
    };
    const expectedGetCurrentChannel = {
      payload: {
        id: 0,
        name: '',
        topic: '',
        description: '',
        private: false,
        createdAt: '',
        updatedAt: '',
      },
      type: 'GET_CURRENT_CHANNEL',
    };
    const expectedClearMessages = {
      type: 'CLEAR_MESSAGES',
    };
    const expectedRequestUserDirectMessages = {
      type: 'REQUEST_USER_DIRECT_MESSAGES',
    };

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);

    newWrapper.find('Button.teammates-list__button').simulate('click');

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(4);
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      1,
      expectedGetCurrentTeammate
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      2,
      expectedGetCurrentChannel
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      3,
      expectedClearMessages
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      4,
      expectedRequestUserDirectMessages
    );
  });

  it('should call dispatch a total of 0 times when channel button is clicked(currentTeammate.id === teammate.id)', () => {
    const newState = {
      ...mockState,
      teammates: {
        list: [...mockState.teammates.list, { ...mockState.currentTeammate }],
      },
    };
    const storeWithSpy = createStore(teammatesReducer, newState as any);
    storeWithSpy.dispatch = jest.fn();
    const newWrapper = mountComponent(storeWithSpy);

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);

    newWrapper
      .find('Button.teammates-list__button')
      .at(1)
      .simulate('click');

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);
  });
});
