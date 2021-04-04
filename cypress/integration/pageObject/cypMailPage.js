class adminPage {
  enterMailId(mailId) {
    cy.get("#login-username").type(mailId);
    cy.get("#login-signin").click();
  }
  enterMailPwd(pwd) {
    cy.get("#login-passwd").type(pwd);
    cy.get("#login-signin").click();
  }
  goToMail() {
    cy.get("li.mail-link")
      .contains("Mail")
      .invoke("removeAttr", "target")
      .click();
  }
  submit() {
    cy.get(
      "#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > div > button"
    ).click();
  }
  selectFirstMail() {
    cy.get("#dijit__Widget_22 > div.mailCount").click();
    cy.wait(2000);
    cy.get("#dojox_grid__grid_GridView_0 #page-0 > div:nth-child(1)").click();
    cy.wait(3000);
  }
  mailLogout() {
    cy.get("span.signOutLink > a").click();
  }
  takeMeToSolePage() {
    cy.get("table > tbody > tr > td > a")
      .contains("Take me to my SOLE profile")
      .invoke("removeAttr", "target")
      .invoke("attr", "href")
      .then((href) => {
        cy.writeFile("cypress/fixtures/link.json", { link: href });
      });
  }
  clickHereToLogin() {
    cy.get("table > tbody > tr > td > a")
      .contains("Click Here to Login")
      .invoke("removeAttr", "target")
      .invoke("attr", "href")
      .then((href) => {
        cy.writeFile("cypress/fixtures/link.json", { link: href });
      });
  }
  newPwdlink() {
    cy.get("table > tbody > tr > td > a")
      .contains("Reset Password")
      .invoke("removeAttr", "target")
      .invoke("attr", "href")
      .then((href) => {
        cy.writeFile("cypress/fixtures/link.json", { link: href });
      });
  }
  setPwd() {
    var newPwd = Cypress.env("password");
    var pwd = cy
      .get("div.container")
      .contains("New Password")
      .within(() => {
        pwd.siblings("input").clear().type(newPwd);
      });
    var pwd2 = cy
      .get("div.container")
      .contains("Confirm Password")
      .within(() => {
        pwd2.siblings("input").clear().type(newPwd);
      });
    cy.get("button.btn-shadow-primary").click();
    cy.window();
    cy.wait(2000);
  }
  resrePwdNotification() {
    cy.get(".subjectLine").should("contain.text", "Reset Password Notification");   
  }
  newPWD(email) {
    var newPwd = Cypress.env("mailpwd");
    cy.get("[name='email']").type(email);
    cy.get("[placeholder='Password']").type(newPwd);
    cy.get("[placeholder='Retype password']").type(newPwd);
    cy.get(".btn").contains("Reset Password").click();
    cy.window();
    cy.wait(2000);
  }
}
export default new adminPage();
