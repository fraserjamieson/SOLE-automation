class logIn {
  email() {
    return cy.get("[name='email']");
  }
  password() {
    return cy.get("[name='password']");
  }
  logInBtn() {
    return cy.get("button.btn");
  }
  profileIcon() {
    return cy.get(".icon-wrapper > .rounded-circle");
  }
  logoutBtn() {
    return cy.get(".btn-pill.btn-shadow.btn-shine.btn.btn-focus");
  }
  newsMenu() {
    return cy.get(".vsm-icon.pe-7s-news-paper");
  }
  adminMenu() {
    return cy.get(".vsm-icon.pe-7s-settings");
  }
  setUpMenu() {
    return cy.get(".vsm-icon.pe-7s-tools");
  }
  analyticsMenu() {
    return cy.get(".vsm-icon.pe-7s-ticket");
  }
  exitFromField() {
    return cy.get("div.card-header");
  }
  selectOrgCategories(catName) {
    cy.wait(2000);
    cy.get(
      ":nth-child(1) > .flex > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections"
    ).click();
    cy.wait(1000);
    cy.get("div.v-list-item__content").contains(catName).click();
    this.exitFromField().click();
  }
  selectOrgTags(TagName) {
    cy.get(
      ":nth-child(2) > :nth-child(1) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections"
    ).click();
    var TagName = cy.get("div.v-list-item__content").contains(TagName).click();
    this.exitFromField().click();
  }
  orgTag() {
    return cy.get(
      ":nth-child(2) > :nth-child(1) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections"
    );
  }
  selectBookingType(typeName) {
    cy.get(
      ":nth-child(2) > :nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-select__slot"
    ).click();
    var typeName = cy
      .get("div.v-list-item__content")
      .contains(typeName)
      .click();
    this.exitFromField().click();
  }
  submitBtn() {
    var submit = cy.get(".btn-shadow-primary.btn.btn-primary");
    return submit;
  }
  submitEditBtn() {
    var submit = cy.get(
      "div.d-block.text-right.card-footer > button:nth-child(3)"
    );
    return submit;
  }
  cypBtn() {
    var cypBtn = cy
      .get("div.d-block.text-right.card-footer")
      .contains("Claim Profile");
    return cypBtn;
  }
  result() {
   var result = cy.get('table > tbody > tr > td > div').length;
   console.log(result);
    return result;
  }
  cypMsg() {
    cy.get(".v-card")
      .should("contain", "Claim Profile Confirmation")
      .should(
        "contain",
        "Are you sure to send a request to claim profile for this organisation ?"
      );
    cy.get("div.v-card__actions > button:nth-child(2) ").click();
  }
  cypSuccessMsg(emailID) {
    cy.get(".v-card")
      .should("contain", "Claim Profile Confirmation")
      .should(
        "contain",
        `Email sent successfully to admin user email ${emailID}`
      );
    cy.get(" div.v-card__actions > button").click();
  }
  myDetails() {
    this.profileIcon().click();
    cy.get(".scroll-area-xs > .nav > :nth-child(3) > .nav-link").click();
    this.profileIcon().click();
  }
  resetPwd() {
    this.profileIcon().click();
    cy.get(".scroll-area-xs > .nav > :nth-child(2) > .nav-link").click();
    this.profileIcon().click();
  }
  editDetails() {
    cy.get(".page-title-actions > .mr-2 > .btn-shadow").click();
  }
  globalSearch(fieldText) {
    cy.get("#search-global").clear().type(fieldText).type("{enter}");
  }
  searchCat(typeName) {
    cy.get(".overlay-link > a").contains(typeName).click();
  }
  subSearch(fieldText) {
    cy.get(".newsletter-form #subsearch")
      .clear()
      .type(fieldText)
      .type("{enter}");
  }
  selectResetMailPwd() {
    cy.get("button.v-icon")
      .contains("mail").click();
  }
  pwdResetMsg(email) {
    cy.get("div.v-card")
      .should("contain", "User password reset request")
      .should(
        "contain",
        `This will send email to ${email} for resetting their password, Please confirm.`
      );
      cy.get("button.v-btn")
      .contains("Confirm").click();
  }
  pwdResetConfirmMsg(email) {
    cy.get("div.v-card")
      .should("contain", "User password reset request")
      .should(
        "contain",
        `Password reset email link has been sent to ${email}`
      );
      cy.get("button.v-btn")
      .contains("Close").click();
  }
  checkSrtipeAccountContent() {
    cy.get("button.tab-item").contains("Users").click();
      cy.get("thead.v-data-table-header > tr > th")
      .should(
        "contain.text",
        `NameEmailAdmin User?Action`
      );
  }
  checkSrtipeOpnHrsContent() {
    cy.get("button.tab-item").contains("Opening Hours").click();
      cy.get("thead.v-data-table-header > tr > th")
      .should(
        "contain.text",
        `DayClosedOpen 24 hrsTimingsActions`
      );
  }
}
export default new logIn();
