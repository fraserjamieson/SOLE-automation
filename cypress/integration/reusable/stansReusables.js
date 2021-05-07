import customer from "../pageObject/customerPage";

class stansReusable {
  logInAsCustomer(customerEmail) {
    cy.visit(Cypress.env("cstUrl"));
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    customer.selectMenu('Login');
    customerBaseFunction.logIn(customerEmail);
  }
}

export default new stansReusable();
