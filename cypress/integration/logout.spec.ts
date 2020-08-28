describe('Logout', () => {
  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).login();
    localStorage.setItem(
      'user',
      JSON.stringify({ email: 'user1@email.com', id: 1, username: 'user1' })
    );
  });

  it('should successfully logout', () => {
    cy.visit('/');
    cy.url().should('include', '/dashboard');

    cy.get('button.workspace__inner').click();

    cy.contains('Logout')
      .click()
      .should(() => {
        expect(localStorage.getItem('user')).to.eq(null);
      });

    cy.url().should('eq', 'http://localhost:3000/');
  });
});
