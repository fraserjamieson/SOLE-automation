import basefunction from "../reusable/orgBaseFunctions";
import solePg from "../pageObject/solePage";
import masterPg from "../pageObject/masterPage";
import cst from "../pageObject/customerPage";
import admn from "../pageObject/cypMailPage";
describe("Organisation Admin user operations ", () => {
  var emailID = basefunction.getUniqueEmailID(),
    admnMail = Cypress.env("mail"),
    email = Cypress.env("email");

  it("TC_01_Local Admin can create and save a new Org", () => {
    
    basefunction.login(admnMail);
    masterPg.navigateTo("shopsetup");
   // masterPg.closeVdoPopup();
    cst.manageShopBtn();
    cst.dashboardManu('Catalog');
    cst.addProduct();
    cst.selectProductType('Downloadable');
    cst.selectAttrFamly('Default');
    cst.addSKU(basefunction.getRandomNumber(4));
    cst.saveProduct();
    cst.productName('Prod-A');
    cst.urlKey(basefunction.getRandomNumber(4));
    cst.selectSwitch('New');
    
  });
 
});
