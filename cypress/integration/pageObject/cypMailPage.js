class adminPage {
  loginBtn() {
    cy.get(".buttons > .button").contains('Login').click();
  }

  enterMailId(mailId) {
    cy.get("[name='email']").clear().type(mailId);
  }

  enterMailPwd(pwd) {
    cy.get("div.auth0-lock-input-block.auth0-lock-input-show-password > div > div > input").clear().type(pwd);
  }

  submit() {
    cy.get("#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > div > button").click();
  }

  popUpHandle(mailId) {
    cy.get("#popupusername").clear().type(mailId);
    cy.get("button.swal2-confirm.swal2-styled").click();
  }

  selectSOLEmail(){
    cy.get("#depublicemailinbox").contains('SOLE').first().click();
  }

  takeMeToSolePage(){
    const getIframeDocument = () => {
      return cy
      .get('iframe')
      .its('0.contentDocument').should('exist')
    }
    const getIframeBody = () => {
      return getIframeDocument()
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
    }
   getIframeBody().find(".action").contains('Take me to my SOLE profile')
   .invoke("removeAttr", "target")
    .invoke("attr", "href")
      .then(href => {
        cy.writeFile('cypress/fixtures/link.json', { link: href })
       });
  }
  setPwd(){
    var newPwd = Cypress.env('password');
   var pwd = cy.get("div.container").contains('New Password')
    .within(() => {
      pwd.siblings("input").clear().type(newPwd); 
    });
    var pwd2 = cy.get("div.container").contains('Confirm Password')
    .within(() => {
      pwd2.siblings("input").clear().type(newPwd); 
    });
    //.type(newPwd);
    cy.get("button.btn-shadow-primary").click();
  }
}
export default new adminPage();
