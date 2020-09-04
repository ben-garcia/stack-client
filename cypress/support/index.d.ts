interface Channel {
  name: string;
  description: string;
  private: boolean;
  topic?: string;
}

interface User {
  email: string;
  username: string;
  password: string;
}

interface Workspace {
  name: string;
}

declare namespace Cypress {
  interface Chainable {
    addWorkspace(workspace: Workspace): Chainable<Element>;
    addChannel(channel: Channel): Chainable<Element>;
    clearDB(): Chainable<Element>;
    login(): Chainable<Element>;
    registerUser(user: User): Chainable<Element>;
  }
}
