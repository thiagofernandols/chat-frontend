import chatByNameMock from '../support/chatByNameMock'
import historicMock from '../support/historicMock'

const apiChatByName = 'http://localhost:3000/chats?name=chat-principal'
const ApihistoricsByChat = `http://localhost:3000/historics/chat/5e7103eb575be54a7030f10e`

context('Chat', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Logged like a observer', () => {
    cy.server()
    cy.route(apiChatByName, [{artifactName: 'fizzbuzz', artifactType: "GCAR"}])
    cy.route(ApihistoricsByChat, historicMock)

    cy.get('#modalNickName')
     .get('#name-input')
     .type('Observador Novo')
     .get('.btn-primary')
     .click()
    
     cy.get('#message', { timeout: 5000 })
     .should('have.attr', 'placeholder', 'Bem vindo, Observador Novo')
  })
})
