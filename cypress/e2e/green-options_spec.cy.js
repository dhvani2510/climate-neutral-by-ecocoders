const greenOptionsHtmlFile ="../../green-options.html"

describe('Green options page', () => {
    beforeEach(() => {
      cy.visit(greenOptionsHtmlFile)
    })
  
    it.skip('should open modal when "Add New Record" button is clicked', () => {
      cy.get('.add-icon').click(); // Click on the element with the class 'add-icon'
      cy.get('#myModal').should('be.visible'); // Verify the visibility of the modal with the ID 'myModal'
    });
});