/// <reference types="cypress"/>

context("Renders the application", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3010");
    });

    it("should render the next wrapper", () => {
        cy.get("#__next").should('exist');
    });
    it("should render the React Admin wrapper", () => {
        cy.get(".RaLayout-root-1").should('exist');
    });
    it("should render the React Admin Dashboarc wrapper", () => {
        cy.get(".RaLayout-root-1").should('exist');
    });
});

export { }