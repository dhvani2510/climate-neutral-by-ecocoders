window.onload = createTable;
 
// function to create the user-input table
function createTable() {
  console.log("Creating table");
  fleetData=getFleetData();

  createHeaderRow();
  if (fleetData.length === 0) {
      createEmptyTableRow();
  } else {
    var table = document.getElementById('myTable')
    fleetData.forEach(fleet => {
        createRow(fleet)
    });
  }
}
 
//  write code to geenerate th for myTable
function createHeaderRow() {
    var table = document.getElementById("myTable");
    var thead = table.createTHead();
    var headerRow = thead.insertRow(-1);
    headerRow.insertCell(-1).innerHTML = "Description";
    headerRow.insertCell(-1).innerHTML = "Type";
    headerRow.insertCell(-1).innerHTML = "Year";
    headerRow.insertCell(-1).innerHTML = "Make";
    headerRow.insertCell(-1).innerHTML = "Model";
    headerRow.insertCell(-1).innerHTML = "Annual VKT";
    headerRow.insertCell(-1).innerHTML = "Annual Fuel";
    headerRow.insertCell(-1).innerHTML = "Fuel Type";
    headerRow.insertCell(-1).innerHTML = "Flex-Fuel";
    headerRow.insertCell(-1).innerHTML = "Quantity";
}
 
function createEmptyTableRow() {
        var table = document.getElementById("myTable");
        var tbody = document.createElement("tbody");
        let row = tbody.insertRow(-1);
        row.id = "emptyRow";
        let cell = row.insertCell(-1);
        cell.colSpan = 10;
        cell.innerHTML = "No records Added";
        cell.style.textAlign = "center";
        table.appendChild(tbody);
} 
 
function createRow2(fleet) {
    var table = document.getElementById("myTable");
    // delete empty row if exists
    var emptyRow = document.getElementById("emptyRow");
    if (emptyRow) {
        emptyRow.remove();
    }
    var rowRecord = Object.values(fleet)
    // create tbody if not already existing oterwise use the existing one
    var tbody = document.createElement("tbody");
    if (!document.querySelector("tbody")) {
        table.appendChild(tbody);
    } else {
        tbody = document.querySelector("tbody");
    }
    table.appendChild(tbody);
    console.log(table);
    let row = tbody.insertRow(-1);
    for(let i = 0; i < rowRecord.length; i++) {
        let cell = row.insertCell(-1);
        cell.innerHTML = rowRecord[i];
    }
    // add a onclick function
    row.onclick = function() {
        console.log(fleet);
        openVehicleModal(fleet);
        console.log(row);
    }
}

// Defines the order of columns
const columnOrder = [
  "description", "type", "year", "make", "model", 
  "annualVKT", "annualFuel", "fuelType", "flexFuel", 
  "quantity"
];

//Adds row (vehicle data) to the datatable 
function createRow(vehicle) {
  var table = document.getElementById("myTable");
  // delete empty row if exists
  var emptyRow = document.getElementById("emptyRow");
  if (emptyRow) {
      emptyRow.remove();
  }
  
  // Create new table body if it doesn't exist
  if (!table.tBodies[0]) {
      table.appendChild(document.createElement('tbody'));
  }
  
  // Create new table row
  let row = table.tBodies[0].insertRow(-1);
  
  // Add cells to the row based on column order
  columnOrder.forEach(column => {
      let cell = row.insertCell(-1);
      if(column==="flexFuel")
       cell.innerHTML = yesOrNo(vehicle[column]) || "";
      else          
       cell.innerHTML = vehicle[column] || ''; // Set cell value or empty string if value is undefined
  });

  // Add onclick function to the row
  row.onclick = function() {
      console.log(`Clicked on vehicle ${vehicle.id}`);
      selectedVehicleId=vehicle.id;
      openVehicleModal(vehicle); // Edit or Delete
  }
}

