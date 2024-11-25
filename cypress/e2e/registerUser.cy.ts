function generateRandomData() {
  const randomNum = Math.floor(Math.random() * 90000000) + 10000000

  const randomEmail = `user${randomNum}@test.com`
  const randomDNI = `${randomNum}`
  const randomPhone = `+519${randomNum}`

  return { randomEmail, randomDNI, randomPhone }
}

describe('Registration Tests', () => {
  beforeEach(() => {
    cy.visit('/register')
  })
  it('should display Register form', () => {
    cy.get('form').should('be.visible')
    cy.get('input#name').should('be.visible')
    cy.get('input#lastname').should('be.visible')
    cy.get('select[name="document-type"]').should('be.visible')
    cy.get('input#document-number').should('be.visible')
    cy.get('button#birthdate').should('be.visible')
    cy.get('button[role="combobox"]').should('be.visible')
    cy.get('select[name="gender"]').should('be.visible')
    cy.get('input#phone-number').should('be.visible')
    cy.get('input#email').should('be.visible')
    cy.get('input#password').should('be.visible')
    cy.get('input#confirm-password').should('be.visible')
  })

  it('should successfully register a new user', () => {
    const { randomEmail, randomDNI, randomPhone } = generateRandomData()

    cy.intercept('GET', '/list/countries*').as('getCountries')
    cy.wait('@getCountries')

    cy.get('input#name').should('be.visible').type('Jose')
    cy.get('input#lastname').should('be.visible').type('Flores')

    cy.get('button[role="combobox"]').first().click()
    cy.get('button[role="combobox"]')
      .first()
      .should('have.attr', 'aria-expanded', 'true')
    cy.get('select[name="document-type"]').select('DNI', { force: true })
    cy.get('input#document-number').should('be.visible').type(randomDNI)
    cy.get('button#birthdate').click()
    cy.get('.rdp-button').contains('10').click()
    cy.get('button[role="combobox"]').contains('Peru').click({ force: true })
    cy.get('select[name="gender"]').select('♂ Masculino', { force: true })
    cy.get('input#phone-number').should('be.visible').type(randomPhone)
    cy.get('input#email').should('be.visible').type(randomEmail)
    cy.get('input#password').should('be.visible').type('Password123')
    cy.get('input#confirm-password').should('be.visible').type('Password123')
    cy.get('form').submit()
    cy.url().should('include', '/login')
    cy.contains('Iniciar Sesión').should('be.visible')
  })

  it('should display validation errors for invalid inputs', () => {
    cy.get('input#name').should('be.visible').type('74')
    cy.get('input#lastname').should('be.visible').type(' ')
    cy.get('input#email').should('be.visible').type('invalid-email')
    cy.get('input#password').should('be.visible').type('123')
    cy.get('input#confirm-password')
      .should('be.visible')
      .type('differentpassword')
    cy.get('form').submit()
    cy.contains('Registrarse').should('be.visible')
  })
})
