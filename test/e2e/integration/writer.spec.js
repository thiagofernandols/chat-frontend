import historicMock from '../support/historicMock'

const ApiUri = `/historics/chat/5e7103eb575be54a7030f10e`

context('Writer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Registered as an observer and then register', () => {
    cy.get('#modalNickName')
     .get('#name-input')
     .type('Observador')
     .get('.btn-primary')
     .click()
    
     cy.get('#message', { timeout: 5000 })
      .should('have.attr', 'placeholder', 'Bem vindo, Observador')

     cy.get('.col-sm-2 > div > :nth-child(1)')
      .click()

      cy.get('#name-input')
        .clear()
        .type('Thiago Lôbo')

      cy.get('#email-input')
        .type('thiagofernandols@gmail.com')
      
      cy.get('#birthday-input')
        .type('1987-10-30')
      
      cy.get('.btn-primary')
        .click()
      
      cy.get('.home > :nth-child(4)')
        .contains('Usuário logado:')
        .contains('Thiago Lôbo')
  })
})
