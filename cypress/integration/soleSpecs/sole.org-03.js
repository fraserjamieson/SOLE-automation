import basefunction from '../reusable/orgBaseFunctions';
// import orgPg from "../pageObject/solePage";
import cstBaseFunctions02 from '../reusable/cstBaseFunctions02';
import customerBaseFunction from '../reusable/cstBaseFunctions01';

describe('Customer user operations ', () => {
  const email = Cypress.env('existingEmail');
  const password = Cypress.env('existingEmailPwd');
  const custEmail = Cypress.env('customerMail');
  const custPW = Cypress.env('mailpwd');

  beforeEach(function () {
    // basefunction.login(email, password);
    cstBaseFunctions02.logInAsCustomer(custEmail);

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
  xit("Org Admin can hide address", function () {
    cy.contains('Edit Details').click();
    // Query for an element.
    // Interact with that element.
     cy.get('.v-input--selection-controls__input > input').last().click({force: true});
    // Assert about the content on the page.
    cy.get('.v-input--selection-controls__input > input').last().should('not.be.checked');
  });

  it("Org address not showing on org page", function () {
  // assert first li CHILDREN ELEMENT SHOULD BE VISIBLE AT FIRST

    cy.visit('https://test.sole.scot/dunbar');
    cy.get('.overlay-link .supplier-link').first().click();
    cy.contains('Info').click();
    // finding right-sidebar first post
    // and the first descendant DOM li element
    cy.get('.right-sidebar > .related-post > ul').find('li').first()
    .should('be.visible');

  })

  xit('can show/hide address', () => {
      // This assumes the address is shown by default
  
      cy.visit("/");
      cy.adminLogin(existingEmail, existingEmailPwd);
  
      // Disables the address in the admin
      cy.clickAddressCheckboxInAdmin();
  
      // Waits 5 seconds because of the iframe loading
      cy.wait(5000);
      // Checks the address doesn't show in the preview
      // This will fail if the address doesn't contain Riverside
      getIframeBody().find(".right-sidebar").should("not.contain", "Riverside");
  
      cy.visit(orgAddressURL);
      cy.get(".right-sidebar").should("not.contain", "Riverside");
  
      cy.visit("/");
      cy.adminLogin(existingEmail, existingEmailPwd);
  
      // Disables the address in the admin
      cy.clickAddressCheckboxInAdmin();
  
      // Waits 5 seconds because of the iframe loading
      cy.wait(5000);
      // Checks the address doesn't show in the preview
      // This will fail if the address doesn't contain Riverside
      getIframeBody().find(".right-sidebar").should("contain", "Riverside");
  
      cy.visit(orgAddressURL);
      cy.get(".right-sidebar").should("contain", "Riverside");
  });
  
});
