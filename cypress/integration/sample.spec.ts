describe('RegisterPage', () => {
  it('should register a user', () => {
    cy.visit('/');

    cy.contains('Register').click();

    cy.get('.button').should('be.disabled');

    cy.get('input#email').type('user1234@email.com');
    cy.get('.button').should('be.disabled');

    cy.get('input#username').type('user1234');
    cy.get('.button').should('be.disabled');

    cy.get('input#password').type('bestpassword');
    cy.get('.button').should('be.enabled');

    cy.get('button[type="submit"]').click();
  });
});
