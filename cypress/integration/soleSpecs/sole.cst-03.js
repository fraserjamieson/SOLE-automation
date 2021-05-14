
describe("The social media links section at the bottom of the customer page", () => {
  const customerURL = Cypress.env("cstUrl");

  it("has facebook as the first item", () => {

    cy.visit(customerURL);
    const firstIcon = cy.get('.footer-icons > a').first();
    
    firstIcon.should('have.attr', 'onclick')
    .and('contain', 'window.open(')
    .and('contain', 'facebook')
    .and('contain', '/SOLEScot');

    firstIcon.get('i')
    .should('have.class', 'fa-facebook');
  })

  it("has twitter as the second item", () => {

    cy.visit(customerURL);
    const secondIcon = cy.get('.footer-icons > a').eq(1);
    
    secondIcon.should('have.attr', 'onclick')
    .and('contain', 'window.open(')
    .and('contain', 'twitter')
    .and('contain', '/SOLEScotland');

    secondIcon.get('i')
    .should('have.class', 'fa-twitter');

  })

  it("has instagram as the third item", () => {

    cy.visit(customerURL);
    const thirdIcon = cy.get('.footer-icons > a').eq(2);
    
    thirdIcon.should('have.attr', 'onclick')
    .and('contain', 'window.open(')
    .and('contain', 'instagram')
    .and('contain', '/solescotland');

    thirdIcon.get('i')
    .should('have.class', 'fa-instagram');

  })

  it("can open a new window by clicking on facebook icon", () => {
    cy.visit(customerURL);

    cy.window().then((window) => {
      cy.stub(window, 'open').as('windowOpen');
    });

    cy.get('.fa-facebook')
    .click();

    cy.get('@windowOpen').should('have.been.calledOnce');

});

it("can open a new window by clicking on twitter icon", () => {
  cy.visit(customerURL);

  cy.window().then((window) => {
    cy.stub(window, 'open').as('windowOpen');
  });

  cy.get('.fa-twitter')
  .click();

  cy.get('@windowOpen').should('have.been.calledOnce');

});

it("can open a new window by clicking on instagram icon", () => {
  cy.visit(customerURL);

  cy.window().then((window) => {
    cy.stub(window, 'open').as('windowOpen');
  });

  cy.get('.fa-instagram')
  .click();

  cy.get('@windowOpen').should('have.been.calledOnce')

});

});

