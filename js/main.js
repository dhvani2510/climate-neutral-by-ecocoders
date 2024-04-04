var fleetData = [];

var typeOptions = ["Car", "Light Duty Truck"];
var fuelOptions = ["Gasoline", "E1O Gasoline", "Diesel"];
var selectedVehicle = null;
window.onload = function() {
    fleetData = JSON.parse(localStorage.getItem("fleetData")) || [];
    createTypeOptions();
    createFuelOptions();
    if (fleetData.length != 0) {
        let tbody = document.getElementById("fleetTable").tBodies[0];
        for (let i = 0; i < fleetData.length; i++) {
            addRowToTable(tbody, fleetData[i]);
        }
    } else {
        addEmptyRow();
    }
};

function addEmptyRow() {
    const row = document.createElement('tr'),
        cell = document.createElement('td');
    row.classList.add('emptyRow');
    cell.setAttribute('colspan', '11');
    cell.textContent = 'No vehicles data added';
    row.appendChild(cell);
    document.querySelector('#fleetTable tbody').appendChild(row);
    document.getElementById("nextButton").disabled = true;
}

function addRowToTable(tbody, fleet) {
    let row = document.createElement("tr");
    row.setAttribute("data-id", fleet.id);
    createTdFor(row, "ID", fleet.id);
    createTdFor(row, "Description", fleet.description);
    createTdFor(row, "Type", fleet.type);
    createTdFor(row, "Year", fleet.year);
    createTdFor(row, "Make", fleet.make);
    createTdFor(row, "Model", fleet.model);
    createTdFor(row, "Annual VKT", fleet.annualVKT);
    createTdFor(row, "Annual Fuel", fleet.annualFuel);
    createTdFor(row, "Fuel Type", fleet.fuelType);
    createTdFor(row, "Flex Fuel", fleet.flexFuel);
    createTdFor(row, "Quantity", fleet.quantity);
    row.addEventListener("click", () => openDataModal(fleet));
    tbody.appendChild(row);
}

function createTdFor(row, fieldName, content) {
    let td = document.createElement("td");
    td.textContent = content;
    td.setAttribute("data-field", fieldName);
    row.appendChild(td);
}

function openDataModal(vehicleData) {
    const showDelete = Boolean(vehicleData);
    let isValidated = false;
    selectedVehicle = vehicleData ? vehicleData.id : null;
    document.getElementById("data-modal-header").textContent = showDelete ? "Edit Vehicle" : "Add Vehicle";
    resetForm(vehicleData);
    document.getElementById("dataRowModal").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("deleteButton").style.display = showDelete ? "block" : "none";
    isValidated ? document.getElementById("vehicle_modal_submit_button").classList.remove("disabled") : document.getElementById("vehicle_modal_submit_button").classList.add("disabled");
    // remove error or valid classes
    const inputElements = document.querySelectorAll(".input-field");
    inputElements.forEach((input) => {
        if (input.classList.contains("error")) {
            input.classList.remove("error");
        }
        if (input.classList.contains("valid")) {
            input.classList.remove("valid");
        }
    });
    const flexfuel = document.getElementById("flexfuel");
    if (flexfuel.classList.contains("error")) {
        flexfuel.classList.remove("error");
    }
    if (flexfuel.classList.contains("valid")) {
        flexfuel.classList.remove("valid");
    }
}


