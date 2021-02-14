import solePg from "../pageObject/solePage";
import admn from "../pageObject/cypMailPage";
// let dataMap = new Map();
 class baseFunction {
//   //Reusable methods
  login(email,pwd) {
    //lounch baseURL
    cy.visit('/');
    cy.title().should("eq", "Local High Street"); 
    //Enter credentials
    solePg.email().type(email);
    solePg.password().type(pwd);
    //click login btn
    solePg.logInBtn().click();
    //assertion
    solePg.adminMenu().should("be.visible");
    solePg.setUpMenu().should("be.visible");
    solePg.analyticsMenu().should("be.visible");
  }
  //Log out function
  logOut() {
    solePg.profileIcon().click();
    solePg.logoutBtn().click();
    //assertion
    solePg.email().should("be.visible");
    solePg.password().should("be.visible");
  }
  getRandomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  getRandomNumber(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  getUniqueEmailID() {
    var result = "automation";
    var randomcharacters = this.getRandomString(6);
    result = result + randomcharacters + "@test.com";
    return result;
  }
  clickOnElement(menuStr) {
    var navigateMenu = cy.get(menuStr);
    navigateMenu.should("be.visible");
    navigateMenu.click();
  }
  searchFirstRecord() {
    cy.wait(2000);
    cy.get("table > tbody > tr:nth-child(1) > td:nth-child(1)").then(function (
      $elem
    ) {
      returnText = $elem.text();
      cy.wait(500);
      masterPg.enterSearchInput(returnText);
    });
  }

  mailLoging(){
    var mailId = Cypress.env('mail7loginId'),
     pwd = Cypress.env('mail7pwd'),
     mailName = Cypress.env('mail7');

     cy.visit("https://mail7.io");
    admn.loginBtn();
    admn.enterMailId(mailId);
    admn.enterMailPwd(pwd);
    admn.submit();
    admn.popUpHandle(mailName);
  }
}
export default new baseFunction();
