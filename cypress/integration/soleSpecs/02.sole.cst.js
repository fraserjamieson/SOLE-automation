import cstBasefunction from "../reusable/cstBaseFunctions";
import cst from "../pageObject/customerPage";

describe("Organisation Admin user operations ", () => {
  var  admnMail = Cypress.env("mail"),
    cstUrl = Cypress.env('cstUrl'),
    email = Cypress.env("email"),
    firstName = 'ABC',
    lastName = 'XYZ';

  it("TC_01_Local Admin can create and save a new Org", () => {
    cy.visit(cstUrl);
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.wait(3000);
   cst.selectMenu('Register');
   cy.wait(500);
    cstBasefunction.register(firstName,lastName,admnMail);
    
  });
  
});
