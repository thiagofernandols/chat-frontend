context('Chat', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Logged like a observer', () => {
    cy.get('#modalNickName')
     .get('#name-input')
     .type('Observador Novo')
     .get('.btn-primary')
     .click()
    
     cy.get('#message', { timeout: 5000 })
     .should('have.attr', 'placeholder', 'Bem vindo, Observador Novo')
  })
})
