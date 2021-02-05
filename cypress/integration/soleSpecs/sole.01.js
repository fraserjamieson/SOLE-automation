describe('Launch SOLE website', () => {
    it('Check title', () => {
      cy.visit('http://test.sole.scot/dunbar');
      cy.title().should('eq',`Local High Street - AND YOU'RE IN THERE`);
    });
  })

  