import solePg from "../pageObject/solePage";
import admn from "../pageObject/cypMailPage";
// let dataMap = new Map();
 class baseFunction {
//   //Reusable methods
  login(email) {
    var pwd = Cypress.env('password');
    //lounch baseURL
    cy.visit('/');
   // cy.title().should("eq", "Local High Street"); 
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
    var pwd = Cypress.env('mailpwd'),
     mailName = Cypress.env('mail');
     
     cy.visit("https://login.aol.com/");
//https://mail.aol.co.uk/
    admn.enterMailId(mailName);
    admn.enterMailPwd(pwd);  
    admn.goToMail();
  }
  // consentHandel(){
  //     if (cy.title().contains('AOL is now a part of Verizon Media') ) {
  //       cy.get("div.actions.couple > form > button").click();
  //     } else {
  //       // do nothing
  //     } 
 // }
}
export default new baseFunction();