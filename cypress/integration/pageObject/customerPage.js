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
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('exist')
      }
      
      const getIframeBody = () => {
        // get the document
        return getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
      }
      getIframeBody().find('#recaptcha-anchor').click();
    //cy.iframe().find('#recaptcha-anchor > div.recaptcha-checkbox-border').should('be.visible').click()
    //cy.get('#recaptcha-anchor > div.recaptcha-checkbox-border').click();
  }
  tickConfirm() {
    cy.get('div:nth-child(8) > input[type=checkbox]').click();
  }
  tickIagree() {
    cy.get('div:nth-child(9) > input[type=checkbox]').click();
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
    cy.get("a.dropbtn").trigger('mousemove', { clientX: 200, clientY: 300 });
    cy.get(".dropdown1-content > a").contains(optionName).click({force: true});
  }
  goToProfileOpt(optionName) {
    cy.get(".navigation > li").contains(optionName).click();
  }
  addAddressBtn() {
    cy.get("div.account-layout.right.mt10").contains('Add Address').click();
  }
  editProfileBtn() {
    cy.get("div.account-layout.right.mt10").contains('Edit').click();
  }
  addressErrCheck(fieldName){
    cy.get('.control-error').should('contain.text',`The "${fieldName}" field is required`);
  }
  profileErrCheck(fieldName){
    cy.get('.control-error').should('contain.text',`The ${fieldName} field is required`);
  }
  addAddressDetail(fieldName,fieldText) {
    //cy.get(".control-group ")
    var field = cy.get(".control-group").contains(fieldName)
    .within(() => {
      field.siblings("input").clear().type(fieldText); 
    });
  }
  clearAddressDetail(fieldName) {
    //cy.get(".control-group ")
    var field = cy.get(".control-group").contains(fieldName)
    .within(() => {
      field.siblings("input").clear(); 
    });
  }
  clearProfileDetail(fieldName) {
    //cy.get(".control-group ")
    var field = cy.get(".col-12 .mandatory").contains(fieldName).siblings("div")
    // .within(() => {
    //   field.siblings("div")
      .within(() => {
        field.children("input").clear(); 
      }); 
    //});
  }
  addProfileDetail(fieldName,fieldText) {
    var field = cy.get("div.col-12").contains(fieldName).siblings("div")
    .within(() => {  
      field.children("input").clear().type(fieldText); 
    });
  }
  selectGender(fieldText) {
    //var field = cy.get("div.col-12").contains('Gender').siblings("div")
    cy.get('select')
  .select(fieldText , { force: true })
  .invoke('val')
  .should('eq', fieldText)
  }
  selectDOB(fieldText) {
    var field = cy.get("div.col-12").contains('Date Of Birth').siblings("div")
    .within(() => {  
      field.children("input").click().type(fieldText); 
    });
  }
  saveBtn() {
    cy.get(".theme-btn").click({force: true});
    cy.wait(2000);
  }
  editAddressBtn() {
    cy.get(".card-link").contains('Edit').click({force: true});
  }
  deletAddressBtn() {
    cy.get(".card-link").contains('Delete').click({force: true});
    cy.on('window:confirm', (str) => {
      expect(str).to.eq('Do you really want to delete this address?')
    })
  }
}
export default new customer();
