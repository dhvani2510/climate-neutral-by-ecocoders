// modal opeing at setup for adding a row
// function to open modal for adding a row at setup
function openModalToAddRow(fleet) {
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
  document.getElementById("modalFlexFuel").value = "";
  document.getElementById("modalQuantity").value = "";
}
 
// Function to handle submit button on click event
function submitData() {
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
 
// function to validate input
function validateInput() {
  console.log("Validating input");
  return true;
}
 
document.getElementById('dataRowModal').addEventListener('input', function(event) {
  const input = event.target;
});
 
function addNewRowToTable()  {
  console.log("Adding new row to table");
  console.log(document.getElementById("modalDescription").value);
  let fleet ={
    description: document.getElementById("modalDescription").value,
    type: document.getElementById("modalType").value,
    year: document.getElementById("modalYear").value,
    make: document.getElementById("modalMake").value,
    model: document.getElementById("modalModel").value,
    vkt: document.getElementById("modalAnnualVKT").value,
    fuel_used: document.getElementById("modalAnnualFuel").value,
    fuel_type: document.getElementById("modalFuelType").value,
    flex_fuel: yesOrNo(document.getElementById("modalFlexFuel").value),
    quantity: document.getElementById("modalQuantity").value
  }
  fleetData.push(fleet);
  createRow(fleet);
}