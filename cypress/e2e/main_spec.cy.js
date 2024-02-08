Cypress.on('uncaught:exception', (err, runnable) => {
  // Check if the error message includes "module is not defined"
  if (err.message.includes('module is not defined')) {
      // Suppress the error
      return false;
  }
  // Let other uncaught exceptions through
  return true;
});


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
      cy.wait(3000);
      // After 3 seconds, assert that the SweetAlert is no longer visible
      cy.get('.swal2-container').should('not.exist');
      
      cy.get('#myModal').should('not.be.visible')
      cy.contains('Test Vehicle').should('be.visible')
    })
  
    it('should display a confirmation dialog when delete button is clicked', () => {
      addVehicle()
      cy.get('.gridjs-table tbody tr').first().find('.button_sm.green.delete').click();
      cy.get('.swal2-confirm').should('be.visible')
      cy.get('.swal2-confirm.swal2-styled.swal2-default-outline').click();
      cy.wait(1000);
      cy.get('.swal2-title').should('contain', 'Vehicle deleted successfully');
      cy.wait(2000);// After 3 seconds, assert that the SweetAlert is no longer visible   
      cy.get('.swal2-container').should('not.exist');
    })

    it('should edit a record when edit button is clicked', () => {
      addVehicle()
      // Assuming the first row is being edited
      cy.get('.gridjs-table tbody tr').first().find('.button_sm.green.edit').click();
      // Modify the fields as needed
      cy.get('#modalDescription').clear().type('Edited Vehicle Description');
      cy.get('#modalType').clear().type('Edited Vehicle Type');
      // Add more fields if needed
      cy.get('#vehicle_modal_submit_button').click();

      cy.get('.swal2-container').should('be.visible');
      cy.get('.swal2-title').should('contain', 'Vehicle updated successfully');
      cy.wait(3000);
      // After 3 seconds, assert that the SweetAlert is no longer visible
      cy.get('.swal2-container').should('not.exist');
      
      cy.get('#myModal').should('not.be.visible')

      // Assert that the edited values are displayed in the table
      cy.contains('Edited Vehicle Description').should('be.visible');
      cy.contains('Edited Vehicle Type').should('be.visible');

      // Add more assertions for other fields if needed
    })

    function addVehicle()
    {
      cy.get('#new_record_button').click()
      cy.get('#modalDescription').type('Test Vehicle')
      cy.get('#modalType').type('Car')
      // Add more fields if needed
      cy.get('#vehicle_modal_submit_button').click()
      cy.wait(3000);
    }
  })
  

  