//Updates the row in the table with the updated vehicle data
function updateTableRow(vehicle) {
  var table = document.getElementById("myTable");

  // Find the row corresponding to the selected vehicle
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");
      if (cells.length > 0 && cells[0].innerHTML === vehicle.id.toString()) {
          // Update the cells with the new vehicle data
          cells[1].innerHTML = vehicle.description;
          cells[2].innerHTML = vehicle.type;
          cells[3].innerHTML = vehicle.year;
          cells[4].innerHTML = vehicle.make;
          cells[5].innerHTML = vehicle.model;
          cells[6].innerHTML = vehicle.annualVKT;
          cells[7].innerHTML = vehicle.annualFuel;
          cells[8].innerHTML = vehicle.fuelType;
          cells[9].innerHTML = vehicle.flexFuel ? 'Yes' : 'No';
          cells[10].innerHTML = vehicle.quantity;
          break;
      }
  }
}
 
function yesOrNo(value) {
    console.log(value);
    if(value === 'Yes') {
        return 'True';
    } else {
        return 'False';
    }
}

// modal opeing at setup for adding a row
// function to open modal for adding a row at setup
function openVehicleModal(fleet) {
  var modal = document.getElementById("dataRowModal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "block";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling of main content
  var modalHeader = document.getElementById("data-modal-header");
  if (fleet) {
    modalHeader.innerHTML = "Edit Details";
  }
  else {
    modalHeader.innerHTML = "Add Details";
  }

  toggleDeleteButtonVisibility();
  // set up the data fields in the modal
  if (fleet) {
    document.getElementById("modalDescription").value = fleet["description"];
    document.getElementById("modalType").value = fleet["type"];
    document.getElementById("modalYear").value = fleet["year"];
    document.getElementById("modalMake").value = fleet['make'];
    document.getElementById("modalModel").value = fleet['model'];
    document.getElementById("modalAnnualVKT").value = fleet['vkt'];
    document.getElementById("modalAnnualFuel").value = fleet['fuel_used'];
    document.getElementById("modalFuelType").value = fleet['fuel_type'];
    document.getElementById("modalFlexFuel").value = yesOrNo(fleet['flex_fuel']);
    document.getElementById("modalQuantity").value = fleet['quantity'];
  }
}
 
// function to close modal
function closeModal() {
  var modal = document.getElementById("dataRowModal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
  document.body.style.overflow = ""; // Restore scrolling of main content
  resetModalForm();
}
// function to clear out form fields when closing or canceling
function resetModalForm() {
  document.getElementById("modalDescription").value = "";
  document.getElementById("modalType").value = "";
  document.getElementById("modalYear").value = "";
  document.getElementById("modalMake").value = "";
  document.getElementById("modalModel").value = "";
  document.getElementById("modalAnnualVKT").value = "";
  document.getElementById("modalAnnualFuel").value = "";
  document.getElementById("modalFuelType").value = "";
  var modalFlexFuel =  document.getElementById("modalFlexFuel");
  if(modalFlexFuel)
    modalFlexFuel.value = "";
  document.getElementById("modalQuantity").value = "";
}
 
// Function to handle submit button on click event
function submitData2() {
  var modal = document.getElementById("dataRowModal");
  var overlay = document.getElementById("overlay");
  if (validateInput()) {
    addNewRowToTable();
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = ""; // Restore scrolling of main content
    resetModalForm();
  }
}

var selectedVehicleId=null;

// function to validate input
function validateInput() {
  console.log("Validating input");
  return true;
}
 
document.getElementById('dataRowModal').addEventListener('input', function(event) {
  const input = event.target;
});
 

function submitData() {
 
 // Get input values from the modal
 const modalDescription = document.getElementById('modalDescription').value;
 const modalType = document.getElementById('modalType').value;
 const modalYear = document.getElementById('modalYear').value;
 const modalMake = document.getElementById('modalMake').value;
 const modalModel = document.getElementById('modalModel').value;
 const modalAnnualVKT = document.getElementById('modalAnnualVKT').value;
 const modalAnnualFuel = document.getElementById('modalAnnualFuel').value;
 const modalFuelType = document.getElementById('modalFuelType').value;
 const modalFlexFuel = document.getElementById('modalFlexFuel')?.value;
 const modalQuantity = document.getElementById('modalQuantity').value;

 // TODO validate every field
 var storedData = getFleetData();
 // Validate and add new row

 if(selectedVehicleId) // This means a vehicle is being edited
 {
   var vehicle= storedData.find(v=>v.id==selectedVehicleId);
   if(!vehicle) throw new Error('Vehicle not found');
   debugger;
   vehicle.description=modalDescription;
   vehicle.type=modalType;
   vehicle.year=modalYear;
   vehicle.make=modalMake;
   vehicle.model=modalModel;
   vehicle.annualVKT= modalAnnualVKT;
   vehicle.annualFuel= modalAnnualFuel;
   vehicle.fuelType= modalFuelType;
   vehicle.flexFuel= stringToBool(modalFlexFuel);
   vehicle.quantity=modalQuantity;

   updateTableRow(vehicle);
 }
 else{ // This means a new vehicle is being added

   const newRow = {
     id: storedData.length + 1,
     description: modalDescription,
     type: modalType,
     year: modalYear,
     make: modalMake,
     model: modalModel,
     annualVKT: modalAnnualVKT,
     annualFuel: modalAnnualFuel,
     fuelType: modalFuelType,
     flexFuel: stringToBool(modalFlexFuel),
     quantity: modalQuantity
 };

 storedData.push(newRow);  
 createRow(newRow);
 }

 localStorage.setItem('fleetData', JSON.stringify(storedData)); // Update the local storage data

 sweetAlert(`Vehicle ${selectedVehicleId? "updated": "added"} successfully`, "success",3000);
 // Close the modal after submission
 closeModal();
}

function stringToBool(str) {
 // Convert string to lowercase for case-insensitive comparison
 str = str?.toLowerCase();

 // Check if the string is "true" or "false" and return the corresponding boolean value
 if (str === "true") {
     return true;
 } else if (str === "false") {
     return false;
 } else {
      return false;
     // Handle cases where the string is neither "true" nor "false"
     //throw new Error("Invalid input: String must be 'true' or 'false'");
 }
}


function toggleDeleteButtonVisibility() {
  var deleteButton = document.getElementById("deleteButton");
  if (selectedVehicleId !== null) {
      deleteButton.style.display = "block"; // Show the delete button
  } else {
      deleteButton.style.display = "none"; // Hide the delete button
  }
}


function getVehicleById(id) {
  // Validation: Check if id is a valid integer
  if (!Number.isInteger(id)) {
      throw new Error('Invalid id: must be an integer');
  }

  var vehicles = getFleetData();
  return vehicles.find(v => v.id == id);
}

function deleteVehicle() {
  
  var vehicle = getVehicleById(selectedVehicleId);
  confirmation(deleteVehicleCallBack)
}

//Usage, to delete object with id equal to 2: array = deleteObjectFromArray(array, 'id', 2);
function deleteObjectFromArray(array, property, value) {
  const index = array.findIndex(obj => obj[property] === value);
  if (index !== -1) {
      array.splice(index, 1);
  }
  return array;
}

function deleteVehicleCallBack()
{
  console.log(`Deleting vehicle ${selectedVehicleId}`)
  var vehicles = getFleetData();
  var updated_vehicles= deleteObjectFromArray(vehicles, 'id', selectedVehicleId)
  localStorage.setItem('fleetData', JSON.stringify(updated_vehicles));
  console.log("Deleted vehicle from localstorage");
  closeModal();
  sweetAlert("Vehicle deleted successfully","success",3000 );
}

// function to select the flexfuel option and work them as toggle
function selectFlexFuel(option) {
    if (option === 'Yes') {
        document.getElementById("modalFlexFuel").innerHTML = 'Yes';
        document.getElementById("modalFlexFuel").value= true;
        document.getElementById("yes-button").classList.add('selected');
        document.getElementById("no-button").classList.remove('selected');
    } else {
        document.getElementById("modalFlexFuel").value = 'No';
        document.getElementById("modalFlexFuel").value= false;
        document.getElementById("no-button").classList.add('selected');
        document.getElementById("yes-button").classList.remove('selected');
      }
}