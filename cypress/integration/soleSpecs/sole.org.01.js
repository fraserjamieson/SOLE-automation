import basefunction from "../reusable/baseFunctions";
import solePg from "../pageObject/solePage";
import masterPg from "../pageObject/masterPage";
import admn from "../pageObject/cypMailPage";
let dataMap = new Map();
var returnText = "";

describe("Organisation Admin user operations ", () => {
  var emailID = basefunction.getUniqueEmailID();
  var admnMail = Cypress.env('mail7');
  
  xit("TC_01_Local Admin can create and save a new Org", () => {
    basefunction.login();
    masterPg.navigateTo("local organisations");
    masterPg.addNewBtn().click();
    solePg.orgCat().click();
    solePg.selectOrgCategories("Community").click();
    solePg.exitFromField().click();
    solePg.orgTag().click();
    solePg.selectOrgCategories("Charity").click();
    solePg.exitFromField().click();
    solePg.bookingType().click();
    solePg.selectOrgCategories("Delivery").click();
    solePg.exitFromField().click();
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
    cy.pause();
    //786
    solePg.submitBtn().click();
    cy.wait(500);
  });

  xit("TC_02_Local Admin can edit the new org and action the Claim Profile button", () => {
    basefunction.login();
    masterPg.navigateTo("local organisations");
    masterPg.enterSearchInput("TestABC");
    masterPg.selectAction("edit");
    masterPg.enterTextInput("Mobile", basefunction.getRandomNumber(6));
    solePg.cypBtn().click();
    solePg.cypMsg();
    solePg.cypSuccessMsg(admnMail);
  });

  it("TC_03_Org Admin can claim his profile from link recieved in mail and can create password to access site", () => {
    basefunction.mailLoging();
    admn.selectSOLEmail();
    admn.takeMeToSolePage();
    
  });
  xit("Search and delete the product", () => {
    getTestDataAndLogin("Org_Test_001");
    masterPg.navigateTo("local organisations");
    masterPg.enterSearchInput("TestABC");
    masterPg.selectAction("delete");
    cy.wait(5000);
    cy.on("window:confirm", (str) => {
      expect(str).to.equal(`Are you sure you want to delete this record?`);
    });
    cy.on("window:confirm", () => true);
    cy.wait(2000);
    basefunction.logOut();
  });

  xit("Search Tag", () => {
    getTestDataAndLogin("Org_Test_001");
    masterPg.navigateTo("Tags");
    basefunction.searchFirstRecord("SearchTag");
    cy.wait(2000);
    basefunction.logOut();
  });

  xit("Search Category", () => {
    getTestDataAndLogin("Org_Test_001");
    masterPg.navigateTo("Categories");
    masterPg.enterSearchInput("Offers");
    basefunction.searchFirstRecord("SearchCat");
    cy.wait(2000);
    basefunction.logOut();
  });

  xit("Edit Tag", () => {
    getTestDataAndLogin("Org_Test_001");
    masterPg.navigateTo("Tags");
    basefunction.searchFirstRecord("SearchTag");
    cy.wait(2000);
    masterPg.selectAction("edittag");
    var newName = basefunction.getRandomString(4);
    masterPg.enterText("editedTagValue", newName);
    masterPg.selectAction("Save");
    cy.wait(2000);
    basefunction.logOut();
  });

  //working on it
  xit("Verify Gmail", () => {
    cy.visit(
      "https://accounts.google.com/signin/v2/challenge/pwd?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&cid=1&navigationDirection=forward&TL=AM3QAYarmtiE3nYqJe2OcAgFjKLhPgMkjK9ZS9y1-53nsea4u2QrpVkpLwNtsdfu"
    );
    cy.wait(5000);
    cy.get("#identifierId").clear().type("stasoletesting@gmail.com");
    cy.get("#identifierNext").click();
    cy.wait(5000);
    cy.get("[type='password']").clear().type("1DaviotStreet.");
    cy.get("#passwordNext > div > button").click();
  });
});
