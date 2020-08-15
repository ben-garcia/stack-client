import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { addPeopleModalReducer } from 'store/addPeopleModal';
import { channelReducer } from 'store/channel';
import { channelDetailsReducer } from 'store/channelDetails';
import { directMessagesReducer } from 'store/directMessages';
import { editChannelDescriptionModalReducer } from 'store/editChannelDescriptionModal';
import { membersReducer } from 'store/members';
import { messagesReducer } from 'store/messages';
import { teammateReducer } from 'store/teammate';
import { teammatesReducer } from 'store/teammates';
import { userReducer } from 'store/user';
import { viewportReducer } from 'store/viewport';
import { workspaceReducer } from 'store/workspace';
import ViewWrapper from '.';

describe('<ViewWrapper />', () => {
  const mockState = {
    addPeopleModalIsOpen: false,
    channelDetails: { isOpen: false, withMembers: false },
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
    currentWorkspace: {
      id: 1,
      name: 'workspace name',
    },
    editChannelDescriptionModalIsOpen: false,
    directMessages: { isLoading: false, list: [] },
    members: { list: [] },
    messages: { isLoading: false, list: [] },
    user: { id: 1, username: 'user644' },
    teammates: { list: [] },
    viewport: { isDesktop: false, isPhone: false, isTablet: false },
  };
  const rootReducer = combineReducers({
    addPeopleModalIsOpen: addPeopleModalReducer,
    currentChannel: channelReducer,
    currentTeammate: teammateReducer,
    currentWorkspace: workspaceReducer,
    channelDetails: channelDetailsReducer,
    directMessages: directMessagesReducer,
    editChannelDescriptionModalIsOpen: editChannelDescriptionModalReducer,
    members: membersReducer,
    messages: messagesReducer,
    user: userReducer,
    teammates: teammatesReducer,
    viewport: viewportReducer,
  });
  const store = createStore(rootReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <ViewWrapper />
      </Provider>
    );
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as a <main>', () => {
    const viewWrapper: ReactWrapper = wrapper.find('ViewWrapper');
    expect(viewWrapper.childAt(0).name()).toBe('main');
  });

  describe('currenChannel.id !== 0 && !curentTeammate.id', () => {
    it('should render <WorkspaceInfo>, <Scrollbar>, <CreateMessage>', () => {
      expect(wrapper.find('WorkspaceInfo').exists()).toBe(true);
      expect(wrapper.find('Scrollbar').exists()).toBe(true);
      expect(wrapper.find('CreateMessage').exists()).toBe(true);
    });

    it('should render currentChannel.name', () => {
      expect(wrapper.find('Text.view-wrapper__name').text()).toBe(
        mockState.currentChannel.name
      );
    });

    it('should render currentChannel.createdAt', () => {
      expect(wrapper.find('div.view-wrapper__inner').text()).toMatch(
        'You created this channel onToday'
      );
    });

    it('should render currentChannel.description', () => {
      expect(wrapper.find('div.view-wrapper__inner').text()).toMatch(
        `This is the very beginning of the${mockState.currentChannel.name}`
      );
    });

    it('should call dispatch when "edit-button" is clicked', () => {
      const newState = { ...mockState };
      const newStore = createStore(rootReducer, newState as any);
      const expectedOpenEditChannelDescriptionModal = {
        type: 'OPEN_EDIT_CHANNEL_DESCRIPTION_MODAL',
      };

      newStore.dispatch = jest.fn();

      const newWrapper = mountComponent(newStore);

      newWrapper.find('Button.view-wrapper__edit-button').simulate('click');

      expect(newStore.dispatch).toHaveBeenCalledTimes(1);
      expect(newStore.dispatch).toHaveBeenCalledWith(
        expectedOpenEditChannelDescriptionModal
      );
    });

    describe('<Modal>', () => {
      it('should render <Modal> with <EditChannelDescription> when "edit-button" is clicked', () => {
        // add the div node for the modal
        const modalRoot = (global as any).document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        const body = (global as any).document.querySelector('body');
        body.appendChild(modalRoot);

        expect(wrapper.find('Modal').exists()).toBe(false);
        expect(wrapper.find('EditChannelDescription').exists()).toBe(false);

        wrapper.find('Button.view-wrapper__edit-button').simulate('click');

        expect(wrapper.find('Modal').exists()).toBe(true);
        expect(wrapper.find('EditChannelDescription').exists()).toBe(true);
      });

      it('should render <Modal> with <AddPeople> when "user-icon" is clicked', () => {
        expect(wrapper.find('AddPeople').exists()).toBe(false);

        wrapper.find('Button.view-wrapper__user-icon').simulate('click');

        expect(wrapper.find('AddPeople').exists()).toBe(true);
      });
    });
  });

  describe('currentTeammate.id !== 0 && !currentChannel.id', () => {
    const newState = {
      ...mockState,
      currentChannel: { id: 0 },
      currentTeammate: { ...mockState.currentTeammate, id: 1 },
    };
    const newStore = createStore(rootReducer, newState as any);
    const newWrapper = mountComponent(newStore);

    it('should render <WorkspaceInfo>, <Scrollbar>, <CreateMessage>', () => {
      expect(newWrapper.find('WorkspaceInfo').exists()).toBe(true);
      expect(newWrapper.find('Scrollbar').exists()).toBe(true);
      expect(newWrapper.find('CreateMessage').exists()).toBe(true);
    });

    it('should render currentTeammate.username', () => {
      expect(newWrapper.find('Text.c-teammate__username').text()).toBe(
        mockState.currentTeammate.username
      );
    });

    it('should render correct text about teammate(user.id === currentTeammate.id)', () => {
      expect(newWrapper.find('div.c-teammate__inner').text()).toMatch(
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

      expect(wrapperNew.find('div.c-teammate__inner').text()).toMatch(
        `This is the very beginning of your direct message history with${newState.currentTeammate.username}`
      );
    });
  });

  describe('<Placeholder>', () => {
    it('render when directMessage.isLoading ', () => {
      const newState = {
        ...mockState,
        directMessages: { isLoading: true, list: [{}] },
      };
      const newStore = createStore(rootReducer, newState as any);
      const newWrapper = mountComponent(newStore);

      expect(newWrapper.find('Placeholder').exists()).toBe(true);
    });

    it('render when messages.isLoading ', () => {
      const newState = {
        ...mockState,
        messages: { isLoading: true, list: [{}] },
      };
      const newStore = createStore(rootReducer, newState as any);
      const newWrapper = mountComponent(newStore);

      expect(newWrapper.find('Placeholder').exists()).toBe(true);
    });
  });

  it('should render <ChannelDetails>', () => {
    const newState = {
      ...mockState,
      channelDetails: { isOpen: true },
    };
    const newStore = createStore(rootReducer, newState as any);
    const newWrapper = mountComponent(newStore);

    expect(newWrapper.find('ChannelDetails').exists()).toBe(true);
  });
});
