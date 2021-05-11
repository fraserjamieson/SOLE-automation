import "cypress-iframe";

describe("This is a test for search functionality", () => {
  var email = Cypress.env("email"),
    pwd = Cypress.env("password"),
    existingEmail = Cypress.env("existingEmail"),
    existingEmailPwd = Cypress.env("existingEmailPwd"),
    orgAddressURL = Cypress.env("orgAddressURL");
  const getIframeDocument = () => {
    return (
      cy
        .get("#frame_id")
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its("0.contentDocument")
        .should("exist")
    );
  };

  const getIframeBody = () => {
    // get the document
    return (
      getIframeDocument()
        // automatically retries until body is loaded
        .its("body")
        .should("not.be.undefined")
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
    );
  };

  it("Can hide/show address", () => {
    // This assumes the address is shown by default

    cy.visit("/");
    cy.adminLogin(existingEmail, existingEmailPwd);

    // Disables the address in the admin
    cy.clickAddressCheckboxInAdmin();

    // Waits 5 seconds because of the iframe loading
    cy.wait(5000);
    // Checks the address doesn't show in the preview
    // This will fail if the address doesn't contain Riverside
    getIframeBody().find(".right-sidebar").should("not.contain", "Riverside");

    cy.visit(orgAddressURL);
    cy.get(".right-sidebar").should("not.contain", "Riverside");

    cy.visit("/");
    cy.adminLogin(existingEmail, existingEmailPwd);

    // Disables the address in the admin
    cy.clickAddressCheckboxInAdmin();

    // Waits 5 seconds because of the iframe loading
    cy.wait(5000);
    // Checks the address doesn't show in the preview
    // This will fail if the address doesn't contain Riverside
    getIframeBody().find(".right-sidebar").should("contain", "Riverside");

    cy.visit(orgAddressURL);
    cy.get(".right-sidebar").should("contain", "Riverside");
  });

  it("Can search for specific community post, not logged in", () => {
    cy.visit(Cypress.env("cstUrl"));
    cy.get("#search-global").type("210421{enter}");
    cy.get(".post-info > h3").should("contain", "210421");
  });

  it("Can search for specific community post, logged in", () => {
    cy.visit(Cypress.env("cstUrl"));
    cy.get(".header_menu").click();
    cy.get(`input[type='email']`).type(email);
    cy.get("#psd").type(pwd);
    cy.get(`button[type='submit']`).click();
    cy.get(".dropbtn > span").should("contain", "Dunbar High");
    cy.get("#search-global").type("210421{enter}");
    cy.get(".post-info > h3").should("contain", "210421");
  });

  it("Can search for specific community post and like it, logged in", () => {
    cy.visit(Cypress.env("cstUrl"));
    cy.get(".header_menu").click();
    cy.get(`input[type='email']`).type(email);
    cy.get("#psd").type(pwd);
    cy.get(`button[type='submit']`).click();
    cy.get(".dropbtn > span").should("contain", "Dunbar High");
    cy.get("#search-global").type("210421{enter}");
    cy.get(".post-info > h3").should("contain", "210421");
    cy.get(".post-info > h3").click();
    // Grabs the like div, extracts the contents, adds one to it and compares the value after liking the post
    cy.get("#singlepostlike > div").then(($el) => {
      const originalLike = Number($el.text());
      const newLike = originalLike + 1;

      cy.get("#singlepostlike > div").click();
      cy.get("#singlepostlike > div").should("contain", newLike);
    });
  });
});
