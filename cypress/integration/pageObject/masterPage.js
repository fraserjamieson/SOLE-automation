import basefunction from "../reusable/baseFunctions";
let elementIDMap = new Map();

class masterPage {
  fetchElementID(fieldName) {
    cy.fixture("elementID").then(function (data) {
      cy.log("***Test data" + data);
      //const data = this.tdata;
      cy.get(data).each((tObject) => {
        if (tObject.fieldName === fieldName) {
          cy.log(
            "FieldName to pick ID : " +
              tObject.fieldName +
              " id as : " +
              tObject.id
          );
          elementIDMap.set("id", tObject.id);
        }
      });
    });
  }
  navigateTo(menu) {
    var menuOption = menu.toLowerCase();
    // cy.get('[class="closed-sidebar closed-sidebar-md"]').then(function (
    //   $class
    // ) {
    //   $class[0].setAttribute(
    //     "class",
    //     "closed-sidebar closed-sidebar-md closed-sidebar-open"
    //   );
    // });

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
        cy.get("span.vsm-title").contains("Admin").click();
        cy.get(".vsm-title").contains("Local Organisations").click();
        cy.get("div.v-toolbar__title")
          .invoke("text")
          .should("eq", "Organisations");
        cy.wait(1000);
        break;
      case "placements":
        basefunction.clickOnElement("/admin/placements");
        break;
    }
    // cy.get(
    //   '[class="closed-sidebar closed-sidebar-md closed-sidebar-open"]'
    // ).then(function ($class) {
    //   $class[0].setAttribute("class", "closed-sidebar closed-sidebar-md");
    // });
  }

  //Method to click add new button
  addNewBtn() {
    var addNew = cy.get("span.v-btn__content").contains("Add New");
    return addNew;
  }
  selectAction(action) {
    var actionItem = action.toLowerCase();
    //Scroll to right needs when window size is 100%
    // cy.get("div.v-data-table__wrapper").scrollTo("right");
    switch (actionItem) {
      case "edit":
        cy.wait(3000);
        cy.get(
          "tr:nth-child(1) > td.justify-center.layout.px-0 > a:nth-child(1)"
        ).click();
        /* .first()
          .click();*/
        cy.wait(1000);
        break;
      case "delete":
        cy.get("td.justify-center.layout.px-0 > button").first().click();
        cy.wait(1000);
        break;
      case "save":
        cy.get("button:nth-child(5)").first().click();
        cy.wait(1000);
        break;
      case "org detail":
        cy.get(
          "td.justify-center.layout.px-0 > a.mr-2.router-link-exact-active.router-link-active"
        ).click();
        cy.wait(1000);
        break;
      case "edittag":
        cy.wait(3000);
        cy.get("button.v-icon.notranslate.mr-2").click();
        cy.wait(1000);
        break;
    }
    // var actionName = cy.get("td.justify-center").contains(action);
    //  return actionName;
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
        name.siblings("input").clear().type(fieldText); // Only yield inputs within form
      });
  }

  enterSearchInput(fieldText) {
    var searchText = cy
      .get("div.v-text-field__slot")
      .contains("Search")
      .within(() => {
        searchText.siblings("input").type(fieldText); // Only yield inputs within form
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
}
export default new masterPage();
