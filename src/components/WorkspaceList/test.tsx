import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { workspacesReducer } from 'store/workspaces';

import WorkspaceList from '.';

describe('<WorkspaceList />', () => {
  const mockState = {
    currentWorkspace: { id: 1 },
  };
  const workspaces = [
    {
      id: 10,
      name: 'workspace 1',
      ownerId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 20,
      name: 'workspace 2',
      ownerId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  const store = createStore(workspacesReducer, mockState as any);
  const mountComponent = (mockStore = store): ReactWrapper =>
    mount(
      <Provider store={mockStore}>
        <WorkspaceList workspaces={workspaces} />
      </Provider>
    );
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mountComponent();
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render as an <aside>', () => {
    const workspaceListWrapper: ReactWrapper = wrapper.find('WorkspaceList');
    expect(workspaceListWrapper.childAt(0).name()).toBe('aside');
  });

  it('should render empty <ul> tag when there are no workspaces', () => {
    const newWrapper = mount(
      <Provider store={store}>
        <WorkspaceList workspaces={[]} />
      </Provider>
    );
    const ulWrapper: ReactWrapper = newWrapper.find('ul');
    expect(ulWrapper.text()).toBe('');
  });

  it('should render 2 <li> tags when there are 2 workspaces', () => {
    const liWrapper: ReactWrapper = wrapper.find('ListItem').find('li');
    expect(liWrapper.length).toBe(2);
  });

  it('should render the first letter(as uppercase) of the workspace in a <Button>', () => {
    const textWrapper: ReactWrapper = wrapper.find('ListItem').find('Button');
    expect(textWrapper.at(0).text()).toBe(workspaces[0].name[0].toUpperCase());
    expect(textWrapper.at(1).text()).toBe(workspaces[1].name[0].toUpperCase());
  });

  it('should call dispatch a total of 7 times when channel button is clicked(currentWorkspace.id !== workspace.id)', () => {
    const storeWithSpy = createStore(workspacesReducer, mockState as any);

    storeWithSpy.dispatch = jest.fn();

    const newWrapper = mountComponent(storeWithSpy);
    const expectedGetCurrentChannel = {
      payload: {
        id: 0,
        description: '',
        name: '',
        topic: '',
        private: false,
        createdAt: '',
        updatedAt: '',
      },
      type: 'GET_CURRENT_CHANNEL',
    };
    const expectedGetCurrentTeammate = {
      payload: { id: 0, username: '' },
      type: 'GET_CURRENT_TEAMMATE',
    };
    const expectedGetCurrentWorkspace = (workspace: any) => ({
      payload: workspace,
      type: 'GET_CURRENT_WORKSPACE',
    });
    const expectedRequestWorkspaceChannels = {
      type: 'REQUEST_WORKSPACE_CHANNELS',
    };
    const expectedRequestWorkspaceTeammates = {
      type: 'REQUEST_WORKSPACE_TEAMMATES',
    };
    const expectedClearDirectMessages = {
      type: 'CLEAR_DIRECT_MESSAGES',
    };
    const expectedClearMessages = {
      type: 'CLEAR_MESSAGES',
    };

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);

    newWrapper
      .find('li')
      .find('Button')
      .at(0)
      .simulate('click');

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(7);
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
      expectedGetCurrentWorkspace(workspaces[0])
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      4,
      expectedRequestWorkspaceChannels
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      5,
      expectedRequestWorkspaceTeammates
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      6,
      expectedClearDirectMessages
    );
    expect(storeWithSpy.dispatch).toHaveBeenNthCalledWith(
      7,
      expectedClearMessages
    );
  });

  it('should call dispatch a total of 0 times when workspace button is clicked(currentWorkspace.id === workspace.id)', () => {
    const storeWithSpy = createStore(workspacesReducer, mockState as any);

    storeWithSpy.dispatch = jest.fn();

    const newWrapper = mount(
      <Provider store={storeWithSpy}>
        <WorkspaceList workspaces={[{ ...workspaces[0], id: 1 }]} />
      </Provider>
    );

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);

    newWrapper
      .find('li')
      .find('Button')
      .simulate('click');

    expect(storeWithSpy.dispatch).toHaveBeenCalledTimes(0);
  });
});
