describe('Add channel', () => {
  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).login();
    (cy as any).addWorkspace({ name: 'CypressTest' });
    cy.visit('/dashboard');
  });
  const channel = {
    name: 'channel 1',
    description: 'testing test',
  };

  it('should close the modal', () => {
    cy.get('.channel-list__add-button').click();
    cy.get('.modal').should('be.visible');
    cy.contains('Create a Channel').should('be.visible');
    cy.get('.modal__button-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('should successfully add channel', () => {
    cy.get('.channel-list__add-button').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="name"]').type(channel.name);
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[name="description"]').type(channel.description);
    cy.get('button[type="submit"]')
      .click()
      .should($el => {
        expect($el.find('.icon--loading')).to.have.lengthOf(1);
        expect(localStorage.getItem('currentChannel')).to.matches(
          /(?=.*id)(?=.*createdAt)(?=.*name)(?=.*description)(?=.*topic)(?=.*private)(?=.*members)(?=.*updatedAt)/
        );
      });
    cy.get('.list__item--active').should('have.length', 2);
    cy.get('.view-wrapper')
      .contains(channel.name)
      .should('be.visible');
    cy.get('.view-wrapper')
      .contains(channel.description)
      .should('be.visible');
    cy.get('.channel__members-count').should('have.text', 1);
    cy.contains('Add a topic').should('be.visible');
    cy.contains('Details').should('be.visible');
  });
});
