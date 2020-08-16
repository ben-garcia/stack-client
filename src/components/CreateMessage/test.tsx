import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { teammateReducer } from 'store/teammate';
import { workspaceReducer } from 'store/workspace';
import { userReducer } from 'store/user';
import CreateMessage from '.';

describe('<CreateMessage />', () => {
  const mockState = {
    currentChannel: {
      id: 1,
      name: 'channel name',
    },
    currentTeammate: {
      id: 1,
      username: 'user1234',
    },
    currentWorkspace: {
      id: 1,
    },
    user: { id: 2, username: 'user22626' },
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    currentTeammate: teammateReducer,
    currentWorkspace: workspaceReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <CreateMessage />
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
    const createChannelFormWrapper: ReactWrapper = wrapper.find(
      'CreateMessage'
    );
    expect(createChannelFormWrapper.childAt(0).name()).toBe('Form');
  });

  describe('placeholder text', () => {
    it('should include currentChannel.name', () => {
      const textareaWrapper: ReactWrapper = wrapper.find('textarea');
      expect((textareaWrapper.props() as any).placeholder).toBe(
        `Message #${mockState.currentChannel.name}`
      );
    });

    it('should include currentTeammate.username', () => {
      const newState = { ...mockState, currentChannel: { id: 0 } };
      const newStore = createStore(rootReducer, newState as any);
      const newWrapper = mountComponent(newStore);
      const textareaWrapper: ReactWrapper = newWrapper.find('textarea');
      expect((textareaWrapper.props() as any).placeholder).toBe(
        `Message #${newState.currentTeammate.username}`
      );
    });
  });

  it('should render with a textarea field', () => {
    expect(wrapper.find('textarea').length).toBe(1);
  });

  it('should change value of textarea when user types', () => {
    const textareaWrapper = wrapper.find('textarea');
    textareaWrapper.simulate('change', {
      target: { value: 'thismessage' },
    });
    expect((textareaWrapper.instance() as any).value).toBe('thismessage');
  });
});
