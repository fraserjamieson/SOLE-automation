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
  orgCat(){ 
    return cy.get(":nth-child(1) > .flex > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections"); 
  }
  selectOrgCategories(catName){
    var catName = cy.get("div.v-list-item__content").contains(catName); 
     return catName;
  }
  orgTag(){ 
    return cy.get(":nth-child(2) > :nth-child(1) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections"); 
  }
  bookingType(){ 
    return cy.get(":nth-child(2) > :nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-select__slot"); 
  }
  exitFromField(){
    return cy.get("div.card-header"); 
  }  
  submitBtn(){
    var submit = cy.get(".btn-shadow-primary.btn.btn-primary"); 
    return submit;
  } 
  submitEditBtn(){
    var submit = cy.get("div.d-block.text-right.card-footer > button:nth-child(3)"); 
    return submit;
  } 
  cypBtn(){
    var cypBtn = cy.get("div.d-block.text-right.card-footer").contains('Claim Profile'); 
    return cypBtn;
  } 
  cypMsg(){
    cy.get(".v-card")
      .should("contain", "Claim Profile Confirmation")
      .should("contain", "Are you sure to send a request to claim profile for this organisation ?");
     cy.get("div.v-card__actions > button:nth-child(2) ").click();     
  }
  cypSuccessMsg(emailID){
    cy.get(".v-card")
      .should("contain", "Claim Profile Confirmation")
      .should("contain", `Email sent successfully to admin user email ${emailID}`);
     cy.get(" div.v-card__actions > button").click();     
  }
}
export default new logIn();
