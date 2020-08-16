import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { channelReducer } from 'store/channel';
import { teammateReducer } from 'store/teammate';
import { messagesReducer } from 'store/messages';
import { directMessagesReducer } from 'store/directMessages';
import { teammatesReducer } from 'store/teammates';
import { workspaceReducer } from 'store/workspace';
import { userReducer } from 'store/user';
import CreateWorkspaceForm from '.';

describe('<CreateWorkspaceForm />', () => {
  const mockState = {
    currentChannel: {
      id: 1,
      name: 'channel name',
    },
    currentTeammate: {
      id: 1,
      usernamae: 'user1234',
    },
    currentWorkspace: { id: 1 },
    directMessages: { list: [{}] },
    messages: { list: [{}] },
    teammates: { list: [{}] },
    user: { id: 2, username: 'user22626' },
  };
  const rootReducer = combineReducers({
    currentChannel: channelReducer,
    currentTeammate: teammateReducer,
    currentWorkspace: workspaceReducer,
    messages: messagesReducer,
    directMessages: directMessagesReducer,
    teammates: teammatesReducer,
    user: userReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <CreateWorkspaceForm createWorkspaceFormIsOpen={() => {}} />
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
    const createWorkspaceFormWrapper: ReactWrapper = wrapper.find(
      'CreateWorkspaceForm'
    );
    expect(createWorkspaceFormWrapper.childAt(0).name()).toBe('div');
  });

  it('should render the correct sub header', () => {
    const textWrapper: ReactWrapper = wrapper.find(
      'Text.create-workspace__sub-header'
    );
    expect(textWrapper.first().text()).toBe(
      'Workspaces are where you set up your team for a particular project. Then you can split up the work via channels.'
    );
  });

  it('should render correct text to inform the user about the open checkbox', () => {
    const createWorkspaceMessageWrapper: ReactWrapper = wrapper.find(
      'Text.create-workspace__message'
    );
    expect(createWorkspaceMessageWrapper.text()).toBe(
      'This option will (if checked) open the newly created workspace upon creation. To keep the you current workspace, leave unchecked.'
    );
  });

  it('should render a button with text "Create" by default', () => {
    expect(wrapper.find('Button[type="submit"]').text()).toBe('Create');
  });

  describe('form', () => {
    it('should render with a 1 input field', () => {
      expect(wrapper.find('input[type="text"]').length).toBe(1);
    });

    it('should render a checkbox', () => {
      expect(wrapper.find('input[type="checkbox"]').length).toBe(1);
    });

    it('should change the value of the name when user types', () => {
      const nameWrapper = wrapper.find('input[type="text"]');
      nameWrapper.simulate('change', {
        target: { value: 'thisname' },
      });
      expect((nameWrapper.instance() as any).value).toBe('thisname');
    });

    it('should change the value of the checkbox when user types', () => {
      const openWrapper = wrapper.find('input[type="checkbox"]');
      openWrapper.simulate('change', {
        target: { name: 'open', checked: true },
      });
      expect((openWrapper.instance() as any).value).toBe('true');
    });
  });
});
