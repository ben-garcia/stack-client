describe('Logout', () => {
  beforeEach(() => {
    cy.clearDB()
      .login()
      .visit('/');
  });

  it('should successfully logout', () => {
    cy.url().should('include', '/dashboard');

    cy.get('button.workspace__inner').click();

    cy.contains('Logout')
      .click()
      .should(() => {
        expect(localStorage.getItem('currentChannel')).to.eq(null);
        expect(localStorage.getItem('currentTeammate')).to.eq(null);
        expect(localStorage.getItem('currentWorkspace')).to.eq(null);
        expect(localStorage.getItem('user')).to.eq(null);
      });

    cy.url().should('eq', 'http://localhost:3000/');
  });
});
