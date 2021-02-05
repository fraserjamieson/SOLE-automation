class adminPage {
  email() {
    return cy.get("[name='email']");
  }
  
}
export default new adminPage();
