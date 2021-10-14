describe('Demo test', function() {
  context('Create Record', function() {
    before(function () {
      // runs once before all tests in the block
      cy.intercept('http://localhost:3000/fields').as('fields');
      cy.intercept('http://localhost:3000/data').as('data');

      cy.visit('http://localhost:6289');

      cy.wait('@fields');
      cy.wait('@data');
    });

    it('Add new record', function() {
      // Step 1. Open `Create Record` dialog
      cy.get('[data-id=add-record-btn]').click();

      // Step 2. Fill and save data
      cy.get('[data-id=city]').type('Austin');
      cy.get('[data-id=state]').type('TX');
      cy.get('[data-id=zipCode]').type('60000');
      cy.get('[data-id=beds]').type(2);
      cy.get('[data-id=ok-btn]').click();

      // Step 3. Save current amount of records in dataGrid
      cy.get('[data-id=grid]')
        .as('dataGrid')
        .get('tr[role=row]')
        .as('currentRows');

      // Step 4. Save new record
      cy.get('[data-id=reload-btn]').click();
      cy.wait('@data');

      // Step 5. Check is data added to the grid or not
      cy.get('.dx-loadpanel-content').should('exist').and('not.be.visible');
      cy.get('@dataGrid')
        .get('tr[role=row]')
        .then(records => {
          // Check is one row was added to the grid
          expect(this.currentRows?.length + 1).to.eq(records.length);

          // Take last row data from the grid (new row was added to the end)
          const lastRowCells = Array.from(records[records.length - 1].cells) || [];

          // Check cells for the values what we put to the dialog
          lastRowCells.forEach((cell, index) => {
            switch (index) {
              case 1: expect(cell.innerText).to.eq('Austin'); break;
              case 2: expect(cell.innerText).to.eq('TX'); break;
              case 3: expect(cell.innerText).to.eq('60000'); break;
              case 4: expect(cell.innerText).to.eq('2'); break;
            }

          })
      });
    });
  })
})
