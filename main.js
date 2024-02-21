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
    fleetData.forEach(vehicle => {
        createRow(vehicle)
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
  
  // Add id to the row based on vehicle id
  row.id = `row_${vehicle.id}`;

  // Add cells to the row based on column order
  columnOrder.forEach(column => {
      let cell = row.insertCell(-1);         
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

function updateRow(updatedVehicle) {
  // Get the row corresponding to the selected vehicle ID
  var row = document.getElementById(`row_${updatedVehicle.id}`);
  
  if (row) {
      // Update the cells with the new vehicle data
      row.cells[0].textContent = updatedVehicle.description;
      row.cells[1].textContent = updatedVehicle.type;
      row.cells[2].textContent = updatedVehicle.year;
      row.cells[3].textContent = updatedVehicle.make;
      row.cells[4].textContent = updatedVehicle.model;
      row.cells[5].textContent = updatedVehicle.annualVKT;
      row.cells[6].textContent = updatedVehicle.annualFuel;
      row.cells[7].textContent = updatedVehicle.fuelType;
      row.cells[8].textContent = updatedVehicle.flexFuel;
      row.cells[9].textContent = updatedVehicle.quantity;
      
      // Optionally, update the selectedVehicleId variable if needed
      selectedVehicleId = updatedVehicle.id;
  } else {
      console.log("Row not found");
  }
}

function deleteRow() {
  // Get the row corresponding to the selected vehicle
  var row = document.getElementById(`row_${selectedVehicleId}`);
  if (row) {
      // Remove the row from the table
      row.parentNode.removeChild(row);
  } else {
      console.log("Row not found");
  }
}

// modal opeing at setup for adding a row
// function to open modal for adding a row at setup
function openVehicleModal(vehicle) {
  var modal = document.getElementById("dataRowModal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "block";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling of main content
  var modalHeader = document.getElementById("data-modal-header");
  if (vehicle) {
    modalHeader.innerHTML = "Edit Details";
  }
  else {
    modalHeader.innerHTML = "Add Details";
  }

  toggleDeleteButtonVisibility();
  debugger;
  // set up the data fields in the modal
  if (vehicle) {
    document.getElementById("modalDescription").value = vehicle["description"];
    document.getElementById("modalType").value = vehicle["type"];
    document.getElementById("modalYear").value = vehicle["year"];
    document.getElementById("modalMake").value = vehicle['make'];
    document.getElementById("modalModel").value = vehicle['model'];
    document.getElementById("modalAnnualVKT").value = vehicle['annualVKT'];
    document.getElementById("modalAnnualFuel").value = vehicle['annualFuel'];
    document.getElementById("modalFuelType").value = vehicle['fuelType'];
    var flexFuel = vehicle['flexFuel'];
    document.getElementById("modalFlexFuel").value = flexFuel; selectFlexFuel(flexFuel);
    document.getElementById("modalQuantity").value = vehicle['quantity'];
  }
}
 
// for data entry in modal
var selectedfueltype = "E10 Gasoline";

optionsForFueltype = [
  "Gasoline",
  "E10 Gasoline",
  "Diesel",
];

// fucntion to create the dropdown options for the fuel types
function openfuelOptions(){
  var select = document.getElementById("modalFuelType");
  select.style.display = "block";
  if (select.childElementCount==0) {
    createfuelOptions();
  }
}

// function to create the options for fuel type
function createfuelOptions() {
  // make E10 Gasoline as a default selected option
  optionsForFueltype.forEach((item) => {
    console.log(item);
    var option = document.createElement("li");
    option.classList.add("option");
    option.innerHTML = item;
    option.value = item;
    option.setAttribute("data-value", item);
    option.setAttribute("id", "modalFuelType");
    option.setAttribute("name", "modalFuelType");
    option.setAttribute("onclick", `updatefueltype('${item}')`); // Passing item here

    if (item === "E10 Gasoline") {
      option.selected = true;
    }
    document.getElementById("modalFuelType").appendChild(option);
  });
}
function updatefueltype(event) {
  selectedfueltype = document.getElementById("fueltypebtn").innerHTML = event;
  document.getElementById("modalFuelType").style.display = "none";
}

function openSettingsModal() {
  var modal = document.getElementById("settingsModal");
  var overlay = document.getElementById("overlay");
  modal.style.display = "flex";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling of main content
  document.getElementById("provinceBtn").innerHTML = selectedProvince;
  updateEmissionCoefficient(selectedProvince);
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
 
  var modal = document.getElementById("dataRowModal");
  var overlay = document.getElementById("overlay");
  if (validateInput()) {
    //addNewRowToTable();
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = ""; // Restore scrolling of main content
    //resetModalForm();
  }


 // Get input values from the modal
 const modalDescription = document.getElementById('modalDescription').value;
 const modalType = document.getElementById('modalType').value;
 const modalYear = document.getElementById('modalYear').value;
 const modalMake = document.getElementById('modalMake').value;
 const modalModel = document.getElementById('modalModel').value;
 const modalAnnualVKT = document.getElementById('modalAnnualVKT').value;
 const modalAnnualFuel = document.getElementById('modalAnnualFuel').value;
 const modalFuelType = document.getElementById('modalFuelType').value;
 const modalFlexFuel = document.getElementById('modalFlexFuel').value;
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
   vehicle.flexFuel= modalFlexFuel;
   vehicle.quantity=modalQuantity;

   updateRow(vehicle);
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
     flexFuel: modalFlexFuel,
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
  var vehicle = vehicles.find(v => v.id == id);
  if(!vehicle){
    sweetAlert("Vehicle not found", "error");
    throw new Error(`Vehicle ${id} not found`);
  }
   
  return vehicle;
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
  console.log(`Deleting vehicle ${selectedVehicleId} from datatable`)
  deleteRow();
  var vehicles = getFleetData();
  debugger;
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
        document.getElementById("modalFlexFuel").value= "Yes";
        document.getElementById("yes-button").classList.add('selected');
        document.getElementById("no-button").classList.remove('selected');
    } else {
        document.getElementById("modalFlexFuel").value = 'No';
        document.getElementById("modalFlexFuel").value= "No";
        document.getElementById("no-button").classList.add('selected');
        document.getElementById("yes-button").classList.remove('selected');
      }
}