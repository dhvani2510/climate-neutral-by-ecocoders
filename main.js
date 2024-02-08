
  function convertToFleetArray(originalData) {
    return originalData.map(vehicle => [
        vehicle["description"],
        vehicle["type"],
        vehicle["year"],
        vehicle["make"],
        vehicle["model"],
        vehicle["annualVKT"],
        vehicle["annualFuel"],
        vehicle["fuelType"],
        yesOrNo(vehicle["flexFuel"]),
        vehicle["quantity"],
        vehicle["id"]
    ]);
  }

function yesOrNo(trueOrFalse) {
    return trueOrFalse ? 'Yes' : 'No';
}

var selectedVehicleId=null;

function addVehicle()
{
  selectedVehicleId=null;
  //TODO empty all the inputs
  openModal();
}

function editVehicle(id)
{
 selectedVehicleId= id;
 console.log("Editing vehicle");
 var vehicle= getVehicleById(id);
 if(!vehicle){
  //console.error("Vehicle not found");
  throw new Error('Vehicle not found"');
 }
 
 document.getElementById('modalDescription').value= vehicle.description;
 document.getElementById('modalType').value=vehicle.type;
 document.getElementById('modalYear').value= vehicle.year;
 document.getElementById('modalMake').value= vehicle.make;
 document.getElementById('modalModel').value= vehicle.model;
 document.getElementById('modalAnnualVKT').value= vehicle.annualVKT;
 document.getElementById('modalAnnualFuel').value= vehicle.annualFuel;
 document.getElementById('modalFuelType').value= vehicle.fuelType;
 document.getElementById('modalFlexFuel').value= vehicle.flexFuel;
 document.getElementById('modalQuantity').value= vehicle.quantity;

 openModal();  
}

function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

// This function gets the fleet data from local storage
function getFleetData()
{
console.log("Getting data from local storage");
const storedData = JSON.parse(localStorage.getItem('fleetData')) || [];
console.log(`${storedData.length} record(s) found`);
return storedData;
}

function getFleetDataGridFormat()
{
var fleetData = getFleetData();
var convertedFleetData = convertToFleetArray(fleetData);
return convertedFleetData;
}

function getVehicleById(id) {
  // Validation: Check if id is a valid integer
  if (!Number.isInteger(id)) {
      throw new Error('Invalid id: must be an integer');
  }

  var vehicles = getFleetData();
  return vehicles.find(v => v.id == id);
}

function stringToBool(str) {
  // Convert string to lowercase for case-insensitive comparison
  str = str.toLowerCase();

  // Check if the string is "true" or "false" and return the corresponding boolean value
  if (str === "true") {
      return true;
  } else if (str === "false") {
      return false;
  } else {
      // Handle cases where the string is neither "true" nor "false"
      throw new Error("Invalid input: String must be 'true' or 'false'");
  }
}
  
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
  const modalFlexFuel = document.getElementById('modalFlexFuel').value;
  const modalQuantity = document.getElementById('modalQuantity').value;

  var storedData = getFleetData();
  // Validate and add new row
 
  if(selectedVehicleId) // Thi means a vehicle is being edited
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
  }

  localStorage.setItem('fleetData', JSON.stringify(storedData)); // Update the local storage data
  updateDataGrid();
  sweetAlert(`Vehicle ${selectedVehicleId? "updated": "added"} successfully`, "success",3000);
  // Close the modal after submission
  closeModal();
}

function submitDataWithValidations() {
  // Get input values from the modal
  const modalDescription = document.getElementById('modalDescription').value.trim();
  const modalType = document.getElementById('modalType').value.trim();
  const modalYear = parseInt(document.getElementById('modalYear').value, 10);
  const modalMake = document.getElementById('modalMake').value.trim();
  const modalModel = document.getElementById('modalModel').value.trim();
  const modalAnnualVKT = parseInt(document.getElementById('modalAnnualVKT').value, 10);
  const modalAnnualFuel = parseInt(document.getElementById('modalAnnualFuel').value, 10);
  const modalFuelType = document.getElementById('modalFuelType').value.trim();
  const modalFlexFuel = document.getElementById('modalFlexFuel').value.trim();
  const modalQuantity = parseInt(document.getElementById('modalQuantity').value, 10);

  // Validate each field
  if (!modalDescription || !modalType || isNaN(modalYear) || !modalMake || !modalModel ||
      isNaN(modalAnnualVKT) || isNaN(modalAnnualFuel) || !modalFuelType || !modalFlexFuel ||
      isNaN(modalQuantity)) {
      alert('Please fill in all fields with valid values.');
      return;
  }

  // Additional specific validations can be added as needed

  // Validate and add new row
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
  fleetTable.updateConfig({ data: storedData }).forceRender();

  // Update the local storage data
  localStorage.setItem('fleetData', JSON.stringify(storedData));

  // Close the modal after submission
  closeModal();
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
  var vehicles = getFleetData();
  var updated_vehicles= deleteObjectFromArray(vehicles, 'id', 2)
  localStorage.setItem('fleetData', JSON.stringify(updated_vehicles));
  updateDataGrid();
  sweetAlert("Vehicle deleted successfully","success",3000 );
}

function updateDataGrid()
{
  console.log("Updating data table");
  var fleetDataGridFormat = getFleetDataGridFormat();
  fleetTable.updateConfig({ data: fleetDataGridFormat }).forceRender();
}
function deleteVehicle(id)
{
   selectedVehicleId= id;
   var vehicle = getVehicleById(id);
   confirmation(deleteVehicleCallBack)
}

function sweetAlert(title, icon="success", timer=0){
  Swal.fire({
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer
  });
}

function confirmation(callback){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#26b170", // "#3085d6",
    cancelButtonColor: "#0c1c81",//"#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}


module.exports = {
  getFleetData,
  getFleetDataGridFormat,
  getVehicleById,
  convertToFleetArray
}

// export default{  
//   getFleetData,
//   getFleetDataGridFormat,
//   getVehicleById,
//   convertToFleetArray
// }
