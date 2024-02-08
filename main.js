
  function convertToFleetArray(originalData) {
    return originalData.map(vehicle => [
        vehicle["Description"],
        vehicle["Type"],
        vehicle["Year"],
        vehicle["Make"],
        vehicle["Model"],
        vehicle["Annual VKT"],
        vehicle["Annual Fuel"],
        vehicle["Fuel Type"],
        yesOrNo(vehicle["Flex Fuel"]),
        vehicle["Quantity"]
    ]);
  }

function yesOrNo(trueOrFalse) {
    return trueOrFalse ? 'Yes' : 'No';
}

// This only used for running under development
function addDummyData() {
    var fleetData = [
        {
            "Description": "Vehicle 1",
            "Type": "Sedan",
            "Year": 2020,
            "Make": "Toyota",
            "Model": "Camry",
            "Annual VKT": 12000,
            "Annual Fuel": 500,
            "Fuel Type": "Gasoline",
            "Flex Fuel": false,
            "Quantity": 1
        },
        {
            "Description": "Vehicle 2",
            "Type": "SUV",
            "Year": 2018,
            "Make": "Honda",
            "Model": "CR-V",
            "Annual VKT": 15000,
            "Annual Fuel": 600,
            "Fuel Type": "Gasoline",
            "Flex Fuel": true,
            "Quantity": 2
        },
        {
            "Description": "Truck",
            "Type": "Pickup",
            "Year": 2022,
            "Make": "Ford",
            "Model": "F-150",
            "Annual VKT": 18000,
            "Annual Fuel": 800,
            "Fuel Type": "Diesel",
            "Flex Fuel": false,
            "Quantity": 1
        }
    ];


    //var convertedFleetData = convertToFleetArray(fleetData);
    localStorage.setItem('fleetData', JSON.stringify(fleetData));
}

var fleetTable;
(function () {
    console.log("Greener Fleet App is running");

    const storedData = getFleetDataGridFormat();

    console.log("Initializing Grid.js");
    var div= document.getElementById("fleetTable");
    console.log("The element is ", div);

        fleetTable = new gridjs.Grid({
        columns: [
            'Description', 'Type', 'Year', 'Make', 'Model',
            'Annual VKT', 'Annual Fuel', 'Fuel Type', 'Flex Fuel', 'Quantity',
            { 
                name: 'Actions',
                formatter: (cell, row) => {

                var deleteButton = gridjs.h('button', {
                    //className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                    className: 'button_sm green',
                    onClick: () => confirmation(null)
                }, 'Delete');
                var editButton =  gridjs.h('button', {
                    //className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                    className: 'button_sm green',
                    onClick: () => alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                }, 'Edit');
                    
                return [editButton, deleteButton];
                }
            },
        ],
        data: storedData,
        pagination: true,
        search: true,
        sort: true,
        style: {
            table: {
                
            border: '3px solid #ccc',
            //'background-color': '#0c1c81',
            },
            th: {
            //'background-color': 'rgba(0, 0, 0, 0.1)',
            'background-color': '#0c1c81',
            //color: '#000',
            color: 'white',
            'border-bottom': '3px solid #ccc',
            'text-align': 'center'
            },
            td: {
            'text-align': 'center',
            //'background-color': '#0c1c81',
            //color: 'white',
            }
        }
    })
    .render(div);

})();


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
debugger;
return convertedFleetData;
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
      // (similar to the addNewRow function, use the input values)
      const newRow = {
          id: storedData.length + 1,
          Description: modalDescription,
          Type: modalType,
          Year: modalYear,
          Make: modalMake,
          Model: modalModel,
          'Annual VKT': modalAnnualVKT,
          'Annual Fuel': modalAnnualFuel,
          'Fuel Type': modalFuelType,
          'Flex Fuel': modalFlexFuel,
          Quantity: modalQuantity
      };
  
      storedData.push(newRow);
        // Update the local storage data
      localStorage.setItem('fleetData', JSON.stringify(storedData));
      var fleetDataGridFormat = getFleetDataGridFormat();
      fleetTable.updateConfig({ data: fleetDataGridFormat }).forceRender();
  
    
      sweetAlert("Vehicle added successfully", "success",3000);
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
        Description: modalDescription,
        Type: modalType,
        Year: modalYear,
        Make: modalMake,
        Model: modalModel,
        'Annual VKT': modalAnnualVKT,
        'Annual Fuel': modalAnnualFuel,
        'Fuel Type': modalFuelType,
        'Flex Fuel': modalFlexFuel,
        Quantity: modalQuantity
    };
  
    storedData.push(newRow);
    fleetTable.updateConfig({ data: storedData }).forceRender();
  
    // Update the local storage data
    localStorage.setItem('fleetData', JSON.stringify(storedData));
  
    // Close the modal after submission
    closeModal();
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
        //callback();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }