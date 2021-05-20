import basefunction from '../reusable/orgBaseFunctions';

describe('Customer user operations ', () => {
  const email = Cypress.env('existingEmail');
  const password = Cypress.env('existingEmailPwd');

  beforeEach(function () {
    basefunction.login(email, password);
  });
  it('Org Admin can create a service', () => {
    // Visit services page
    cy.visit('/admin/servicetype');

    // Add new service
    // Click add button
    cy.get('.v-btn__content > .router-link-exact-active').click();
    // Enter name
    cy.get('#input-92').clear().type('Automated Test Service');
    // Enter price
    cy.get('#input-96').clear().type('100');
    // Enter time
    cy.get('#input-100').clear().type('60');
    // Enter description
    cy.get('#input-108')
      .clear()
      .type('This is a service added automatically by a test');
    // Check bookable checkbox
    cy.get('.v-input--selection-controls__ripple').click();
    // Click submit button
    cy.get('.btn-shadow-primary > .v-btn__content').click();

    // Search for new service
    cy.get('#input-128').clear().type('Automated Test Service');

    // Check text shows in service table
    cy.get('tbody > tr').should('contain', 'Automated Test Service');

    // Delete newly added service
    cy.get(':nth-child(1) > .justify-center > .v-icon--link').click();
  });
});
