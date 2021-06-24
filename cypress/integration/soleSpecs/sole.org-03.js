import basefunction from '../reusable/orgBaseFunctions';
// import orgPg from "../pageObject/solePage";

describe('Customer user operations ', () => {
  const email = Cypress.env('existingEmail');
  const password = Cypress.env('existingEmailPwd');

  beforeEach(function () {
    basefunction.login(email, password);
  });
  xit('Org Admin can create a service', () => {
    // Visit services page
    cy.visit('/admin/servicetype');

    // Add new service
    // Click add button
    cy.get('.v-btn__content > .router-link-exact-active').click();
    // Enter name
    cy.get('#input-97').clear().type('Automated Test Service');
    // Enter price
    cy.get('#input-101').clear().type('100');
    // Enter time
    cy.get('#input-105').clear().type('60');
    // Enter description
    cy.get('#input-113')
      .clear()
      .type('This is a service added automatically by a test');
    // Check bookable checkbox
    cy.get('.v-input--selection-controls__ripple').click();
    // Click submit button
    cy.get('.btn-shadow-primary > .v-btn__content').click();

    // Search for new service
    cy.get('#input-133').clear().type('Automated Test Service');

    // Check text shows in service table
    cy.get('table > tbody > tr').should('contain', 'Automated Test Service');

    // Delete newly added service
    cy.get(':nth-child(1) > .justify-center > .v-icon').click();
  });
  it("Org Admin can hide address", function () {
    cy.contains('Edit Details').click();
    // Query for an element.
    // Interact with that element.
     cy.get('.v-input--selection-controls__input').last().click();
    // Assert about the content on the page.
    cy.get('.v-input--selection-controls__input > input').last().should('not.be.checked');
  });
});
