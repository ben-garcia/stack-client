describe('Add channel message', () => {
  const channel = {
    name: 'channel name',
    description: 'channel description',
    private: false,
  };
  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).login();
    (cy as any).addWorkspace({ name: 'CypressTest' });
    (cy as any).addChannel(channel);
    cy.visit('/dashboard');
  });

  it('should successfully add a channel message', () => {
    cy.get('.message__wrapper').should('not.exist');
    cy.get('textarea').type('channel message{enter}');
    cy.get('.message__wrapper').should('have.lengthOf', 1);
  });
});
