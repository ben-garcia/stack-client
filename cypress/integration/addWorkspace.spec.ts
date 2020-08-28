describe('Add workspace', () => {
  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).login();
    cy.visit('/dashboard');
  });
  const workspaceName = 'new workspace';

  it('should close the modal', () => {
    cy.get('.workspace__add-button').click();
    cy.get('.modal').should('be.visible');
    cy.contains('Create a Workspace').should('be.visible');
    cy.get('.modal__button-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('should successfully add workspace without opening it', () => {
    cy.get('.workspace__add-button').click();
    cy.get('workspace-list').should('not.exist');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[type="text"]').type(workspaceName);
    cy.get('button[type="submit"]')
      .should('be.enabled')
      .click()
      .as('submit');

    cy.get('.icon--loading').should('be.visible');

    cy.get('@submit').should(() => {
      expect(localStorage.getItem('currentChannel')).to.eq(null);
    });
    cy.get('.workspace-list').should('exist');
    cy.contains('No workspace yet').should('be.visible');
    cy.contains(workspaceName).should('not.exist');
    cy.contains('Channels').should('not.exist');
    cy.get('.channel-list__add-button').should('not.exist');
    cy.contains('Teammates').should('not.exist');
    cy.get('.teammates-list__add-button').should('not.exist');
    cy.get('.list__item--active').should('not.exist');
  });

  it('should successfully add workspace and open it', () => {
    cy.get('.workspace__add-button').click();
    cy.get('workspace-list').should('not.exist');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input[type="text"]').type(workspaceName);
    cy.get('input[type="checkbox"]').click();
    cy.get('button[type="submit"]')
      .click()
      .as('submit');
    cy.get('.icon--loading').should('be.visible');
    cy.get('@submit').should(() => {
      expect(localStorage.getItem('currentChannel')).to.matches(
        /(?=.*id)(?=.*createdAt)(?=.*name)(?=.*updatedAt)/
      );
    });
    cy.get('.workspace-list').should('exist');

    cy.contains('No workspace yet').should('not.be.visible');
    cy.contains(workspaceName).should('be.visible');
    cy.contains('Channels').should('be.visible');

    cy.get('.channel-list__add-button').should('be.visible');

    cy.contains('Teammates').should('be.visible');

    cy.get('.teammates-list__add-button').should('be.visible');
    cy.get('.list__item--active')
      .should('be.visible')
      .and('contain.text', workspaceName[0].toUpperCase());
  });
});
