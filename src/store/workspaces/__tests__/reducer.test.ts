import WorkspacesReducer from '../reducer';
import { WorkspacesState } from '../types';

describe('WorkspacesReducer', () => {
  const initialState: WorkspacesState = { list: [], isLoading: false };
  const workspace = {
    id: 1,
    name: 'workspace name',
    ownerId: 1,
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = WorkspacesReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new teammate to the list when action.type === "ADD_WORKSPACE"', () => {
    const action: any = {
      type: 'ADD_WORKSPACE',
      payload: workspace,
    };
    const expected = {
      ...initialState,
      list: [workspace],
    };
    const result = WorkspacesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return isLoading === true when action.type === "REQUEST_USER_WORKSPACES"', () => {
    const action: any = {
      type: 'REQUEST_USER_WORKSPACES',
    };
    const expected = {
      ...initialState,
      isLoading: true,
    };
    const result = WorkspacesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return workspaces when action.type === "RECEIVED_USER_WORKSPACES"', () => {
    const action: any = {
      type: 'RECEIVED_USER_WORKSPACES',
      payload: [workspace],
    };
    const expected = {
      ...initialState,
      list: [workspace],
    };
    const result = WorkspacesReducer(initialState, action);
    expect(result).toEqual(expected);
  });

  it('return error when action.type === "RECEIVED_USER_WORKSPACES_ERROR"', () => {
    const error = 'this error';
    const action: any = {
      type: 'RECEIVED_USER_WORKSPACES_ERROR',
      payload: error,
    };
    const expected = {
      ...initialState,
      error,
    };
    const result = WorkspacesReducer(initialState, action);
    expect(result).toEqual(expected);
  });
});
