import baseFunction from '../reusable/orgBaseFunctions';
import adminPage from '../pageObject/cypMailPage';

describe('Stan\'s Spec', () => {
    const localAdminEmail = Cypress.env("email"),
          localAdminPwd = Cypress.env("password"),
          aTWOrgMail = Cypress.env("aTWOrgMail"),
          aTWOrgPwd = Cypress.env("aTWOrgPwd"),
          orgUserEmail = Cypress.env("mail"),
          newOrgUser = Cypress.env("newOrgUser");

    it('logs in as local admin', () => {
        cy.visit('/')
          .get('input[name="email"]').type(localAdminEmail)
          .get('input[name="password"]').type(localAdminPwd)
          .get('button').click()
          .url().should('include', '/admin/dashboard')
    })

    it('changes organization admin password from the menu', () => {
        cy.visit('/')
          .get('input[name="email"]').type(aTWOrgMail)
          .get('input[name="password"]').type(aTWOrgPwd)
          .get('button').click()
          .get('#__BVID__15__BV_toggle_').click()
          .get('a').contains('Reset Password').click()
          .get('#input-58').type(aTWOrgPwd)
          .get('#input-63').type(aTWOrgPwd)
          .get('span').contains('submit').click()
          .get('#__BVID__15__BV_toggle_').click()
          .get('button').contains('Logout').click()
          .get('input[name="email"]').type(aTWOrgMail)
          .get('input[name="password"]').type(aTWOrgPwd)
          .get('button').click()
          .url().should('include', '/admin/preview')
    })

    it('creates a new organization user', () => {
        cy.visit('/')
          .get('input[name="email"]').type(aTWOrgMail)
          .get('input[name="password"]').type(aTWOrgPwd)
          .get('button').click()
          .get('button').contains('Edit Details').click()
          .wait(3000)
          .get('.btn-actions-pane-right').click()
          .get('.v-form>button').click()
          .get('label').contains('Name').next().type(newOrgUser)
          .get('label').contains('Email').next().type(orgUserEmail)
          .get('button').contains('submit').click()
          .get('td').contains(newOrgUser)
    })

    it('sends a password reset email to the new organization user', () => {
        cy.visit('/')
          .get('input[name="email"]').type(aTWOrgMail)
          .get('input[name="password"]').type(aTWOrgPwd)
          .get('button').click()
          .get('button').contains('Edit Details').click()
          .wait(3000)
          .get('.btn-actions-pane-right').click()
          .get('td>button').contains('mail').click()
          .get('span').contains('Confirm').click()
    })

    // the following tests are not finished yet

    // it('resets the password for the new organization user when receiving the password-reset email', () => {
    //     baseFunction.mailLoging()
    //     cy.get('span').contains('Inbox').click()
    //     adminPage.selectFirstMail()
    // })

    // it('sets organization opening hours', () => {
    //     cy.visit('/')
    //       .get('input[name="email"]').type('stasoletesting+Around@gmail.com')
    //       .get('input[name="password"]').type('letitsnow1')
    //       .get('button').click()
    //       .get('button').contains('Edit Details').click()
    //       .get('.btn-actions-pane-right').click()
    //       .get('.tab-item').contains('Opening Hours').click()
    //       .get('span').contains('Setup').click()
    //       .get('a').contains('Add Hours').click()
    //       .get('.week-day').contains('M').click()
    //       .get('div>.week-day').eq(2).click()
    //       .get('.week-day').contains('W').click()
    //       .get('div>.week-day').eq(4).click()
    //       .get('.week-day').contains('F').click()
    //       .get('input[placeholder="Open Time"]').click()
    //       .get('.hours>li').eq(8).click()
    //       .get('.minutes>li').eq(1).click()
    //       .get('.time-picker-overlay').click()
    //       .get('input[placeholder="Close Time"]').click()
    //       .get('.hours>li').eq(18).click()
    //       .get('.minutes>li').eq(1).click()
    // })
})
