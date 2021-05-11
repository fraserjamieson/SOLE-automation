class adminPage {
  enterMailId(mailId) {
    cy.get("#login-username").type(mailId);
    cy.get("#login-signin").click();
  }
  enterMailPwd(pwd) {
    cy.get("#login-passwd").type(pwd);
    cy.get("#login-signin").click();
    cy.wait(3000);
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
    cy.get("#dijit__Widget_22 > div.mailCount",{ timeout: 20000 }).click();
    cy.wait(2000);
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get("#dojox_grid__grid_GridView_0 #page-0 > div:nth-child(1)", {
      timeout: 20000,
    }).click();
    cy.wait(3000);
  }
  mailLogout() {
    cy.get("span.signOutLink > a").click();
    cy.wait(500);
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
    cy.get(".subjectLine").should(
      "contain.text",
      "Reset Password Notification"
    );
  }
  newPWD(email,newPwd) {
    //var newPwd = Cypress.env("mailpwd");
    cy.get("[name='email']").type(email);
    cy.get("[placeholder='Password']").type(newPwd);
    cy.get("[placeholder='Retype password']").type(newPwd);
    cy.get(".btn").contains("Reset Password").click();
    cy.get(".btn.btn-primary.btn-block.btn-flat").contains('Reset Password').click({ force: true });
    cy.window();
    cy.wait(2000);
  }
  newPWDForUser(email) {
    var newPwd = Cypress.env("mailpwd");
    //var newPwd = Cypress.env("mailpwd");
    // cy.get("[name='email']").type(email);
    cy.get("[placeholder='Password...']").type(newPwd);
    cy.get("[placeholder='Password confirmation...']").type(newPwd);
    cy.window();
    cy.wait(2000);
    cy.get(".btn").contains("Reset Password").click();
  }
}
export default new adminPage();
