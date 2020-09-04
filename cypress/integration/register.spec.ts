describe('Register', () => {
  beforeEach(() => {
    cy.clearDB()
      .visit('/')
      .contains('Register')
      .click();
  });

  const user = {
    email: 'user1@email.com',
    password: 'user1user1',
    username: 'user1user1',
  };

  describe('error messages', () => {
    describe('email', () => {
      it('should show "required" message', () => {
        cy.get('input[name="email"]')
          .focus()
          .blur();

        cy.contains('this is a required field').should('be.visible');
      });

      it('should show "valid email" message', () => {
        cy.get('input[name="email"]').type('invalid');

        cy.contains('this must be a valid email').should('be.visible');
      });
    });

    describe('username', () => {
      it('should show "required" messages', () => {
        cy.get('input[name="username"]')
          .focus()
          .blur();

        cy.contains('this is a required field').should('be.visible');
        cy.contains('minumum length of 6').should('be.visible');
      });
    });

    describe('password', () => {
      it('should show "required" messages', () => {
        cy.get('input[name="password"]')
          .focus()
          .blur();

        cy.contains('this is a required field').should('be.visible');
        cy.contains('minumum length of 6').should('be.visible');
      });
    });
  });

  it('should open "LoginPage" modal', () => {
    cy.get('.register-modal').should('be.visible');
    cy.contains('Login using a test account!').click();
    cy.get('.register-modal').should('not.be.visible');
    cy.get('.login-modal').should('be.visible');
  });

  it('should close the "Register" modal', () => {
    cy.get('.register-modal').should('be.visible');
    cy.get('.modal__button-close').click();
    cy.get('.register-modal').should('not.be.visible');
  });

  it('should successfully register a user', () => {
    cy.get('.button').should('be.disabled');
    cy.get('input[name="email"]').type(user.email);
    cy.get('.button').should('be.disabled');

    cy.get('input[name="username"]').type(user.username);
    cy.get('.button').should('be.disabled');

    cy.get('input[name="password"]').type(user.password);
    cy.get('.button').should('be.enabled');

    cy.get('button[type="submit"]').click();

    cy.get('.icon--loading').should('be.visible');
  });

  describe('fails', () => {
    beforeEach(() => {
      (cy as any).registerUser(user);
    });

    it('should fail when user types in duplicate email', () => {
      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="username"]').type('user1234');
      cy.get('input[name="password"]').type('bestpassword');
      cy.get('button[type="submit"]').click();

      cy.contains('User with that email already exists').should('be.visible');
      cy.contains('User with that username already exists').should(
        'not.be.visible'
      );
    });

    it('should fail when user types in duplicate username', () => {
      cy.get('input[name="email"]').type('test@emai.com');
      cy.get('input[name="username"]').type(user.username);
      cy.get('input[name="password"]').type('bestpassword');
      cy.get('button[type="submit"]').click();

      cy.contains('User with that email already exists').should(
        'not.be.visible'
      );
      cy.contains('User with that username already exists').should(
        'be.visible'
      );
    });

    it('should fail when user types in duplicate email and username', () => {
      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="username"]').type(user.username);
      cy.get('input[name="password"]').type('bestpassword');
      cy.get('button[type="submit"]').click();

      cy.contains('User with that email already exists').should('be.visible');
      cy.contains('User with that username already exists').should(
        'be.visible'
      );
    });
  });
});
