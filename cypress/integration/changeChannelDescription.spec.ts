describe('Change channel description', () => {
  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).login();
    (cy as any).addWorkspace({ name: 'CypressTest' });
  });

  it('should close the modal', () => {
    (cy as any).addChannel({
      name: 'channel 1',
      description: 'channel description',
      private: false,
    });
    cy.visit('/dashboard');
    cy.get('button.channel-view__edit-button').click();
    cy.contains('Edit channel description').should('be.visible');
    cy.get('.modal').should('exist');
    cy.get('.modal__button-close').click();
    cy.get('.modal').should('not.exist');
  });

  it('should change channel description', () => {
    (cy as any).addChannel({
      name: 'channel 1',
      description: 'old description',
      private: false,
    });
    cy.visit('/dashboard');

    const newDescription = 'new description';

    cy.get('button.channel-view__edit-button').click();
    cy.get('.form__textarea')
      .as('textarea')
      .should('have.text', 'old description');
    cy.get('.form__textarea')
      .clear()
      .type(newDescription);
    cy.get('@textarea').should('have.text', newDescription);
    cy.get('button[type="submit"]')
      .click()
      .should(() => {
        const currentChannel = JSON.parse(
          localStorage.getItem('currentChannel') as string
        );
        expect(currentChannel.description).to.eq(newDescription);
      });
    cy.get('.channel-view__description').should('have.text', newDescription);
  });

  it('should change channel description(via channel details)', () => {
    (cy as any).addChannel({
      name: 'channel 1',
      description: 'old description',
      private: false,
    });
    cy.visit('/dashboard');

    const newDescription = 'new description';

    cy.get('button.details-button').click();
    cy.get('button.channel-details__dropdown-button')
      .first()
      .click();
    cy.get('button.channel-details__edit-button')
      .eq(1)
      .click();
    cy.get('.form__textarea')
      .as('textarea')
      .should('have.text', 'old description');
    cy.get('.form__textarea')
      .clear()
      .type(newDescription);
    cy.get('@textarea').should('have.text', newDescription);
    cy.get('button[type="submit"]')
      .click()
      .should(() => {
        const currentChannel = JSON.parse(
          localStorage.getItem('currentChannel') as string
        );
        expect(currentChannel.description).to.eq(newDescription);
      });
    cy.get('.channel-view__description').should('have.text', newDescription);
  });
});
