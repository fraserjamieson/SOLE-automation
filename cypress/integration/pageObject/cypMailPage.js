class adminPage {
  loginBtn() {
    cy.get("#navbarBasicExample > div.navbar-end > div > div > a.button.is-white").click();
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
    //cy.get(".subject").contains('Claim your profile in Dunbar at sole.scot').click();
    cy.get('#public_6024486f31635d00174fae65 > .mail-col-1 > .title').click();
  }

  takeMeToSolePage(){
    cy.scrollTo('bottom');
    //cy.get(".button-primary").contains('Take me to my SOLE profile').click();
    cy.get('body > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > a').click();
  }
  
}
export default new adminPage();
