let number = Number(new Date())

context('Writer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Registered as an observer and then register and send message', () => {
    cy.get('#name-input')
     .type('Observador')
     .get('.btn-primary')
     .click()
    
     cy.get('#message', { timeout: 5000 })
      .should('have.attr', 'placeholder', 'Bem vindo, Observador')

     cy.get('.col-sm-2 > div > :nth-child(1)')
      .click()

      cy.get('#name-input')
        .clear()
        .type(`Thiago Lôbo${number}`)

      cy.get('#email-input')
        .type(`thiagofernandols${number}@gmail.com`)
      
      cy.get('#birthday-input')
        .type('1987-10-30')
      
      cy.get('.btn-primary')
        .click()
      
      cy.get('.home > :nth-child(4)')
        .contains(`Thiago Lôbo${number}`)
      
      cy.get('#message')
        .type(`Olá, eu sou Thiago Lôbo${number}`)
        .get('.col-sm-2 > div > :nth-child(1)')
        .click()

      cy.get('.card-body')
        .contains(`Olá, eu sou Thiago Lôbo${number}`)
  })

  it('New chat', () => {
    number = Number(new Date())

    cy.visit(`/chat${number}`)

    cy.get('#name-input')
     .type('Observador')
     .get('.btn-primary')
     .click()
    
     cy.get('#message', { timeout: 5000 })
      .should('have.attr', 'placeholder', 'Bem vindo, Observador')

     cy.get('.col-sm-2 > div > :nth-child(1)')
      .click()

      cy.get('#name-input')
        .clear()
        .type(`Thiago Lôbo${number}`)

      cy.get('#email-input')
        .type(`thiagofernandols${number}@gmail.com`)
      
      cy.get('#birthday-input')
        .type('1987-10-30')
      
      cy.get('.btn-primary')
        .click()
      
      cy.get('.home > :nth-child(4)')
        .contains(`Thiago Lôbo${number}`)
      
      cy.get('#message')
        .type(`Olá, eu sou Thiago Lôbo${number}`)
        .get('.col-sm-2 > div > :nth-child(1)')
        .click()

      cy.get('.card-body')
        .contains(`Olá, eu sou Thiago Lôbo${number}`)
  })
})