function closeModal() {
    document.getElementById("dataRowModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function openTypeOptions() {
    document.getElementById("typeOptionsDiv").style.display = "inline-block";
}

function createTypeOptions() {
    const selectElement = document.getElementById("typeOptionsDiv");
    typeOptions.forEach((type) => {
        var option = document.createElement("li");
        option.classList.add("option");
        option.innerHTML = type;
        option.value = typeOptions.findIndex((t) => t === type);
        option.setAttribute("data-value", type);
        option.setAttribute("onclick", `updateType('${type}')`); // Passing item here
        selectElement.appendChild(option);
    });
}

function updateType(selectedOption) {
    document.getElementById("typeOptionsDiv").style.display = "none";
    document.getElementById("modalType").innerHTML = selectedOption;
}

function resetForm(vehicle) {
    const description = vehicle && vehicle.description || "";
    const type = vehicle && vehicle.type || "";
    const year = vehicle && vehicle.year || "";
    const make = vehicle && vehicle.make || "";
    const model = vehicle && vehicle.model || "";
    const annualVKT = vehicle && vehicle.annualVKT || "";
    const annualFuel = vehicle && vehicle.annualFuel || "";
    const fuelType = vehicle && vehicle.fuelType || "";
    const flexFuel = vehicle && vehicle.flexFuel || "";
    const quantity = vehicle && vehicle.quantity || "";

    document.getElementById("modalDescription").value = description;
    document.getElementById("modalType").innerHTML = type;
    document.getElementById("modalYear").value = year;
    document.getElementById("modalMake").value = make;
    document.getElementById("modalModel").value = model;
    document.getElementById("modalAnnualVKT").value = annualVKT;
    document.getElementById("modalAnnualFuel").value = annualFuel;
    document.getElementById("modalFuelType").innerHTML = fuelType;
    document.getElementById("modalFlexFuel").value = flexFuel;
    if (flexFuel == "Yes") {
        document.getElementById("yes-button").classList.add("selected");
        document.getElementById("no-button").classList.remove("selected");
    } else {
        document.getElementById("no-button").classList.add("selected");
        document.getElementById("yes-button").classList.remove("selected");
    }
    document.getElementById("modalQuantity").value = quantity;

    document.querySelectorAll(".options").forEach(option =>
        option.style.display = "none");
}


function openFuelOptions() {
    document.getElementById("fuelOptionsDiv").style.display = "inline-block";
}

function createFuelOptions() {
    const selectElement = document.getElementById("fuelOptionsDiv");
    fuelOptions.forEach((type) => {
        var option = document.createElement("li");
        option.classList.add("option");
        option.innerHTML = type;
        option.value = fuelOptions.findIndex((t) => t === type);
        option.setAttribute("data-value", type);
        option.setAttribute("onclick", `updateFuel('${type}')`); // Passing item here
        selectElement.appendChild(option);
    });
}

function updateFuel(selectedOption) {
    document.getElementById("fuelOptionsDiv").style.display = "none";
    document.getElementById("modalFuelType").innerHTML = selectedOption;
}

function selectFlexFuel(flexValue) {
    if (flexValue == "Yes") {
        document.getElementById("yes-button").classList.add("selected");
        document.getElementById("no-button").classList.remove("selected");
    } else {
        document.getElementById("no-button").classList.add("selected");
        document.getElementById("yes-button").classList.remove("selected");
    }
    document.getElementById("modalFlexFuel").value = flexValue;
}

function validateData() {
    const description = document.getElementById("modalDescription").value;
    const type = document.getElementById("modalType").innerHTML;
    const year = document.getElementById("modalYear").value;
    const make = document.getElementById("modalMake").value;
    const model = document.getElementById("modalModel").value;
    const annualVKT = document.getElementById("modalAnnualVKT").value;
    const annualFuel = document.getElementById("modalAnnualFuel").value;
    const fuelType = document.getElementById("modalFuelType").innerHTML;
    const flexFuel = document.getElementById("modalFlexFuel").value;
    const quantity = document.getElementById("modalQuantity").value;

    // description, make and model should be alphanumeric with space and hypens only
    const re = /^[a-zA-Z0-9\s-]*$/;
    let validated = true;
    if (description && re.test(description)) {
        document.getElementById("modalDescription").classList.add("valid");
        document.getElementById("modalDescription").classList.remove("error");
    } else {
        document.getElementById("modalDescription").classList.add("error");
        document.getElementById("modalDescription").classList.remove("valid");
        validated = false;
    }

    if (type) {
        document.getElementById("type").classList.add("valid");
        document.getElementById("type").classList.remove("error");
    } else {
        document.getElementById("type").classList.add("error");
        document.getElementById("type").classList.remove("valid");
        validated = false;
    }

    if (make && re.test(make)) {
        document.getElementById("modalMake").classList.add("valid");
        document.getElementById("modalMake").classList.remove("error");
    } else {
        document.getElementById("modalMake").classList.add("error");
        document.getElementById("modalMake").classList.remove("valid");
        validated = false;
    }
    if (model && re.test(model)) {
        document.getElementById("modalModel").classList.add("valid");
        document.getElementById("modalModel").classList.remove("error");
    } else {
        document.getElementById("modalModel").classList.add("error");
        document.getElementById("modalModel").classList.remove("valid");
        validated = false;
    }

    if (year && (year >= 1990 && year <= 2025)) {
        document.getElementById("modalYear").classList.add("valid");
        document.getElementById("modalYear").classList.remove("error");
    } else {
        document.getElementById("modalYear").classList.add("error");
        document.getElementById("modalYear").classList.remove("valid");
        validated = false;
    }

    if (annualVKT && (annualVKT >= 1 && annualVKT <= 1000000)) {
        document.getElementById("modalAnnualVKT").classList.add("valid");
        document.getElementById("modalAnnualVKT").classList.remove("error");
    } else {
        document.getElementById("modalAnnualVKT").classList.add("error");
        document.getElementById("modalAnnualVKT").classList.remove("valid");
        validated = false;
    }

    if (annualFuel && (annualFuel >= 1 && annualFuel <= 1000000)) {
        document.getElementById("modalAnnualFuel").classList.add("valid");
        document.getElementById("modalAnnualFuel").classList.remove("error");
    } else {
        document.getElementById("modalAnnualFuel").classList.add("error");
        document.getElementById("modalAnnualFuel").classList.remove("valid");
        validated = false;
    }

    if (fuelType) {
        document.getElementById("fueltype").classList.add("valid");
        document.getElementById("fueltype").classList.remove("error");
    } else {
        document.getElementById("fueltype").classList.add("error");
        document.getElementById("fueltype").classList.remove("valid");
        validated = false;
    }

    if (flexFuel) {
        document.getElementById("flexfuel").classList.add("valid");
        document.getElementById("flexfuel").classList.remove("error");
    } else {
        document.getElementById("flexfuel").classList.add("error");
        document.getElementById("flexfuel").classList.remove("valid");
        validated = false;
    }

    if (quantity && (quantity >= 1 && quantity <= 100)) {
        document.getElementById("modalQuantity").classList.add("valid");
        document.getElementById("modalQuantity").classList.remove("error");
    } else {
        document.getElementById("modalQuantity").classList.add("error");
        document.getElementById("modalQuantity").classList.remove("valid");
        validated = false;
    }

    if (!validated) {
        document.getElementById("vehicle_modal_submit_button").classList.add("disabled");
    } else {
        document.getElementById("vehicle_modal_submit_button").classList.remove("disabled");
    }

    return validated;
}

function submitData() {
    const isValidated = validateData();
    const editing = Boolean(selectedVehicle);

    if (isValidated) {
        // add data to table
        const fleet = {
            id: fleetData.length == 0 ? 1 : fleetData[fleetData.length - 1].id + 1,
            description: document.getElementById("modalDescription").value,
            type: document.getElementById("modalType").innerHTML,
            year: document.getElementById("modalYear").value,
            make: document.getElementById("modalMake").value,
            model: document.getElementById("modalModel").value,
            annualVKT: document.getElementById("modalAnnualVKT").value,
            annualFuel: document.getElementById("modalAnnualFuel").value,
            fuelType: document.getElementById("modalFuelType").innerHTML,
            flexFuel: document.getElementById("modalFlexFuel").value,
            quantity: document.getElementById("modalQuantity").value
        }

        if (editing) {
            const index = fleetData.findIndex(vehicle => vehicle.id === selectedVehicle);
            fleet.id = index + 1;
            fleetData[index] = fleet;
            // update the tr for the record
            const tr = document.querySelector(`tr[data-id="${selectedVehicle}"]`);
            populateRow(fleet, tr);
            vehicleadded(`Vehicle updated successfully!!`, "success", 1000);
        } else {
            fleetData.push(fleet);
            const tbody = document.getElementById("fleetTable").tBodies[0];
            addRowToTable(tbody, fleet);
            vehicleadded(`Vehicle added successfully!!`, "success", 1000);
        }
        localStorage.setItem("fleetData", JSON.stringify(fleetData));
        document.querySelector('.emptyRow') ? document.querySelector('.emptyRow').remove() : null;
        document.getElementById("nextButton").disabled = false;
        closeModal();
    } else {
        return;
    }
}

function populateRow(fleet, tr) {
    tr.innerHTML = `
        <td>${fleet.id}</td>
        <td>${fleet.description}</td>
        <td>${fleet.type}</td>
        <td>${fleet.year}</td>
        <td>${fleet.make}</td>
        <td>${fleet.model}</td>
        <td>${fleet.annualVKT}</td>
        <td>${fleet.annualFuel}</td>
        <td>${fleet.fuelType}</td>
        <td>${fleet.flexFuel}</td>
        <td>${fleet.quantity}</td>
    `;
}

function deleteVehicle() {
    var vehicle = fleetData.find(vehicle => vehicle.id == selectedVehicle);
    confirmation(deleteVehicleCallBack)
}


function deleteVehicleCallBack() {
    deleteRow();
    fleetData = deleteObjectFromArray(fleetData, 'id', selectedVehicle)
    localStorage.setItem('fleetData', JSON.stringify(fleetData));
    console.log("Deleted vehicle from localstorage");
    closeModal();
    vehicledeleted("Vehicle deleted successfully", "success", 1000);
}

function deleteRow() {
    var tr = document.querySelector(`tr[data-id="${selectedVehicle}"]`);
    tr.remove();
}


function deleteObjectFromArray(array, property, value) {
    const index = array.findIndex(obj => obj[property] === value);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}




const search = document.querySelector('.input-group input');
search.addEventListener('input', searchTable);
const table_headings = document.querySelectorAll('thead th');

function searchTable() {
    const rows = document.querySelectorAll('tbody tr'),
        searchTerm = search.value.toLowerCase();

    rows.forEach((row, index) => {
        const rowText = row.textContent.toLowerCase();
        row.classList.toggle('hide', rowText.indexOf(searchTerm) < 0);
        row.style.setProperty('--delay', index / 25 + 's');
    });
}

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})

