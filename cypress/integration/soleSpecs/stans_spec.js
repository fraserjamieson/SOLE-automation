import baseFunction from "../reusable/orgBaseFunctions";
import customerBaseFunction from "../reusable/cstBaseFunctions";
import adminPage from "../pageObject/cypMailPage";
import customer from "../pageObject/customerPage";
import stansReusable from '../reusable/stansReusables';
import logIn from '../pageObject/solePage';

describe('organization admin operations', () => {
  const aTWOrgMail = Cypress.env("aTWOrgMail"),
        aTWOrgPwd = Cypress.env("aTWOrgPwd"),
        orgUserEmail = Cypress.env("mail"),
        newOrgUser = Cypress.env("newOrgUser"),
        orgMailPasswd = Cypress.env("mailpwd");

  xit("changes organization admin password from the menu", () => {
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

  xit("creates a new organization user", () => {
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

  xit("sets organization opening hours", () => {
    cy.visit("/")
    .get('input[name="email"]')
    .type("stasoletesting+Around@gmail.com")
    .get('input[name="password"]')
    .type("letitsnow1")
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
    .click()
    .visit("/")
    .get('input[name="email"]')
    .type("stasoletesting+Around@gmail.com")
    .get('input[name="password"]')
    .type("letitsnow1")
    .get("button")
    .click();
  });

  // this test is connected with the one that follows, due to password reset expiring in 60 min
  xit("sends a password reset email to the new organization user", () => {
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
  xit("0.1 - resets the password for the new organization user when receiving the password-reset email", () => {

    //below code working fine on edge browser but having some issue on chrome. I'm trying to resolve it
    baseFunction.mailLoging();
    adminPage.selectFirstMail();
    adminPage.resrePwdNotification();
    adminPage.newPwdlink();
    adminPage.mailLogout();
  });

  xit("0.2 - resets the password for the new organization user when receiving the password-reset email", () => {
    cy.readFile("cypress/fixtures/link.json").then((url) => {
      cy.visit(url.link);
    });
    adminPage.newPWD(aTWOrgMail,aTWOrgPwd);
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.wait(1000);
    cy.writeFile("cypress/fixtures/link.json", { flag: "a+" });
    cst.goToCustAction("Logout");
    cy.wait(2000);
  });
})

describe('customer operations', () => {
  const custEmail = Cypress.env("customerMail"),
  custUrl = Cypress.env("cstUrl");

  xit('books a service', () => {
    stansReusable.logInAsCustomer(custEmail);

    logIn.globalSearch("Jill's");

    stansReusable.clickOnElementWithText('h3', "Jill's");

    stansReusable.clickOnChildWithParentWithText('p', 'Garden', 'input');

    stansReusable.clickOnText('Check Availability');

    stansReusable.changeCalendarDate('2028-09-11')

    stansReusable.clickOnMultipleChildAtIndex('.comments-reply>ul', 0);

    customerBaseFunction.clickOnElement('input[type="radio"]');

    stansReusable.clickOnText('Book Now');

    stansReusable.sliceTextAsVariable('Date : ', 7, 17, 'date')

    stansReusable.sliceTextAsVariable(' Time: ', 7, 12, 'time')

    customerBaseFunction.clickOnElement('input[value="Confirm Booking"]')

    cy.wait(5000)

    stansReusable.clickOnElementWithText('a', 'My Appointments');

    stansReusable.findAliasInMultipleChildAtIndex('date');

    stansReusable.findAliasInMultipleChildAtIndex('time');
  })
})
