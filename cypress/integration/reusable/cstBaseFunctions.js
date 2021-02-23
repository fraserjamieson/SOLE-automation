import cst from "../pageObject/customerPage";

// let dataMap = new Map();
 class cstBaseFunction {
//   //Reusable methods
  login(email) {
    var pwd = Cypress.env('password'),
    cstUrl = Cypress.env('cstUrl');
    //lounch baseURL
    cy.visit(cstUrl);
   // cy.title().should("eq", "Local High Street"); 
    //Enter credentials
    solePg.email().type(email);
    solePg.password().type(pwd);
    //click login btn
    solePg.logInBtn().click();
  }
  //Log out function
  logOut() {
    solePg.profileIcon().click();
    solePg.logoutBtn().click();
    //assertion
    solePg.email().should("be.visible");
    solePg.password().should("be.visible");
  }
 //Register function
 register(firstName,lastName,email) {
  var pwd = Cypress.env('password');
 
  cst.firstName(firstName);
  cst.lastName(lastName);
  cst.email(email);
  cst.password(pwd);
  cst.reTypePwd(pwd);
  cst.reCaptcha();
  cst.tickConfirm();
  cst.tickIagree();
  cst.register();
  
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
 
}
export default new cstBaseFunction();
