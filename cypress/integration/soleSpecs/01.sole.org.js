import basefunction from "../reusable/orgBaseFunctions";
import solePg from "../pageObject/solePage";
import masterPg from "../pageObject/masterPage";
import admn from "../pageObject/cypMailPage";
var Promise = require("es6-promise").Promise;
describe("Organisation Admin user operations ", () => {
  var emailID = basefunction.getUniqueEmailID(),
    admnMail = Cypress.env("mail"),
    email = Cypress.env("email");

  it("TC_01_Local Admin can create and save a new Org", () => {
    basefunction.login(email);
    masterPg.navigateTo("local organisations");
    cy.wait(500);
    masterPg.addNewBtn().click();
    solePg.selectOrgCategories("Community");
    solePg.selectOrgTags("Charity");
    solePg.selectBookingType("Delivery");
    masterPg.enterTextInput("Phone", "123456789");
    masterPg.enterTextInput("Code", basefunction.getRandomString(6));
    masterPg.enterTextInput("Name", "TestABC");
    masterPg.enterTextInput("Email", emailID);
    masterPg.enterTextInput("Address", "21 test");
    masterPg.enterTextInput("Town/City", "Dunbar");
    masterPg.enterTextInput("Post Code", "D5 0AB");
    masterPg.enterTextInput("County/District", "ABC");
    masterPg.enterTextInput("Country", "Scotland");
    masterPg.enterTextInput("Admin Email", admnMail);
    masterPg.enterTextInput("Mobile", "123456");
    masterPg.enterTextInput("Website", "www.testabc.com");
    masterPg.selectCurrency();
    cy.wait(500);
    solePg.submitBtn().click();
    cy.wait(2000);
  });
  it("TC_02_Local Admin can edit the new org and action the Claim Profile button", () => {
    basefunction.login(email);
    masterPg.navigateTo("local organisations");
    masterPg.enterSearchInput("TestABC");
    masterPg.selectAction("edit");
    masterPg.enterTextInput("Mobile", basefunction.getRandomNumber(6));
    solePg.cypBtn().click();
    solePg.cypMsg();
    solePg.cypSuccessMsg(admnMail);
  });
  it("TC_03.01_Org Admin can claim his profile from link recieved in mail", () => {
    basefunction.mailLoging();
    admn.selectFirstMail();
    admn.takeMeToSolePage();
    admn.mailLogout();
  });
  it("TC_03.02_And can create password to access site", () => {
    cy.readFile("cypress/fixtures/link.json").then((url) => {
      cy.visit(url.link);
    });
    admn.setPwd();
    cy.writeFile("cypress/fixtures/link.json", { flag: "a+" });
  });
  it("TC_04_Org Admin can edit their details by changing, adding and saving", () => {
    basefunction.login(admnMail);
    solePg.myDetails();
    solePg.editDetails();
    // solePg.selectOrgCategories("Retail");
    // solePg.selectOrgTags("Bakery");
    // solePg.selectBookingType("Delivery");
    masterPg.enterTextInput("Phone", "987654321");
    masterPg.enterTextInput("Name", "Test-A'B & C");
    masterPg.enterTextInput("Address", "test 21");
    masterPg.enterTextInput("Town/City", "Dunbar city");
    masterPg.enterTextInput("Post Code", "D5 0BA");
    masterPg.enterTextInput("County/District", "XYZ");
    masterPg.enterTextInput("Country", "Scotland");
    masterPg.enterTextInput("Mobile", "654321");
    masterPg.enterTextInput("Website", "www.testabcd.com");
    masterPg.tickBox("Shop?: No");
    masterPg.tickBox("Can Chat?: No");
    masterPg.tickBox("Is Validated?: No");
    masterPg.tickBox("Can Book?: No");
    masterPg.enterHeader();
    masterPg.enterDesc();
    cy.wait(500);
    solePg.submitBtn().click();
    //admn.checkOrgAdminPage(); //function not working
  });
  it("TC_05_Org Admin can change their password", () => {
    basefunction.login(admnMail);
    solePg.resetPwd();
    admn.setPwd();
  });
});
