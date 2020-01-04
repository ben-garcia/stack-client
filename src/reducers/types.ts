import rootReducer from '.';

export interface Action {
  type: string;
}

export type AppState = ReturnType<typeof rootReducer>;
