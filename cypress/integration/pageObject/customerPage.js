class customer {
  email(email) {
    cy.get("[name='email']").type(email);
  }
  password(pwd) {
    cy.get("[name='password']").type(pwd);
  }
  logInBtn() {
    cy.get("button.btn").contains("Sign In").click();
  }
  selectMenu(menuName) {
    cy.get(".menu1>a").contains(menuName).click();
  }
  firstName(firstName) {
    cy.get('[name="firstname"]').type(firstName);
  }
  lastName(lastName) {
    cy.get('[name="lastname"]').type(lastName);
  }
  lastName(lastName) {
    cy.get('[name="lastname"]').type(lastName);
  }
  reTypePwd(pwd) {
    cy.get('[name="password_confirmation"]').type(pwd);
  }
  reCaptcha() {
    const getIframeDocument = () => {
        return cy
        .get('iframe[role="presentation"]')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('exist')
      }
      
      const getIframeBody = () => {
        // get the document
        return getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
      }
      getIframeBody().find('#recaptcha-anchor').click();
    //cy.iframe().find('#recaptcha-anchor > div.recaptcha-checkbox-border').should('be.visible').click()
    //cy.get('#recaptcha-anchor > div.recaptcha-checkbox-border').click();
  }
  tickConfirm() {
    cy.get('div:nth-child(8) > input[type=checkbox]').click();
  }
  tickIagree() {
    cy.get('div:nth-child(9) > input[type=checkbox]').click();
  }
  register() {
    cy.get("button.btn").contains("Register").click();
  }
}
export default new customer();
