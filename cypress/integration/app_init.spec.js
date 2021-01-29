/// <reference types="cypress" />

describe('App initialization', function () {
  it('front page can be opened', async function () {
    cy.visit('/');
    cy.contains('Rostyslav Synenko');
    cy.contains('Welcome');
  });
});
