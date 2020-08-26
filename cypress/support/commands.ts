Cypress.Commands.add('registerUser', user => {
  cy.request({
    method: 'POST',
    url: 'localhost:8080/tests/users',
    body: user,
  });
});
