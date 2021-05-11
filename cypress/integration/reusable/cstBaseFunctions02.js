import customer from "../pageObject/customerPage";
import customerBaseFunction from './cstBaseFunctions01';

class cstBaseFunctions02 {
  // Login as a customer
  logInAsCustomer(customerEmail) {
    cy.visit(Cypress.env("cstUrl"));
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    customer.selectMenu('Login');
    customerBaseFunction.logIn(customerEmail);
  }

  // Click on a specific element containing specific text
  clickOnElementWithText(element, text) {
    cy.get(element).contains(text).click({ force: true }).wait(3000)
  }

  // Click on specific text
  clickOnText(text) {
    cy.contains(text).click();
  }

  // Click on an element inside a parent element that contains specific text
  clickOnChildWithParentWithText(parent, text, child) {
    cy.get(parent).contains(text).find(child).click();
  }

  // Click on a multiple child element at a specific position in the multiple-child-element array
  clickOnMultipleChildAtIndex(parentRightAngleBracketChild, index) {
    cy.get(parentRightAngleBracketChild).eq(index).click();
  }

  // Find text inside a multiple child element at a specific postition in the multiple-child-element array
  findTextInMultipleChildAtIndex(parentRightAngleBracketChild, index, text) {
    cy.get(parentRightAngleBracketChild).eq(index).contains(text);
  }

  // Find text inside a multiple child element at a specific postition in the multiple-child-element array matching an alias
  findAliasInMultipleChildAtIndex(alias) {
    cy.get(`@${alias}`).then(yielded => {
      this.findTextInMultipleChildAtIndex('tbody>tr', 0, yielded)
    })
  }

  // Change the date in a calendar datepicker
  changeCalendarDate(yyyyMmDd) {
    cy.get('input[type="date"]').invoke('removeAttr', 'onkeydown').clear({ force: true }).type(yyyyMmDd).trigger('change')
  }

  // Save part of a text in an element as a variable alias
  sliceTextAsVariable(textSearchString, sliceStartIndex, sliceEndIndex, aliasNameString) {
    cy.contains(textSearchString).then($element => {
      const sliced = $element.text().slice(sliceStartIndex, sliceEndIndex);
      cy.wrap(sliced).as(aliasNameString);
    })
  }
}

export default new cstBaseFunctions02();
