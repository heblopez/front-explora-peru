describe('Agency Registration', () => {
  beforeEach(() => {
    cy.visit('/register-agency')
  })

  it('should display registration form', () => {
    cy.get('form').should('be.visible')
  })

  it('should register a new agency successfully with unique data', () => {
    const uniqueId = Date.now()
    const randomPhoneNumber = `+519${Math.floor(10000000 + Math.random() * 90000000)}`
    const randomRuc = `20${Math.floor(100000000 + Math.random() * 900000000)}`
    const randomEmail = `testagency${uniqueId}@example.com`

    cy.get('#agency-name').type(`Test Agency ${uniqueId}`)
    cy.get('#agency-description').type('This is a test agency description.')
    cy.get('#ruc').type(randomRuc)
    cy.get('#address').type('123 Test Street')
    cy.get('#website').type('https://testagency.com')
    cy.get('#phone-number').type(randomPhoneNumber)
    cy.get('#email').type(randomEmail)
    cy.get('#password').type('password123')
    cy.get('#confirm-password').type('password123')

    cy.intercept('POST', '**/register-agency').as('registerAgency')

    cy.get('form').submit()

    cy.get('[data-type="success"]')
      .should('be.visible')
      .contains('¡Registro exitoso! 🎉 Por favor, inicia sesión')

    cy.url().should('include', '/login')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('form').submit()

    cy.get('[data-sonner-toast]')
      .contains('La confirmación de la contraseña es obligatoria')
      .should('be.visible')
    cy.contains('El número de celular es obligatorio')
    cy.contains('El correo electrónico es obligatorio')
    cy.contains('La contraseña es obligatoria')
  })

  it('should show error for mismatched passwords', () => {
    cy.get('#agency-name').type('Test Agency')
    cy.get('#agency-description').type('This is a test agency description.')
    cy.get('#ruc').type('20729784124')
    cy.get('#address').type('123 Test Street')
    cy.get('#website').type('https://testagency.com')
    cy.get('#phone-number').type('99919938993')
    cy.get('#email').type('testagency31122@example.com')

    cy.get('#password').type('password123')
    cy.get('#confirm-password').type('differentpassword')

    cy.get('form').submit()

    cy.get('[data-type="error"]')
      .should('be.visible')
      .and(
        'contain',
        'Error al registrar agencia 😢 Por favor, inténtalo de nuevo'
      )
  })
})
