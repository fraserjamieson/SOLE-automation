import cstBasefunction from "../reusable/cstBaseFunctions";
import cst from "../pageObject/customerPage";

describe("Organisation Admin user operations ", () => {
  var admnMail = Cypress.env("mail"),
    cstUrl = Cypress.env("cstUrl"),
    email = Cypress.env("customerMail"),
    firstName = "ABC",
    lastName = "XYZ",
    vatId = 'INV01234567891',
    editedVatId = 'INV09876543219',
    companyName = `ABC's`,
    editedCompanyName = `XYZ's`,
    streetAddress = '24 test street',
    city = 'Dunbar',
    county = 'Glasgow',
    postalCode = 'A1 8AA',
    phone = '23456789',
    editedPhone = '987654321';

  beforeEach(function () {
    cy.visit(cstUrl);
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.wait(1000);
  });
  xit("TC_01_Local Admin can create and save a new Org", () => {
    cst.selectMenu("Register");
    cy.wait(500);
    cstBasefunction.register(firstName, lastName, admnMail);
  });
  xit("TC_07_A customer can log in via the Login link in the header", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
  });
  xit("TC_08_A customer can log in via the link on the registration page", () => {
    cst.selectMenu("Register");
    cst.signInOnRegister();
    cstBasefunction.logIn(email);
  });
  xit("TC_08_A customer can add a new address (Company & VAT fields not populated)", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction('Profile');
    cst.goToProfileOpt('Address');
    cst.addAddressBtn();
    cst.addAddressDetail('First name',firstName);
    cst.addAddressDetail('Last name',lastName);
    cst.addAddressDetail('Street Address',streetAddress);
    cst.addAddressDetail('City',city);
    cst.addAddressDetail('County',county);
    cst.addAddressDetail('Postal Code',postalCode);
    cst.addAddressDetail('Phone',phone);
    cst.saveAddressBtn();
    cy.get('div.alert').should('contain.text','Success!');
    cy.get('div.card').should('contain.text', firstName);
    cy.get('div.card').should('contain.text', lastName);
    cy.get('div.card').should('contain.text', companyName);
    cy.get('div.card').should('contain.text', streetAddress);
    cy.get('div.card').should('contain.text', city);
    cy.get('div.card').should('contain.text', county);
    cy.get('div.card').should('contain.text', postalCode);
    cy.get('div.card').should('contain.text', phone);
  });
  xit("TC_10_A customer can edit an address (Company & VAT fields not populated)", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction('Profile');
    cst.goToProfileOpt('Address');
    cst.editAddressBtn();
    cst.addAddressDetail('Phone',editedPhone);
    cst.saveAddressBtn();
    cy.get('div.alert').should('contain.text','Success!');
    cy.get('div.card').should('contain.text', editedPhone);
    cy.get('div.card').should('not.contain.text', phone);
  });
  xit("TC_12_A customer can delete an address", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction('Profile');
    cst.goToProfileOpt('Address');
    cst.deletAddressBtn();
    cy.get('.account-table-content > div').should('contain.text', 'You do not have any saved addresses here, please try to create it by clicking the add button.');
  });
  xit("TC_09_A customer can add a news address with the company and VAT fields populated.", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction('Profile');
    cst.goToProfileOpt('Address');
    cst.addAddressBtn();
    cst.addAddressDetail('Company name',companyName);
    cst.addAddressDetail('First name',firstName);
    cst.addAddressDetail('Last name',lastName);
    cst.addAddressDetail('Vat id',vatId);
    cst.addAddressDetail('Street Address',streetAddress);
    cst.addAddressDetail('City',city);
    cst.addAddressDetail('County',county);
    cst.addAddressDetail('Postal Code',postalCode);
    cst.addAddressDetail('Phone',phone);
    cst.saveAddressBtn();
    cy.get('div.alert').should('contain.text','Success!');
    cy.get('div.card').should('contain.text', firstName);
    cy.get('div.card').should('contain.text', lastName);
    cy.get('div.card').should('contain.text', companyName);
    cy.get('div.card').should('contain.text', streetAddress);
    cy.get('div.card').should('contain.text', city);
    cy.get('div.card').should('contain.text', county);
    cy.get('div.card').should('contain.text', postalCode);
    cy.get('div.card').should('contain.text', phone);
 
  });
  xit("TC_11_A customer can edit an address and add a company and VAT fields", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction('Profile');
    cst.goToProfileOpt('Address');
    cst.editAddressBtn();
    cst.addAddressDetail('Company name',editedCompanyName);
    cst.addAddressDetail('Vat id',editedVatId);
    cst.addAddressDetail('Phone',editedPhone);
    cst.saveAddressBtn();
    cy.get('div.alert').should('contain.text','Success!');
    cy.get('div.card').should('contain.text', editedCompanyName);
    cy.get('div.card').should('contain.text', editedPhone);
    cy.get('div.card').should('not.contain.text', phone);
  });
});
