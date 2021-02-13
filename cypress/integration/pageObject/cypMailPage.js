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
    getIframeBody().find(".action").contains('Take me to my SOLE profile').click();
  }
}
export default new adminPage();
