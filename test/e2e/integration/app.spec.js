context('App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Created app', () => {
    cy.get('#modalNickName')
      .should('not.be.empty')
  })
})
