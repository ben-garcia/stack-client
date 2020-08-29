Cypress.Commands.add('clearDB', () => {
  cy.request({
    method: 'POST',
    url: 'localhost:8080/tests/clear',
  });
});

Cypress.Commands.add('registerUser', user => {
  cy.request({
    method: 'POST',
    url: 'localhost:8080/tests/users',
    body: user,
  });
});

Cypress.Commands.add('login', () => {
  const user = {
    email: 'user1@email.com',
    password: 'user1user1',
    username: 'user1',
  };

  (cy as any).registerUser(user);

  cy.request({
    method: 'POST',
    url: 'localhost:8080/api/auth/login',
    body: { ...user },
  }).then(res => {
    localStorage.setItem('user', JSON.stringify(res.body.user));
  });
});

Cypress.Commands.add('addWorkspace', workspace => {
  const userInLocalStorage = JSON.parse(localStorage.getItem('user') as any);
  cy.request({
    method: 'POST',
    url: 'localhost:8080/tests/workspaces',
    body: {
      name: workspace.name,
      owner: userInLocalStorage.id,
      teammates: [userInLocalStorage],
    },
  }).then(res => {
    localStorage.setItem('currentWorkspace', JSON.stringify(res.body));
  });
});