function sortTable(column, sort_asc) {
    const table_rows = document.querySelectorAll('tbody tr');

    [...table_rows].sort((a, b) => {
            let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
                second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

            return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
        })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}


const csv_btn = document.querySelector('#downloadCSVBtn');

const toCSV = function(table) {
    const t_heads = table.querySelectorAll('th'),
        tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join(',') + ',' + 'image name';

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(',');
        return data_without_img;
    }).join('\n');

    return headings + '\n' + table_data;
}

csv_btn.onclick = () => {
    const customers_table = document.querySelector('#fleetTable');
    const csv = toCSV(customers_table);
    downloadFile(csv, 'csv', 'fleet vehicles');
}

const downloadFile = function(data, fileType, fileName = '') {
    const a = document.createElement('a');
    a.download = fileName;
    const mime_types = {
        'json': 'application/json',
        'csv': 'text/csv',
        'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

// Function to handle CSV file upload
function handleImport(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // Event listener for when the file is loaded
    reader.onload = function(e) {
        const contents = e.target.result;
        processCSV(contents);
    };
    // Read the file as text
    reader.readAsText(file);
}

function processCSV(contents) {
    const data = contents.split('\n').slice(1);
    data.forEach(row => {
        if (row.trim() === '') return;
        var [id, description, type, year, make, model, annualVKT, annualFuel, fuelType, flexFuel, quantity] = row.split(',').map(x => x.trim());

        // Check if any field is empty
        if (!description || !type || !year || !make || !model || !annualVKT || !annualFuel || !fuelType || !flexFuel || !quantity) {
            console.log('Skipping row: Missing data');
            return;
        }
        // Check if the vehicle already exists in stored data
        const existingVehicle = fleetData.find(vehicle => vehicle.description === description && vehicle.type === type && vehicle.year === year && vehicle.make === make && vehicle.model === model);
        if (existingVehicle) {
            existingVehicle.annualVKT = annualVKT;
            existingVehicle.annualFuel = annualFuel;
            existingVehicle.fuelType = fuelType;
            existingVehicle.flexFuel = flexFuel;
            existingVehicle.quantity = quantity;
            console.log(existingVehicle);
            populateRow(existingVehicle, document.querySelector(`tr[data-id="${existingVehicle.id}"]`));
        } else {
            // Add the new vehicle to the fleetData array
            var fleet = {
                id: fleetData.length == 0 ? 1 : fleetData[fleetData.length - 1].id + 1,
                description: description,
                type: type,
                year: year,
                make: make,
                model: model,
                annualVKT: annualVKT,
                annualFuel: annualFuel,
                fuelType: fuelType,
                flexFuel: flexFuel,
                quantity: quantity
            };
            addRowToTable(document.querySelector('tbody'), fleet)
            fleetData.push(fleet);
        }
    });
    // remove if emptyRow
    const emptyRow = document.querySelector('.emptyRow');
    if (emptyRow !== null && fleetData.length != 0) emptyRow.remove();
    document.getElementById("nextButton").disabled = false;
    localStorage.setItem("fleetData", JSON.stringify(fleetData));
}

function openImportModal() {
    document.getElementById("importFile").click();
}

document.getElementById('importFile').addEventListener('change', handleImport);

// Event listener for previous button if it exists
if (document.getElementById("prevButton")) {
    document.getElementById("prevButton").addEventListener("click", function() {
        window.location.href = "/landing.html"
    });
}


// Event listener for next button
if (document.getElementById("nextButton")) {
    document.getElementById("nextButton").addEventListener("click", function() {
        if (fleetData.length > 0) {
            localStorage.setItem("page", "current-emissions")
            window.location.href = '/loading.html';
        }
    });
}