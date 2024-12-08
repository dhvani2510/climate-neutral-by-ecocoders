const mainHtmlFile ="../../main.html"

describe('GreenFleet Application', () => {
    beforeEach(() => {
      cy.visit('../../main.html')
    })
  
    it.skip('should open modal when "Add New Record" button is clicked', () => {
      cy.get('.add-icon').click(); // Click on the element with the class 'add-icon'
      cy.get('#myModal').should('be.visible'); // Verify the visibility of the modal with the ID 'myModal'
    });
    
    it.skip('should close modal when close button is clicked', () => {
      cy.get('#new_record_button').click()
      cy.get('#top_close_button').click()
      cy.get('#myModal').should('not.be.visible')
    })
  
    it.skip('should add a new record to the table when data is submitted', () => {
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
  

  describe('Direction buttons', () => {
    it('should contain previous and next buttons with correct attributes and event handlers', () => {
      cy.visit('../../main.html'); // Replace 'your_page_url_here' with the URL of your page
  
      // Assert the presence of the div with the class 'direction-buttons'
      cy.get('.direction-buttons').should('exist');
  
      // Assert the presence and attributes of the previous button
      cy.get('#goto_prevpage')
        .should('exist')
        .should('have.class', 'button_prev')
        .should('have.attr', 'onclick', 'previous_page()')
        .should('contain', 'Previous');
  
      // Assert the presence and attributes of the next button
      cy.get('#goto_nextpage')
        .should('exist')
        .should('have.class', 'button_next')
        .should('have.attr', 'onclick', 'next_page()')
        .should('contain', 'Next');
    });
  });
  

  describe('createTable', () => {
    it('should create the table with header and rows', () => {
      cy.visit(mainHtmlFile);
  
      cy.window().then((win) => {
        const spy = cy.spy(win, 'createTable').as('createTableSpy');
        // Call the function directly
        win.createTable();
  
        // Check if the function was called
        cy.wrap(spy).should('have.been.called');
  
        // Check if the table, header, and rows are created
        cy.get('#myTable').should('exist');
        cy.get('#myTable thead tr').should('exist');
        cy.get('#myTable tbody tr').should('exist');
      });
    });
  });
  
  describe.skip('updateRow', () => {
    it('should update the row with the provided vehicle data', () => {
      cy.visit(mainHtmlFile);
  
      cy.window().then((win) => {
        // Assuming you have a function to get sample vehicle data
        const vehicle = getSampleVehicleData();
  
        // Call the updateRow function with sample data
        win.updateRow(vehicle);
  
        // Check if the row is updated with the provided data
        cy.get(`#row_${vehicle.id}`).should('exist');
  
        // Check if the row cells are updated correctly
        cy.get(`#row_${vehicle.id} td`).eq(0).should('contain.text', vehicle.description);
        cy.get(`#row_${vehicle.id} td`).eq(1).should('contain.text', vehicle.type);
        cy.get(`#row_${vehicle.id} td`).eq(2).should('contain.text', vehicle.year);
        cy.get(`#row_${vehicle.id} td`).eq(3).should('contain.text', vehicle.make);
        cy.get(`#row_${vehicle.id} td`).eq(4).should('contain.text', vehicle.model);
        cy.get(`#row_${vehicle.id} td`).eq(5).should('contain.text', vehicle.annualVKT);
        cy.get(`#row_${vehicle.id} td`).eq(6).should('contain.text', vehicle.annualFuel);
        cy.get(`#row_${vehicle.id} td`).eq(7).should('contain.text', vehicle.fuelType);
        cy.get(`#row_${vehicle.id} td`).eq(8).should('contain.text', vehicle.flexFuel);
        cy.get(`#row_${vehicle.id} td`).eq(9).should('contain.text', vehicle.quantity);
      });
    });
  });
  
  // Add more test cases as needed for other functions
  