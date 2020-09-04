describe('Add direct message', () => {
  beforeEach(() => {
    cy.clearDB()
      .login()
      .addWorkspace({ name: 'CypressTest' })
      .visit('/dashboard');
  });

  it('should successfully add a direct message', () => {
    cy.get('.teammates-list__button').click();
    cy.get('.message__wrapper').should('not.exist');
    cy.get('textarea').type('direct channel message{enter}');
    cy.get('.message__wrapper').should('have.lengthOf', 1);
  });
});
