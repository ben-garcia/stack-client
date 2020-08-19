import WorkspaceReducer from '../reducer';
import { WorkspaceState } from '../types';

describe('WorkspaceReducer', () => {
  const initialState: WorkspaceState = {
    createdAt: '',
    id: 0,
    name: '',
    ownerId: 0,
    updatedAt: '',
  };

  it('return initial state when action.type doesnt match a valid type', () => {
    const action: any = { type: 'INVALID' };
    const result = WorkspaceReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('return new workspace when action.type === "GET_CURRENT_WORKSPACE"', () => {
    const payload = {
      createdAt: new Date().toISOString(),
      id: 1,
      name: 'name',
      ownerId: 1,
      updatedAt: new Date().toISOString(),
    };
    const action: any = { type: 'GET_CURRENT_WORKSPACE', payload };
    const result = WorkspaceReducer(initialState, action);
    expect(result).toEqual(payload);
    expect(result).not.toEqual(initialState);
  });
});
