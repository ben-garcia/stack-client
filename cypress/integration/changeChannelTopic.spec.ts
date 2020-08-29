describe('Change channel topic', () => {
  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).login();
    (cy as any).addWorkspace({ name: 'CypressTest' });
  });

  it('should close the modal', () => {
    (cy as any).addChannel({
      name: 'channel 1',
      description: 'testing test',
      private: false,
    });
    cy.visit('/dashboard');
    cy.get('button.channel__edit-topic').click();
    cy.contains('Edit channel topic').should('be.visible');
    cy.get('.modal').should('exist');
    cy.get('.modal__button-close').click();
    cy.get('.modal').should('not.exist');
  });

  it('should change channel topic when topic start is emtpy', () => {
    (cy as any).addChannel({
      name: 'channel 1',
      description: 'testing test',
      private: false,
    });
    cy.visit('/dashboard');

    const newTopic = 'new topic';

    cy.get('button.channel__edit-topic').click();
    cy.get('.form__textarea')
      .as('textarea')
      .should('have.text', '');
    cy.get('.form__textarea').type(newTopic);
    cy.get('@textarea').should('have.text', newTopic);
    cy.get('button[type="submit"]')
      .click()
      .should(() => {
        const currentChannel = JSON.parse(
          localStorage.getItem('currentChannel') as string
        );
        expect(currentChannel.topic).to.eq(newTopic);
      });
    cy.get('.channel__topic').should('have.text', newTopic);
  });

  it('should change channel topic when topic start is not emtpy', () => {
    (cy as any).addChannel({
      name: 'channel 1',
      description: 'testing test',
      topic: 'old topic',
      private: false,
    });
    cy.visit('/dashboard');

    const newTopic = 'new topic';

    cy.get('button.channel__edit-topic').click();
    cy.get('.form__textarea')
      .as('textarea')
      .should('have.text', 'old topic');
    cy.get('.form__textarea')
      .clear()
      .type(newTopic);
    cy.get('@textarea').should('have.text', newTopic);
    cy.get('button[type="submit"]')
      .click()
      .should(() => {
        const currentChannel = JSON.parse(
          localStorage.getItem('currentChannel') as string
        );
        expect(currentChannel.topic).to.eq(newTopic);
      });
    cy.get('.channel__topic').should('have.text', newTopic);
  });
});
