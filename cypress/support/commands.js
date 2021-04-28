// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-iframe';

Cypress.Commands.add('adminLogin', (email, password) => {
  cy.get(':nth-child(1) > .input-group > .form-control').type(email);
  cy.get(':nth-child(2) > .input-group > .form-control').type(password);
  cy.get('button.btn').click();
});

Cypress.Commands.add('clickAddressCheckboxInAdmin', () => {
  cy.get('.page-title-actions').find('button').click();
  cy.get('.layout').find('label').filter(':contains("Show Address")').click();
  cy.get('.card-footer').find('button').click();
});
