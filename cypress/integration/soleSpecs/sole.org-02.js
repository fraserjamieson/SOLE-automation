import baseFunction from "../reusable/orgBaseFunctions";
import customerBaseFunction from "../reusable/cstBaseFunctions01";
import adminPage from "../pageObject/cypMailPage";
import cst from "../pageObject/customerPage";
import cstBaseFunction2 from "../reusable/cstBaseFunctions02";
import logIn from "../pageObject/solePage";

describe("organization admin operations", () => {
  const aTWOrgMail = Cypress.env("aTWOrgMail"),
    aTWOrgPwd = Cypress.env("aTWOrgPwd"),
    orgUserEmail = Cypress.env("mail"),
    newOrgUser = Cypress.env("newOrgUser"),
    orgMailPasswd = Cypress.env("mailpwd"),
    existingEmail = Cypress.env("existingEmail"),
    existingEmailPwd = Cypress.env("existingEmailPwd");

  it("changes organization admin password from the menu", () => {
    cy.visit("/")
      .get('input[name="email"]')
      .type(aTWOrgMail)
      .get('input[name="password"]')
      .type(aTWOrgPwd)
      .get("button")
      .click()
      .get("#__BVID__15__BV_toggle_")
      .click()
      .get("a")
      .contains("Reset Password")
      .click()
      .get("#input-58")
      .type(aTWOrgPwd)
      .get("#input-63")
      .type(aTWOrgPwd)
      .get("span")
      .contains("submit")
      .click()
      .get("#__BVID__15__BV_toggle_")
      .click()
      .get("button")
      .contains("Logout")
      .click()
      .get('input[name="email"]')
      .type(aTWOrgMail)
      .get('input[name="password"]')
      .type(aTWOrgPwd)
      .get("button")
      .click()
      .url()
      .should("include", "/admin/preview");
  });

  it("creates a new organization user", () => {
    cy.visit("/")
      .get('input[name="email"]')
      .type(aTWOrgMail)
      .get('input[name="password"]')
      .type(aTWOrgPwd)
      .get("button")
      .click()
      .get("button")
      .contains("Edit Details")
      .click()
      .wait(3000)
      .get(".btn-actions-pane-right")
      .click()
      .get(".v-form>button")
      .click()
      .get("label")
      .contains("Name")
      .next()
      .type(newOrgUser)
      .get("label")
      .contains("Email")
      .next()
      .type(orgUserEmail)
      .get("button")
      .contains("submit")
      .click()
      .get("td")
      .contains(newOrgUser);
  });

  it("sets organization opening hours", () => {
    cy.visit("/")
      .get('input[name="email"]')
      .type(existingEmail)
      .get('input[name="password"]')
      .type(existingEmailPwd)
      .get("button")
      .click()
      .get("button")
      .contains("Edit Details")
      .click()
      .get(".btn-actions-pane-right")
      .click()
      .get(".tab-item")
      .contains("Opening Hours")
      .click()
      .get("span")
      .contains("Setup")
      .click()
      .get("a")
      .contains("Add Hours")
      .click()
      .get(".week-day")
      .contains("M")
      .click()
      .get("div>.week-day")
      .eq(2)
      .click()
      .get(".week-day")
      .contains("W")
      .click()
      .get("div>.week-day")
      .eq(4)
      .click()
      .get(".week-day")
      .contains("F")
      .click()
      .get('input[placeholder="Open Time"]')
      .click()
      .get(".hours>li")
      .eq(8)
      .click()
      .get(".minutes>li")
      .eq(1)
      .click()
      .get('input[placeholder="Close Time"]')
      .click({ force: true })
      .get(".hours")
      .eq(1)
      .find("li")
      .eq(18)
      .click()
      .get(".minutes")
      .eq(1)
      .find("li")
      .eq(1)
      .click()
      .get("button")
      .contains("Save")
      .click({ force: true })
      .get("span")
      .contains("Setup")
      .click()
      .get(".week-day")
      .contains("M")
      .click()
      .get("div>.week-day")
      .eq(2)
      .click()
      .get(".week-day")
      .contains("W")
      .click()
      .get("div>.week-day")
      .eq(4)
      .click()
      .get(".week-day")
      .contains("F")
      .click()
      .get("div>.week-day")
      .eq(0)
      .click()
      .get("div>.week-day")
      .eq(6)
      .click()
      .get("label")
      .contains("Open 24 hours")
      .prev()
      .click()
      .get("button")
      .contains("Save")
      .click({ force: true })
      .visit("/")
      .get('input[name="email"]')
      .type(existingEmail)
      .get('input[name="password"]')
      .type(existingEmailPwd)
      .get("button")
      .click();
  });

  // this test is connected with the one that follows, due to password reset expiring in 60 min
  it("sends a password reset email to the new organization user", () => {
    cy.visit("/")
      .get('input[name="email"]')
      .type(aTWOrgMail)
      .get('input[name="password"]')
      .type(aTWOrgPwd)
      .get("button")
      .click()
      .get("button")
      .contains("Edit Details")
      .click()
      .wait(3000)
      .get(".btn-actions-pane-right")
      .click()
      .get("td>button")
      .contains("mail")
      .click()
      .get("span")
      .contains("Confirm")
      .click();
  });

  // this test is connected with the previous one, due to password reset expiring in 60 min
  it("0.1 - resets the password for the new organization user when receiving the password-reset email", () => {
    //below code working fine on edge browser but having some issue on chrome. I'm trying to resolve it
    baseFunction.mailLoging();
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
