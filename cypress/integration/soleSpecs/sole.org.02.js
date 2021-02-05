import basefunction from "../reusable/baseFunctions";
import solePg from "../pageObject/solePage";
import adminPg from "../pageObject/adminPage";
import masterPg from "../pageObject/masterPage";
let dataMap = new Map();
var returnText = "";

//work in progress
xdescribe("New user registration", async function() {
    it("Register Form: Email is delievered", function() {
      const test_id = new Date().getTime();
      //const incoming_mailbox = `stasoletesting+${test_id}@gmail.com`;
      const incoming_mailbox = `stasoletesting+TUES@gmail.com`;
    
      cy.task("gmail:check", {
          from: "info@sole.scot",
          to: incoming_mailbox,
          subject: "Thanks for claiming you profile"
        })
        .then(email => {
          assert.isNotNull(email, `Email was not found`);
        });
    });
  });
  
  describe('Login', () => {
    xit('Login through Google', () => {
      const username = "stasoletesting@gmail.com";
      const password = "1DaviotStreet.";
      const loginUrl = "https://accounts.google.com/signin/v2/challenge/pwd?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&cid=1&navigationDirection=forward&TL=AM3QAYarmtiE3nYqJe2OcAgFjKLhPgMkjK9ZS9y1-53nsea4u2QrpVkpLwNtsdfu";
      const cookieName = "Cypress.Cookies.defaults";
      const socialLoginOptions = {
        username: username,
        password: password,
        loginUrl: loginUrl,
        headless: true,
        logs: false,
        loginSelector: '[href="/auth/auth0/google-oauth2"]',
        postLoginSelector: '.account-panel'
      }
  
      return cy.task('GoogleSocialLogin', socialLoginOptions).then(({cookies}) => {
        cy.clearCookies()
  
        const cookie = cookies.filter(cookie => cookie.name === cookieName).pop()
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure
          })
  
          Cypress.Cookies.defaults({
            preserve: cookieName
          })
        }
      })
    })
  })


