import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { teammateReducer } from 'store/teammate';
import { userReducer } from 'store/user';
import TeammateView from '.';

describe('<TeammateView />', () => {
  const mockState = {
    currentChannel: {
      id: 1,
      createdAt: new Date().toISOString(),
      description: 'channel description',
      name: 'channel name',
      topic: 'channel topic',
    },
    currentTeammate: {
      id: 0,
      username: 'user644',
    },
    user: { id: 1, username: 'user644' },
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    currentTeammate: teammateReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <TeammateView />
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
    const teammateViewWrapper: ReactWrapper = wrapper.find('TeammateView');
    expect(teammateViewWrapper.childAt(0).name()).toBe('div');
  });

  describe('currentTeammate.id !== 0 && !currentChannel.id', () => {
    const newState = {
      ...mockState,
      currentChannel: { id: 0 },
      currentTeammate: { ...mockState.currentTeammate, id: 1 },
    };
    const newStore = createStore(rootReducer, newState as any);
    const newWrapper = mountComponent(newStore);

    it('should render currentTeammate.username', () => {
      expect(newWrapper.find('Text.teammate-view__username').text()).toBe(
        mockState.currentTeammate.username
      );
    });

    it('should render correct text about teammate(user.id === currentTeammate.id)', () => {
      expect(newWrapper.find('div.teammate-view__inner').text()).toMatch(
        'This is your space.Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.'
      );
    });

    it('should render correct text about teammate(user.id !== currentTeammate.id)', () => {
      const newNewState = {
        ...mockState,
        currentChannel: { id: 0 },
        currentTeammate: { ...mockState.user, id: 2 },
      };
      const newNewStore = createStore(rootReducer, newNewState as any);
      const wrapperNew = mountComponent(newNewStore);

      expect(wrapperNew.find('div.teammate-view__inner').text()).toMatch(
        `This is the very beginning of your direct message history with${newState.currentTeammate.username}`
      );
    });
  });
});
