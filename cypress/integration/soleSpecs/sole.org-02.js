import basefunction from "../reusable/orgBaseFunctions";
import customerBaseFunction from "../reusable/cstBaseFunctions01";
import adminPage from "../pageObject/cypMailPage";
import cstBaseFunction2 from "../reusable/cstBaseFunctions02";
import orgPg from "../pageObject/solePage";

describe("organization admin operations", () => {
const aTWOrgMail = Cypress.env("aTWOrgMail"),
      aTWOrgPwd = Cypress.env("aTWOrgPwd"),
      orgUserEmail = Cypress.env("mail"),
      newOrgUser = Cypress.env("newOrgUser"),
      existingEmail = Cypress.env("existingEmail"),
      existingEmailPwd = Cypress.env("existingEmailPwd");

  it("changes organization admin password from the menu" +
  "Existing org (created prior to a release) can login", () => {
    //log in with existing mail id
    basefunction.login(aTWOrgMail, aTWOrgPwd);
    //select reset password
    orgPg.resetPwdLinkFromProfile();
    //reset password
    orgPg.resetPwdFromProfile(aTWOrgPwd);
    //log out
    basefunction.logOut();
    //log in with set pwd
    basefunction.login(aTWOrgMail, aTWOrgPwd);
    //check url is correct
    cy.url().should("include", "/admin/preview");
  });

  it("creates a new organization user" + 
  "Existing org (created prior to a release) can edit org page", () => {
    //log in with existing mail id
    basefunction.login(aTWOrgMail, aTWOrgPwd);
    orgPg.selectEditdetails();
    //add new user
    orgPg.addNewUserToOrg(newOrgUser, orgUserEmail);
    //check user added
    cy.get("td").contains(newOrgUser);
  });

  it("sets organization opening hours" + 
  "Existing org (created prior to a release) can alter opening hours", () => {
    //log in with existing mail id
    basefunction.login(existingEmail, existingEmailPwd);
    orgPg.selectEditdetails();
    //set up opening time for working days
    orgPg.setOpeningHrsWeekDays();
    // set up opening time for sat and sun
    orgPg.setOpeningHrsWeekend();

    //check opening time listed correct
    cy.get("tbody > tr").eq(0).should("contain.text", "Sun No Yes");
    cy.get("tbody > tr").eq(1).should("contain.text", "Mon No No 07:00:00 - 17:00:00");
    cy.get("tbody > tr").eq(2).should("contain.text", "Tue No No 07:00:00 - 17:00:00");
    cy.get("tbody > tr").eq(3).should("contain.text", "Wed No No 07:00:00 - 17:00:00");
    cy.get("tbody > tr").eq(4).should("contain.text", "Thu No No 07:00:00 - 17:00:00");
    cy.get("tbody > tr").eq(5).should("contain.text", "Fri No No 07:00:00 - 17:00:00");
    cy.get("tbody > tr").eq(6).should("contain.text", "Sat No Yes");

    //log out
    basefunction.logOut();
  });

  it("Sends a password reset email to the new organization user" + 
  "Existing org (created prior to a release) can change password", () => {
    //log in with existing mail id
    basefunction.login(aTWOrgMail, aTWOrgPwd);
    orgPg.selectEditdetails();
    cy.get(".btn-actions-pane-right").click();
    orgPg.selectResetMailPwd();
    orgPg.pwdResetMsg(orgUserEmail);
    orgPg.pwdResetConfirmMsg(orgUserEmail);

    //log out
    basefunction.logOut();
  });

  // this test is connected with the previous one, due to password reset expiring in 60 min
  it("0.1 - resets the password for the new organization user when receiving the password-reset email", () => {
    basefunction.mailLoging();
    adminPage.selectFirstMail();
    adminPage.resrePwdNotification();
    adminPage.newPwdlink();
    adminPage.mailLogout();
  });

  it("0.2 - resets the password for the new organization user when receiving the password-reset email", () => {
    cy.readFile("cypress/fixtures/link.json").then((url) => {
      cy.visit(url.link);
    });
    adminPage.newPWDForUser(aTWOrgMail, aTWOrgPwd);
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.wait(1000);
    cy.writeFile("cypress/fixtures/link.json", { flag: "a+" });
    cy.get(".col-md-6").contains("Around the World").click();
    //Need to write function for logout
    cy.wait(2000);

    //log out
    basefunction.logOut();
  });
});

describe("customer operations", () => {
  const custEmail = Cypress.env("customerMail"),
    custUrl = Cypress.env("cstUrl");

  it("books a service", () => {
    cstBaseFunction2.logInAsCustomer(custEmail);

    logIn.globalSearch("Jill's");

    cstBaseFunction2.clickOnElementWithText("h3", "Jill's");

    cstBaseFunction2.clickOnChildWithParentWithText("p", "Garden", "input");

    cstBaseFunction2.clickOnText("Check Availability");

    cstBaseFunction2.changeCalendarDate("2028-09-11");

    cstBaseFunction2.clickOnMultipleChildAtIndex(".comments-reply>ul", 0);

    customerBaseFunction.clickOnElement('input[type="radio"]');

    cstBaseFunction2.clickOnText("Book Now");

    cstBaseFunction2.sliceTextAsVariable("Date : ", 7, 17, "date");

    cstBaseFunction2.sliceTextAsVariable(" Time: ", 7, 12, "time");

    customerBaseFunction.clickOnElement('input[value="Confirm Booking"]');

    cy.wait(5000);

    cstBaseFunction2.clickOnElementWithText("a", "My Appointments");

    cstBaseFunction2.findAliasInMultipleChildAtIndex("date");

    cstBaseFunction2.findAliasInMultipleChildAtIndex("time");
  });
});
