import baseFunction from "../reusable/orgBaseFunctions";
import adminPage from "../pageObject/cypMailPage";
import cst from "../pageObject/customerPage";

describe("Stan's Spec", () => {
  const localAdminEmail = Cypress.env("email"),
    localAdminPwd = Cypress.env("password"),
    aTWOrgMail = Cypress.env("aTWOrgMail"),
    aTWOrgPwd = Cypress.env("aTWOrgPwd"),
    orgUserEmail = Cypress.env("mail"),
    newOrgUser = Cypress.env("newOrgUser"),
    orgMailPasswd = Cypress.env("mailpwd");

  xit("logs in as local admin", () => {
    cy.visit("/")
      .get('input[name="email"]')
      .type(localAdminEmail)
      .get('input[name="password"]')
      .type(localAdminPwd)
      .get("button")
      .click()
      .url()
      .should("include", "/admin/dashboard");
  });

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

  it("sets organization opening hours", () => {
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
    //the following mailLoging() fails in this test, possibly due to some pages taking longer to load

    // this test is connected with the previous one, due to password reset expiring in 60 min
    it("0.1 - resets the password for the new organization user when receiving the password-reset email", () => {
      //the following mailLoging() fails in this test, possibly due to some pages taking longer to load

      //below code working fine on edge browser but having some issue on chrome. I'm trying to resolve it
      baseFunction.mailLoging();
      adminPage.selectFirstMail();
      adminPage.resrePwdNotification();
      adminPage.newPwdlink();
      adminPage.mailLogout();

      // // the following 8 lines are a failing modification of the above function with added cy.wait()

      // cy.visit("https://login.aol.com/");
      // adminPage.enterMailId(orgUserEmail);
      // adminPage.enterMailPwd(orgMailPasswd);
      // cy.wait(10000)
      // cy.get(".vp-cc-element.bottom.vp-hide").then(function ($style) {
      //   $style[0].setAttribute("style", "display:none;");
      // })
      // adminPage.goToMail()

      // // the5 following 5 lines are another failing modification of the mailLoging() function

      // cy.visit("https://login.aol.com/")
      // adminPage.enterMailId(orgUserEmail)
      // adminPage.enterMailPwd(orgMailPasswd)
      // cy.wait(10000)
      // cy.get(".mail-link>a").invoke("removeAttr", "target").click()

      //   // the following lines have not been tested, due to the mailLoging() function

      //cy.get('span').contains('Inbox').click()
      // adminPage.selectFirstMail()
      // cy.get('a').contains('Reset Password').invoke('removeAttr', 'target').click()
      //   .get('input[name="password"]').type(orgMailPasswd)
      //   .get('input[name="password_confirmation"]').type(orgMailPasswd)
      //   .get('button').contains('Reset Password').click()
      //   .get('div').contains('Supplier').prev().should('include', newOrgUser)
    });

    it("0.2 - resets the password for the new organization user when receiving the password-reset email", () => {
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

describe('Customer operations', () => {
    const custEmail = Cypress.env("customerMail"),
          custUrl = Cypress.env("cstUrl");

    it('A customer can book a service', () => {
        // let appointmentRefNUm = '';
        let date = '';
        let time = '';

        cy.visit(custUrl)
        Cypress.on("uncaught:exception", (err, runnable) => {
            return false;
        })
        customer.selectMenu('Login')
        customerBaseFunction.logIn(custEmail)
        logIn.globalSearch("Jill's")

        cy.get('h3').contains("Jill's").click()
          .wait(3000)
          .get('p').contains('Garden').find('input').click()
        cy.contains('Check Availability').click()
          .get('input[type="date"]').invoke('removeAttr', 'onkeydown').clear({ force: true }).type('2028-08-07').trigger('change')
          .get('.comments-reply>ul').eq(0).click()
          .get('input[type="radio"]').click()
        cy.contains('Book Now').click()
        cy.contains('Date : ').then($element => {
            date = $element.text().slice(7, 17);
        })
        cy.contains(' Time: ').then($element => {
            time = $element.text().slice(7);
        })
        console.log(date);
        console.log(time);
        // cy.get('input[value="Confirm Booking"]').click()
        //   .wait(2000)
        //   // .get('p').contains('reference').then(($elem) => {
        //   //     let refNumParagraph = $elem.text()
        //   //     appointmentRefNUm = refNumParagraph.slice(refNumParagraph.search('APP'));
        //   // })
        // cy.get('a').contains('My Appointments').click({ force: true })
        //   .wait(3000)
        //   // .get('tbody>tr').eq(0).find('td').contains(appointmentRefNUm)
        // cy.get('tbody>tr').eq(0).find('td').contains(date)
        // cy.get('tbody>tr').eq(0).find('td').contains(time)
    })
})

class reusable {
    logInAsCustomer(customerEmail) {
        cy.visit(Cypress.env("cstUrl"));
        Cypress.on("uncaught:exception", (err, runnable) => {
            return false;
        });
        customer.selectMenu('Login');
        customerBaseFunction.logIn(customerEmail);
    }
}
