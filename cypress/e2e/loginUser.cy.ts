describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
    cy.get('input#email').should('be.visible')
    cy.get('input#password').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should show error messages for empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.get('[data-sonner-toast]')
      .contains('La contraseña debe tener al menos 7 caracteres')
      .should('be.visible')
    cy.wait(500)
    cy.get('[data-sonner-toast]').contains(
      'El correo electrónico debe ser válido'
    )
  })

  it('should show error message for invalid email', () => {
    cy.get('input#email').type('invalid-email')
    cy.get('button[type="submit"]').click()
    cy.get('[data-sonner-toast]').contains(
      'El correo electrónico debe ser válido'
    )
  })

  it('should login successfully with valid credentials', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        message: 'Login successful',
        token: 'fake-jwt-token',
        data: {
          username: 'testuser',
          email: 'testuser@example.com',
          phoneNumber: '1234567890',
          userType: 'CUSTOMER',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    }).as('loginRequest')

    cy.get('input#email').type('testuser@example.com')
    cy.get('input#password').type('password123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)
    cy.get('[data-sonner-toast]')
      .contains('¡Bienvenido de vuelta')
      .should('be.visible')
  })

  it('should show error message for incorrect credentials', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        errors: [{ message: 'Incorrect password' }]
      }
    }).as('loginRequest')

    cy.get('input#email').type('testuser@example.com')
    cy.get('input#password').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)
    cy.contains('Error: Las credenciales ingresadas son incorrectas').should(
      'be.visible'
    )
  })
})
