class customer {
  email(email) {
    cy.get("[name='email']").type(email);
  }
  password(pwd) {
    cy.get("[name='password']").type(pwd);
  }
  logInBtn() {
    cy.get("button.btn").contains("Sign In").click();
  }
  selectMenu(menuName) {
    cy.get(".menu1>a").contains(menuName).click();
  }
  firstName(firstName) {
    cy.get('[name="firstname"]').type(firstName);
  }
  lastName(lastName) {
    cy.get('[name="lastname"]').type(lastName);
  }
  lastName(lastName) {
    cy.get('[name="lastname"]').type(lastName);
  }
  reTypePwd(pwd) {
    cy.get('[name="password_confirmation"]').type(pwd);
  }
  reCaptcha() {
    const getIframeDocument = () => {
      return cy
        .get('iframe[role="presentation"]')
        .its("0.contentDocument")
        .should("exist");
    };

    const getIframeBody = () => {
      // get the document
      return (
        getIframeDocument()
          // automatically retries until body is loaded
          .its("body")
          .should("not.be.undefined")
          .then(cy.wrap)
      );
    };
    getIframeBody().find("#recaptcha-anchor").click();
  }
  tickConfirm() {
    cy.get("div:nth-child(8) > input[type=checkbox]").click();
  }
  tickIagree() {
    cy.get("div:nth-child(9) > input[type=checkbox]").click();
  }
  register() {
    cy.get("button.btn").contains("Register").click();
  }
  signIn() {
    cy.get("button.btn").contains("Sign In").click();
  }
  signInOnRegister() {
    cy.get(".register-box").contains("I already have a login").click();
  }
  goToCustAction(optionName) {
    cy.get("a.dropbtn").trigger("mousemove", { clientX: 200, clientY: 300 });
    cy.get(".dropdown1-content > a")
      .contains(optionName)
      .click({ force: true });
  }
  goToProfileOpt(optionName) {
    cy.get(".navigation > li").contains(optionName).click();
  }
  addAddressBtn() {
    cy.get("div.account-layout.right.mt10").contains("Add Address").click();
  }
  editProfileBtn() {
    cy.get("div.account-layout.right.mt10").contains("Edit").click();
  }
  addressErrCheck(fieldName) {
    cy.get(".control-error").should(
      "contain.text",
      `The "${fieldName}" field is required`
    );
  }
  profileErrCheck(fieldName) {
    cy.get(".control-error").should(
      "contain.text",
      `The ${fieldName} field is required`
    );
  }
  addAddressDetail(fieldName, fieldText) {
    //cy.get(".control-group ")
    var field = cy
      .get(".control-group")
      .contains(fieldName)
      .within(() => {
        field.siblings("input").clear().type(fieldText);
      });
  }
  clearAddressDetail(fieldName) {
    //cy.get(".control-group ")
    var field = cy
      .get(".control-group")
      .contains(fieldName)
      .within(() => {
        field.siblings("input").clear();
      });
  }
  clearProfileDetail(fieldName) {
    var field = cy
      .get(".col-12 .mandatory")
      .contains(fieldName)
      .siblings("div")
      .within(() => {
        field.children("input").clear();
      });
  }
  addProfileDetail(fieldName, fieldText) {
    var field = cy
      .get("div.col-12")
      .contains(fieldName)
      .siblings("div")
      .within(() => {
        field.children("input").clear().type(fieldText);
      });
  }
  selectGender(fieldText) {
    cy.get("select")
      .select(fieldText, { force: true })
      .invoke("val")
      .should("eq", fieldText);
  }
  selectDOB(fieldText) {
    var field = cy
      .get("div.col-12")
      .contains("Date Of Birth")
      .siblings("div")
      .within(() => {
        field.children("input").click().type(fieldText);
      });
  }
  saveBtn() {
    cy.get(".theme-btn").click({ force: true });
    cy.wait(2000);
  }
  editAddressBtn() {
    cy.get(".card-link").contains("Edit").click({ force: true });
  }
  deletAddressBtn() {
    cy.get(".card-link").contains("Delete").click({ force: true });
    cy.on("window:confirm", (str) => {
      expect(str).to.eq("Do you really want to delete this address?");
    });
  }
  manageShopBtn() {
    cy.get("div.mb-3.card")
      .contains("Manage Shop")
      .invoke("removeAttr", "target")
      .click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
  }
  dashboardManu(option) {
    cy.get(".menubar > li ").contains(option).click({ force: true });
  }
  addProduct() {
    cy.get(" div.page-action > a").click();
  }
  selectProductType(typeName) {
    cy.get("#type").select(typeName);
  }
  selectAttrFamly(typeName) {
    cy.get("#attribute_family_id").select(typeName);
  }
  addSKU(text) {
    cy.get("#sku").type(text);
  }
  saveProduct() {
    cy.get(".btn").contains("Save Product").click();
  }
  productName(fieldText) {
    cy.get(".content").scrollTo("top");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("#name").type(fieldText);
  }
  urlKey(fieldText) {
    cy.get("#url_key").clear().type(fieldText);
  }
  selectSwitch(fieldText) {
    var field = cy
      .get(".control-group.boolean")
      .contains(fieldText)
      .within(() => {
        field.children("label").click();
      });
  }
  tableTitlecheckdwnldprdct() {
    cy.get("table.table > thead >tr > th").should("contain.text", "Order Id");
    cy.get("table.table > thead >tr > th").should("contain.text", "Title");
    cy.get("table.table > thead >tr > th").should("contain.text", "Date");
    cy.get("table.table > thead >tr > th").should("contain.text", "Status");
    cy.get("table.table > thead >tr > th").should(
      "contain.text",
      "Remaining Downloads"
    );
  }
  tableTitlecheckordrprdct() {
    cy.get("table.table > thead >tr > th").should("contain.text", "Supplier");
    cy.get("table.table > thead >tr > th").should("contain.text", "Order ID");
    cy.get("table.table > thead >tr > th").should("contain.text", "Date");
    cy.get("table.table > thead >tr > th").should("contain.text", "Total");
    cy.get("table.table > thead >tr > th").should("contain.text", "Status");
    cy.get("table.table > thead >tr > th").should("contain.text", "Action");
  }
  forgotMyPwd() {
    cy.get("a.badge").contains("I forgot my password").click();
  }
  forgotMyPwdEmail(email) {
    cy.get("[name='email']").type(email);
    cy.get(".btn").contains("Send Password Reset Link").click();
    cy.get(".alert").should(
      "contain.text",
      `We have e-mailed your password reset link!`
    );

  }
  //
}
export default new customer();
