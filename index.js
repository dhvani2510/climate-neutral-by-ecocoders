// code to display settings popup when icon is clied and close when clicked on smewhere else
function toggleSettings() {
  document.getElementById("popupBg").style.display = "block";
}
function closeSettings() {
  document.getElementById("popupBg").style.display = "none";

}
// if popup is opened and user clicks randomly on the scree, the popup should be closed
window.addEventListener("click") = function (event) {
  console.log(event.target);
  const popup = document.querySelector(".popupBg");
  if (event.target == popup) {
    popup.classList.remove("show");
  }
}

// Retrieve data from local storage or use an empty array
const storedData = JSON.parse(localStorage.getItem("fleetData")) || [];

// Initialize DataTable
const dataTable = $("#fleetTable").DataTable({
  data: storedData,
  columns: [
    { data: "id" },
    { data: "name" },
    { data: "vehicleType" },
    { data: "fuelType" },
  ],
});

// Function to add a new row
function addNewRow() {
  const newRow = {
    id: dataTable.data().count() + 1,
    name: prompt("Enter Name:"),
    vehicleType: prompt("Enter Vehicle Type:"),
    fuelType: prompt("Enter Fuel Type:"),
  };

  dataTable.row.add(newRow).draw();

  // Update the local storage data
  storedData.push(newRow);
  localStorage.setItem("fleetData", JSON.stringify(storedData));
}
