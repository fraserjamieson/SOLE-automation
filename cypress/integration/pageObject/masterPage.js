import basefunction from "../reusable/orgBaseFunctions";
let elementIDMap = new Map();

class masterPage {
  navigateTo(menu) {
    var menuOption = menu.toLowerCase();
    switch (menuOption) {
      case "allpost":
        cy.get(".vsm-title").contains("Posts").click();
        cy.get(".vsm-title").contains("All Posts").click();
        cy.get("div.v-toolbar__title").invoke("text").should("eq", "Posts");
        break;
      case "categories":
        cy.get(".vsm-title").contains("Posts").click();
        cy.get(".vsm-title").contains("Categories").click();
        break;
      case "tags":
        cy.get(".vsm-title").contains("Posts").click();
        cy.get(".vsm-title").contains("Tags").click();
        break;
      case "local organisations":
        cy.get("div.vsm-list .vsm-title").contains("Admin").click();
        cy.get(".vsm-title").contains("Local Organisations").click();
        cy.get("div.v-toolbar__title")
          .invoke("text")
          .should("eq", "Organisations");
        cy.wait(1000);
        break;
      case "placements":
        basefunction.clickOnElement("/admin/placements");
        break;
      case "shopsetup":
        cy.get("div.vsm-list .vsm-title").contains("Shop").click();
        cy.get(".vsm-title").contains("Your Shop").click();
        cy.get(".app-page-title").should("contain.text", "Manage Shop");
        cy.wait(1000);
        break;
    }
  }
  //Method to click add new button
  addNewBtn() {
    cy.wait(2000);
    var addNew = cy.get("button.mb-2", { timeout: 10000 }).contains("Add New");
    return addNew;
  }
  selectAction(action) {
    var actionItem = action.toLowerCase();
    switch (actionItem) {
      case "edit":
        cy.wait(3000);
        cy.get(
          "tr:nth-child(1) > td.justify-center.layout.px-0 > a:nth-child(1)",{ timeout: 10000 }).click();
        cy.wait(1000);
        break;
      case "delete":
        cy.get("td.justify-center.layout.px-0 > button")
          .first()
          .click({ force: true });
        cy.on("window:confirm", (str) => {
          expect(str).to.eq("Are you sure you want to delete this record?");
        });
        cy.wait(1000);
        break;
      case "save":
        cy.get("button:nth-child(5)").first().click();
        cy.wait(1000);
        break;
      case "org detail":
        cy.get(
          " table > tbody > tr:nth-child(1) > td.justify-center.layout.px-0 > a.mr-2"
        ).click();
        cy.wait(1000);
        break;
      case "edittag":
        cy.wait(3000);
        cy.get("button.v-icon.notranslate.mr-2").click();
        cy.wait(1000);
        break;
    }
  }
  //Method to action based on id
  enterText(fieldName, dataValue) {
    cy.fixture("elementID").then(function (data) {
      cy.get(data).each((tObject) => {
        if (tObject.fieldName === fieldName) {
          var element = cy.get(tObject.id).clear().type(dataValue);
        }
      });
    });
  }
  // enter text method
  enterTextInput(fieldName, fieldText) {
    var name = cy
      .get("div.v-text-field__slot")
      .contains(fieldName)
      .within(() => {
        name.siblings("input").clear().type(fieldText);
      });
  }
  tickBox(fieldName) {
    var name = cy
      .get("label.v-label")
      .contains(fieldName)
      .parent("div")
      .click();
  }
  enterHeader() {
    cy.get("#orgheader > .ql-container > .ql-editor")
      .clear()
      .type("Hello World!");
  }
  enterDesc() {
    cy.get("#orgdesc > .ql-container > .ql-editor")
      .clear()
      .type("This is Description.");
  }
  enterSearchInput(fieldText) {
    var searchText = cy
      .get("div.v-text-field__slot")
      .contains("Search")
      .within(() => {
        searchText.siblings("input").type(fieldText);
      });
  }
  //select currency
  selectCurrency() {
    cy.get(".md2 > .v-input > .v-input__control > .v-input__slot").click();
    cy.get("div.v-list-item__title").contains("£").click();
  }
  //Method to click based on id
  clickElement(fieldName) {
    cy.fixture("elementID").then(function (data) {
      cy.get(data).each((tObject) => {
        if (tObject.fieldName === fieldName) {
          var element = cy.get(tObject.id).click();
        }
      });
    });
  }
  clickOnElement(fieldName) {
    var selectField = cy
      .get(".container .v-select__slot")
      .contains(fieldName)
      .then((obj) => {
        selectField.click();
      });
  }
  closeVdoPopup() {
    //cy.get('#pendo-g-QZUspU5fAAZkKBOXyjp9na0smDw');
    cy.get("#pendo-button-ffc8b1bc").click();
  }
}
export default new masterPage();
