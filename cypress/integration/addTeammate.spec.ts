describe('Add teammate', () => {
  const teammate = {
    email: 'user2@email.com',
    username: 'user2user2',
    password: 'user2user2',
  };
  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).login();
    (cy as any).addWorkspace({ name: 'CypressTest' });
    (cy as any).registerUser(teammate);
    cy.visit('/dashboard');
  });

  it('should close the modal', () => {
    cy.get('.teammates-list__add-button').click();
    cy.get('.modal').should('be.visible');
    cy.contains('Invite People').should('be.visible');
    cy.get('.modal__button-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('should successfully add teammate', () => {
    cy.get('.teammates-list__add-button').click();
    cy.get('input[name="username-1"]').type(teammate.username);
    cy.get('button[type="submit"]').click();
    cy.contains('user1user1 (You)')
      .should('be.visible')
      .parent()
      .and('not.have.class', 'list__item--active');
    cy.contains(teammate.username)
      .should('be.visible')
      .parent()
      .should('not.have.class', 'list__item--active')
      .click()
      .should('have.class', 'list__item--active');
    cy.get('.teammate__name').should('have.text', teammate.username);
    cy.get('.teammate-view__username').should('have.text', teammate.username);
    cy.get('.teammate-view__message').should('have.text', teammate.username);
  });
});
