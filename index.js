// variable to store all the data
const fleetData = [];

optionsForProvinces = [
    'Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland and Labrador',
    'Nova Scotia','Ontario','Prince Edward Island','Quebec','Saskatchewan',
    'Northwest Territories','Nunavut','Yukon'
]

function createOptions() {
    // make Ontario as a default selected option
    optionsForProvinces.forEach((item)=>{
        var option = document.createElement('option');
        option.value = item;
        option.text = item;
        if(item === 'Ontario') {
            option.selected = true;
        }
        document.getElementById('provinceSelect').appendChild(option);
    })    
}

window.onload = createTable;

function createTable() {
    createHeaderRow();
    if (fleetData.length === 0) {
        createEmptyTableRow();
    } else {
        createTableRows();
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

function createTableRows() {
    var table = document.getElementById('myTable')
    fleetData.forEach(fleet => {
        createRow(fleet) 
    });
}


function yesOrNo(value) {
    console.log(value);
    if(value === 'Yes') {
        return 'True';
    } else {
        return 'False';
    }
}

function createRow(fleet) {
    var table = document.getElementById("myTable");
    // delete empty row if exists
    var emptyRow = document.getElementById("emptyRow");
    if (emptyRow) {
        emptyRow.remove();
    }
    var rowRecord = Object.values(fleet)
    var tbody = table.tBodies[0];
    let row = tbody.insertRow(-1);
    for(let i = 0; i < rowRecord.length; i++) {
        let cell = row.insertCell(-1);
        cell.innerHTML = rowRecord[i];
    }
    // add a onclick function
    row.onclick = function() {
        console.log(fleet);
        openModalToAddRow(fleet);
        console.log(row);
    }
}
