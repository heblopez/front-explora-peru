describe('Agencies Landing Page', () => {
  beforeEach(() => {
    cy.visit('/agencies')
  })

  it('should display the main sections', () => {
    cy.get('main').should('be.visible')
    cy.contains('Únete a ExploraPerú y publica tus tours').should('be.visible')
  })

  it('should navigate to register agency page when clicking register now button', () => {
    cy.contains('Regístrate ahora').click()
    cy.url().should('include', '/register-agency')
  })

  it('should display testimonials', () => {
    cy.contains('Rutas del Perú').should('be.visible')
    cy.contains('Perú Destinos Travel').should('be.visible')
    cy.contains('Travel Perú').should('be.visible')
  })

  it('should display features in the improved panel section', () => {
    cy.contains('Eficiente').should('be.visible')
    cy.contains('Reservas instantáneas').should('be.visible')
    cy.contains('Interfaz amigable').should('be.visible')
    cy.contains('Soporte personalizado').should('be.visible')
  })
})
