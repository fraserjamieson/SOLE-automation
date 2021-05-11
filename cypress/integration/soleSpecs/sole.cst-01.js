import cstBasefunction from "../reusable/cstBaseFunctions01";
import cst from "../pageObject/customerPage";
import solePg from "../pageObject/solePage";
import masterPg from "../pageObject/masterPage";
import admn from "../pageObject/cypMailPage";

var admnMail = Cypress.env("mail"),
  cstUrl = Cypress.env("cstUrl"),
  email = Cypress.env("customerMail"),
  firstName = "ABC",
  lastName = "XYZ",
  vatId = "INV01234567891",
  editedVatId = "INV09876543219",
  companyName = `ABC's`,
  editedCompanyName = `X-YZ's "company"`,
  streetAddress = `24 (test , street)`,
  city = "Dunbar",
  county = "Glasgow",
  postalCode = "A1. 8AA",
  phone = "23456789",
  editedPhone = "987654321",
  cstFirstName = "Customer",
  cstLastName = "ABC",
  gender = "Female",
  DOB = "1999-12-31";

describe("Customer user operations ", () => {
  beforeEach(function () {
    cy.visit(cstUrl);
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.wait(1000);
  });
  afterEach(() => {
    cst.goToCustAction("Logout");
    cy.wait(2000);
  });
  it("TC_07_A customer can log in via the Login link in the header", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
  });
  it("TC_08_A customer can log in via the link on the registration page", () => {
    cst.selectMenu("Register");
    cst.signInOnRegister();
    cstBasefunction.logIn(email);
  });
  it("TC_09_A customer can add a new address (Company & VAT fields not populated)" + 
  "\nTC_16_A customer cannot save a new address if mandatory fields are not entered.", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Address");

    cy.get("body").then(($body) => {
      if ($body.find(".card").length > 0) {
        let count = $body.find(".card").length;
        while (count > 0) {
          cst.deletAddressBtn();
          count = count - 1;
        }
      } else {
      }
    });

    cst.addAddressBtn();
    cst.saveBtn();
    //TC_16_A customer cannot save a new address if mandatory fields are not entered.
    cst.addressErrCheck("First name");
    cst.addressErrCheck("Last name");
    cst.addressErrCheck("Street Address");
    cst.addressErrCheck("City");
    cst.addressErrCheck("County");
    cst.addressErrCheck("Postal Code");
    //Add details
    cst.addAddressDetail("First name", firstName);
    cst.addAddressDetail("Last name", lastName);
    cst.addAddressDetail("Street Address", streetAddress);
    cst.addAddressDetail("City", city);
    cst.addAddressDetail("County", county);
    cst.addAddressDetail("Postal Code", postalCode);
    cst.addAddressDetail("Phone", phone);
    cst.saveBtn();
    cy.get("div.alert").should("contain.text", "Success!");
    cy.get("div.card").should("contain.text", firstName);
    cy.get("div.card").should("contain.text", lastName);
    cy.get("div.card").should("contain.text", streetAddress);
    cy.get("div.card").should("contain.text", city);
    cy.get("div.card").should("contain.text", county);
    cy.get("div.card").should("contain.text", postalCode);
    cy.get("div.card").should("contain.text", phone);
  });
  it("TC_11_A customer can edit an address (Company & VAT fields not populated)"+
  "\nTC_17_A customer cannot save an edited address if mandatory fields are not entered.", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Address");
    cst.editAddressBtn();
    //clear details to check error message
    cst.clearAddressDetail("First name");
    cst.clearAddressDetail("Last name");
    cst.clearAddressDetail("Street Address");
    cst.clearAddressDetail("City");
    cst.clearAddressDetail("County");
    cst.clearAddressDetail("Postal Code");

    //TC_17_A customer cannot save an edited address if mandatory fields are not entered.
    cst.addressErrCheck("First name");
    cst.addressErrCheck("Last name");
    cst.addressErrCheck("Street Address");
    cst.addressErrCheck("City");
    cst.addressErrCheck("County");
    cst.addressErrCheck("Postal Code");

    //Add details
    cst.addAddressDetail("First name", firstName);
    cst.addAddressDetail("Last name", lastName);
    cst.addAddressDetail("Street Address", streetAddress);
    cst.addAddressDetail("City", city);
    cst.addAddressDetail("County", county);
    cst.addAddressDetail("Postal Code", postalCode);
    cst.addAddressDetail("Phone", editedPhone);
    cst.saveBtn();
    cy.get("div.alert").should("contain.text", "Success!");
    cy.get("div.card").should("contain.text", editedPhone);
    cy.get("div.card").should("not.contain.text", phone);
  });
  it("TC_13_A customer can delete an address", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Address");
    cst.deletAddressBtn();
    cy.get(".account-table-content > div").should(
      "contain.text",
      "You do not have any saved addresses here, please try to create it by clicking the add button."
    );
  });
  it("TC_10_A customer can add a news address with the company and VAT fields populated."+
  "\nTC_16_A customer cannot save a new address if mandatory fields are not entered.", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Address");
    cst.addAddressBtn();
    cst.saveBtn();
    //TC_16_A customer cannot save a new address if mandatory fields are not entered.
    cst.addressErrCheck("First name");
    cst.addressErrCheck("Last name");
    cst.addressErrCheck("Street Address");
    cst.addressErrCheck("City");
    cst.addressErrCheck("County");
    cst.addressErrCheck("Postal Code");

    // add details
    cst.addAddressDetail("Company name", companyName);
    cst.addAddressDetail("First name", firstName);
    cst.addAddressDetail("Last name", lastName);
    cst.addAddressDetail("Vat id", vatId);
    cst.addAddressDetail("Street Address", streetAddress);
    cst.addAddressDetail("City", city);
    cst.addAddressDetail("County", county);
    cst.addAddressDetail("Postal Code", postalCode);
    cst.addAddressDetail("Phone", phone);
    cst.saveBtn();
    cy.get("div.alert").should("contain.text", "Success!");
    cy.get("div.card").should("contain.text", firstName);
    cy.get("div.card").should("contain.text", lastName);
    cy.get("div.card").should("contain.text", companyName);
    cy.get("div.card").should("contain.text", streetAddress);
    cy.get("div.card").should("contain.text", city);
    cy.get("div.card").should("contain.text", county);
    cy.get("div.card").should("contain.text", postalCode);
    cy.get("div.card").should("contain.text", phone);
  });
  it("TC_12_A customer can edit an address and add a company and VAT fields" + 
  "\nTC_17_A customer cannot save an edited address if mandatory fields are not entered." +
  "\nTC_25_A customer can use the following characters in all fields when adding an address ( ) - \" ' . ,", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Address");
    cst.editAddressBtn();
    //clear details to check error message
    cst.clearAddressDetail("First name");
    cst.clearAddressDetail("Last name");
    cst.clearAddressDetail("Street Address");
    cst.clearAddressDetail("City");
    cst.clearAddressDetail("County");
    cst.clearAddressDetail("Postal Code");

    //TC_17_A customer cannot save an edited address if mandatory fields are not entered.
    cst.addressErrCheck("First name");
    cst.addressErrCheck("Last name");
    cst.addressErrCheck("Street Address");
    cst.addressErrCheck("City");
    cst.addressErrCheck("County");
    cst.addressErrCheck("Postal Code");

    //TC_25_A customer can use the following characters in all fields when adding an address ( ) - \" ' . ,
    //add details
    cst.addAddressDetail("Company name", editedCompanyName);
    cst.addAddressDetail("First name", firstName);
    cst.addAddressDetail("Last name", lastName);
    cst.addAddressDetail("Vat id", editedVatId);
    cst.addAddressDetail("Street Address", streetAddress);
    cst.addAddressDetail("City", city);
    cst.addAddressDetail("County", county);
    cst.addAddressDetail("Postal Code", postalCode);
    cst.addAddressDetail("Phone", editedPhone);
    cst.saveBtn();
    cy.get("div.alert").should("contain.text", "Success!");
    cy.get("div.card").should("contain.text", editedCompanyName);
    cy.get("div.card").should("contain.text", editedPhone);
    cy.get("div.card").should("not.contain.text", phone);

    //delete address for future tests
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Address");
    cst.deletAddressBtn();
    cy.get(".account-table-content > div").should(
      "contain.text",
      "You do not have any saved addresses here, please try to create it by clicking the add button."
    );
  });
  it("TC_13_A customer can edit their profile and update all fields", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Profile");
    cst.editProfileBtn();
    cst.clearProfileDetail("First Name");
    cst.clearProfileDetail("Contact Email");

    //error message check
    cst.profileErrCheck("first_name");
    cst.profileErrCheck("email");

    //add details
    cst.addProfileDetail("First Name", cstFirstName);
    cst.selectGender(gender);
    cst.selectDOB(DOB);
    cst.addProfileDetail("Contact Email", email);
    cst.addProfileDetail("Phone", phone);
    cst.saveBtn();

    //confirm
    cy.get("div.alert").should("contain.text", "Success!");
    //.table
    cy.get(".table").should("contain.text", cstFirstName);
    cy.get(".table").should("contain.text", cstLastName);
    cy.get(".table").should("contain.text", gender);
    cy.get(".table").should("contain.text", DOB);
    cy.get(".table").should("contain.text", email);
    cy.get(".table").should("contain.text", phone);
  });
  it("TC_19_A customer can view all downloads which they have purchased and download the purchase if it has not expired", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Downloadable Products");

    //check table of content
    cst.tableTitlecheckdwnldprdct();
    cy.get("table.table > tbody >tr").should("contain.text", "DOWNLOAD5");
    cy.get("table > tbody > tr > td:nth-child(2) > a").should("be.visible");
  });
  it("TC_20_A customer can view the statatus, date and details of purchases they have made.", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Orders");

    //check table of content
    cst.tableTitlecheckordrprdct();
    cy.get("table.table > tbody >tr").should(
      "contain.text",
      "Andrew’s – AutoParts & Accessories"
    );
    cy.get("table > tbody > tr > td:nth-child(5)").should(
      "contain.text",
      "Processing"
    );
    cy.get("table > tbody > tr > td:nth-child(6)").should("be.visible");
  });
  it("TC_22_A customer can view their wish list", () => {
    cst.selectMenu("Login");
    cstBasefunction.logIn(email);
    cst.goToCustAction("Profile");
    cst.goToProfileOpt("Wishlist");

    //check wishlist
    cy.get(".wishlist-container").should("contain.text", `18" Pink Alloy`);
  });
});

