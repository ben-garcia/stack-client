import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { WorkspaceList } from '..';

const mockStore = configureStore();
const store = mockStore({});

const workspaces = [
  {
    id: 1,
    name: 'testing 1',
    createdAt: 'gjgjgjg',
    updatedAt: 'gjgjgjgjg',
  },
  {
    id: 2,
    name: 'testing 2',
    createdAt: 'igjhgghghghg',
    updatedAt: '258585858558',
  },
];

describe('WorkspaceList Integration', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <WorkspaceList workspaces={workspaces} />
      </Provider>
    );
  });

  it('should render', () => {
    expect(wrapper.find('WorkspaceList').length).toBe(1);
  });

  it('should contain the correct classes', () => {
    expect(
      wrapper
        .find('WorkspaceList')
        .find('aside')
        .hasClass('workspace-list')
    ).toBe(true);
  });
});
