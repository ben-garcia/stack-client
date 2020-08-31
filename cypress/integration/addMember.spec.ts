describe('Add member', () => {
  const member = {
    email: 'user2@email.com',
    username: 'user2user2',
    password: 'user2user2',
  };
  const channel = {
    name: 'channel name',
    description: 'channel description',
  };
  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).login();
    (cy as any).addWorkspace({ name: 'CypressTest' });
    (cy as any).registerUser(member);
    (cy as any).addChannel(channel);
    (cy as any).addTeammate(member.username);
    cy.visit('/dashboard');
  });

  it('should close the modal', () => {
    cy.contains('Add people').click();
    cy.get('.modal').should('be.visible');
    cy.contains('Add People').should('be.visible');
    cy.get('.modal__button-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('should successfully add member', () => {
    cy.get('.channel__members-count').should('have.text', 1);
    cy.contains('Add people').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('.modal')
      .contains('user1user1')
      .should('not.exist');
    cy.get('.modal')
      .contains(member.username)
      .should('exist')
      .click();
    cy.get('button[type="submit"]')
      .should('be.enabled')
      .click();
    cy.get('.teammates-list')
      .contains(member.username)
      .should('be.visible');
    cy.get('.channel__members-count').should('have.text', 2);
  });

  it('should successfully add member(via channel details)', () => {
    cy.contains('Details').click();
    cy.get('.channel-details__member-count').should('have.text', 1);
    cy.get('.channel-details__add-people-button').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('.modal')
      .contains('user1user1')
      .should('not.exist');
    cy.get('.modal')
      .contains(member.username)
      .should('exist')
      .click();
    cy.get('button[type="submit"]')
      .should('be.enabled')
      .click();
    cy.get('.teammates-list')
      .contains(member.username)
      .should('be.visible');
    cy.get('.channel-details__member-count').should('have.text', 2);
  });
});