describe("customer user other scenarios ", () => {
  var email = Cypress.env("customerMail"),
    pwd = Cypress.env("mailpwd");
  it("TC_15_A customer cannot login using the Organisation login page", () => {
    cy.visit("/");
    solePg.email().type(email);
    solePg.password().type(pwd);
    solePg.logInBtn().click();
    //check error
    cy.get(".error").should(
      "contain.text",
      "No Associated Organisation found."
    );
  });
  it("TC_15.01_A customer can request a password reset from the I forgot my password link on the login page.", () => {
    cy.visit(cstUrl);
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.wait(1000);
    cst.selectMenu("Login");
    cst.forgotMyPwd();
    cst.forgotMyPwdEmail(email);
  });
  it("TC_15.01_A customer can set a password by received reset email from the I forgot my password link on the login page.", () => {
    cstBasefunction.mailLoging();
    admn.selectFirstMail();
    admn.resrePwdNotification();
    admn.newPwdlink();
    admn.mailLogout();
  });
  it("TC_15.02_A customer can set a password by received reset email from the I forgot my password link on the login page.", () => {
    cy.readFile("cypress/fixtures/link.json").then((url) => {
      cy.visit(url.link);
    });
    admn.newPWD(email);
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.wait(1000);
    cy.writeFile("cypress/fixtures/link.json", { flag: "a+" });
    cy.get(".dropbtn").should("contain.text", "Customer ABC");
    cst.goToCustAction("Logout");
    cy.wait(2000);
  });
});

