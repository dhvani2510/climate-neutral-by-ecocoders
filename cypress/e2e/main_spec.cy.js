describe('GreenFleet Application', () => {
    beforeEach(() => {
      cy.visit('../../../main.html')
    })
  
    it('should open modal when "Add New Record" button is clicked', () => {
      cy.get('#new_record_button').click()
      cy.get('#myModal').should('be.visible')
    })
  
    it('should close modal when close button is clicked', () => {
      cy.get('#new_record_button').click()
      cy.get('#top_close_button').click()
      cy.get('#myModal').should('not.be.visible')
    })
  
    it('should add a new record to the table when data is submitted', () => {
      cy.get('#new_record_button').click()
      cy.get('#modalDescription').type('Test Vehicle')
      cy.get('#modalType').type('Car')
      // Add more fields if needed
      cy.get('#vehicle_modal_submit_button').click()

      cy.get('.swal2-container').should('be.visible');
      cy.get('.swal2-title').should('contain', 'Vehicle added successfully');
      //cy.get('.swal2-content').should('contain', 'Your SweetAlert message');
      cy.wait(3000);
      // After 3 seconds, assert that the SweetAlert is no longer visible
      cy.get('.swal2-container').should('not.exist');
      
      cy.get('#myModal').should('not.be.visible')
      cy.contains('Test Vehicle').should('be.visible')
    })
  
    // it('should display a confirmation dialog when delete button is clicked', () => {
    //   cy.get('.gridjs-table tbody tr').first().find('button').first().click()
    //   cy.get('.swal2-confirm').should('be.visible')
    // })
  })
  