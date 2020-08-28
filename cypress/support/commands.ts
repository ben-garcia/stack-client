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
    // store the user in local storage
    localStorage.setItem('user', JSON.stringify(res.body.user));
  });
});
