describe('Add channel message', () => {
  const channel = {
    name: 'channel name',
    description: 'channel description',
    private: false,
  };
  beforeEach(() => {
    cy.clearDB()
      .login()
      .addWorkspace({ name: 'CypressTest' })
      .addChannel(channel)
      .visit('/dashboard');
  });

  it('should successfully add a channel message', () => {
    cy.get('.message__wrapper').should('not.exist');
    cy.get('textarea').type('channel message{enter}');
    cy.get('.message__wrapper').should('have.lengthOf', 1);
  });
});
