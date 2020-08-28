describe('Login', () => {
  const user = {
    email: 'user1@email.com',
    password: 'user1user1',
    username: 'user1',
  };

  beforeEach(() => {
    (cy as any).clearDB();
    (cy as any).registerUser(user);
    cy.visit('/');
    cy.contains('Log In').click();
  });

  it('should open modal with "try it now" button', () => {
    cy.visit('/');
    cy.get('.login-modal').should('not.be.visible');
    cy.contains('Try it out').click();
    cy.get('.login-modal').should('be.visible');
  });

  it('should contain test account information', () => {
    cy.contains('Test Account 1').should('be.visible');
    cy.contains('email: stackguest@stack.com').should('be.visible');
    cy.contains('password: stackguest').should('be.visible');

    cy.contains('Test Account 2').should('be.visible');
    cy.contains('email: stacktestuser@stack.com').should('be.visible');
    cy.contains('password: stacktestuser').should('be.visible');
  });

  it('should open "Register" modal', () => {
    cy.get('.login-modal').should('be.visible');
    cy.contains('Dont have an account yet?').click();
    cy.get('.login-modal').should('not.be.visible');
    cy.get('.register-modal').should('be.visible');
  });

  it('should close the "Login" modal', () => {
    cy.get('.login-modal').should('be.visible');
    cy.get('.modal__button-close').click();
    cy.get('.login-modal').should('not.be.visible');
  });

  it('should successfully login a user', () => {
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);

    cy.get('button[type="submit"]')
      .click()
      .as('submit');

    cy.get('.icon--loading').should('be.visible');

    cy.get('@submit').should(() => {
      expect(localStorage.getItem('user')).to.matches(
        /(?=.*id)(?=.*createdAt)(?=.*email)(?=.*updatedAt)(?=.*username)/
      );
    });

    cy.url().should('include', '/dashboard');
    cy.getCookie('stackSessionId').should('exist');

    cy.contains('No workspace yet').should('exist');
    cy.contains(user.username).should('exist');

    cy.get('.workspace__add-button').should('exist');
    cy.get('.channel-list').should('not.exist');
    cy.get('.teammates-list').should('not.exist');
  });

  it('should fail when user types in wrong email', () => {
    cy.get('input[name="email"]').type(`${user.email}123`);
    cy.get('input[name="password"]').type(user.password);

    cy.get('button[type="submit"]').click();

    cy.contains('There is no user with that email/password combination').should(
      'be.visible'
    );
  });

  it('should fail when user types in wrong password', () => {
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type('invalid');

    cy.get('button[type="submit"]').click();

    cy.contains('There is no user with that email/password combination').should(
      'be.visible'
    );
  });

  it('should display input error messages', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Email must be at least 6 characters long').should(
      'be.visible'
    );
    cy.contains('Password must be at least 6 characters long').should(
      'be.visible'
    );
  });
});
