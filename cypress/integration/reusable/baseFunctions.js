import solePg from "../pageObject/solePage";
let dataMap = new Map();
class baseFunction {
  //Reusable methods
  fetchdata(tc_id) {
    var dataSample;
    cy.fixture("testData").then(function (data) {
      cy.log("***Test data" + data);
      //const data = this.tdata;
      cy.get(data).each((tObject) => {
        cy.log("Test case_id  : " + tObject.id);
        if (tObject.id === tc_id) {
          cy.log("Test Data picked for test case  : " + tObject.id);
          dataMap.set("url", tObject.url);
          dataMap.set("email", tObject.email);
          dataMap.set("password", tObject.password);
          cy.log(dataMap.get("url"));
          //login with org admin
          login(
            dataMap.get("url"),
            dataMap.get("email"),
            dataMap.get("password")
          );
        }
      });
    });
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

  //Log in function
  login(email, password) {
    var url = "http://test.sole.scot:8082/login";
    this.login(url, email, password);
  }
  login(url, email, password) {
    //lounch baseURL
    cy.visit(url);
    cy.title().should("eq", "Local High Street"); //check the title
    //Enter credentials
    solePg.email().type(email);
    solePg.password().type(password);
    //click login btn
    solePg.logInBtn().click();
    //assertion
    solePg.newsMenu().should("be.visible");
    solePg.adminMenu().should("be.visible");
    solePg.setUpMenu().should("be.visible");
    solePg.analyticsMenu().should("be.visible");
    // cy.get('[class="closed-sidebar closed-sidebar-md"]').then(function($class){$class[0].setAttribute('class', 'closed-sidebar closed-sidebar-md closed-sidebar-open')})
    // cy.get('[class="closed-sidebar closed-sidebar-md closed-sidebar-open"]').then(function($class){$class[0].setAttribute('class', 'closed-sidebar closed-sidebar-md')})
  }

  //Log out function
  logOut() {
    solePg.profileIcon().click();
    solePg.logoutBtn().click();
    //assertion
    solePg.email().should("be.visible");
    solePg.password().should("be.visible");
  }
  clickOnElement(menuStr) {
    var navigateMenu = cy.get(menuStr);
    navigateMenu.should("be.visible");
    navigateMenu.click();
  }
}
export default new baseFunction();
