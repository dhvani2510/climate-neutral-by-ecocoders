
//This will help with the unit test
// const { getFleetData } = typeof test === 'function' ? require('./index') : {}; 
var fleetData = getFleetData();

const greenOptions = [
    { id: 1, option: "Replace with EV Vehicle" },
    { id: 2, option: "Right-size to smaller vehicle" },
    { id: 3, option: "E85 Ethanol Usage" },
    { id: 4, option: "B20 Biodiesel Usage" },
    { id: 5, option: "Replace with Biofuel car" },
    { id: 6, option: "Replace with Biofuel Truck" },
    { id: 7, option: "Nothing" }

    // { id: 7, option: "Replace with Biofuel Car E85" },
    // { id: 8, option: "Replace with EV Light Duty Truck" },
    // { id: 9, option: "Replace with Biofuel E85 Light Duty Truck" },
    // { id: 10, option: "Right Size to Car" },
    // { id: 11, option: "Right Size to Biofuel Car" },
    // { id: 12, option: "Right Size to Biofuel E85 Car" },
    // { id: 13, option: "E85 Biofuel Usage" },
    // { id: 14, option: "B20 Diesel Usage" },
    // { id: 15, option: "Replace with EV Car" },
    // { id: 16, option: "Nothing" }
];

// Call the function to populate the container
populateContainer();

evauateGreenOpitions();
 
// Function to get the fleet data from local storage
function evauateGreenOpitions() {
    fleetData.forEach(item => {
        let possibleOptions = getGreenOptions(item);
        item['possibleOptions'] = possibleOptions.map(option => option.option);
    });
    localStorage.setItem('fleetData', JSON.stringify(fleetData));
    console.log(fleetData);
}
 
// Function to populate the container with data
function populateContainer() {
    const container = document.querySelector("#dynamic-divs");
    fleetData.forEach(item => {
        item['selectedOption'] = "";
        // Create divs for each item
        const div = document.createElement("div");
        div.classList.add("vehicle-item");
        // Add 2 side by side divs of equal width for the description and options
        let descDiv = createDescriptionDiv(item);
        let optionsDiv = createOptionsDiv(item);
        div.appendChild(descDiv);
        div.appendChild(optionsDiv);
        container.appendChild(div);
 
        // the options div should only be visible when either the row is hovered or clicked
        div.addEventListener("mouseover", () => {
                optionsDiv.classList.remove('hidden');                
        });
        div.addEventListener("mouseleave", () => {
            if(item['selectedOption'] == "" || item['selectedOption'] == "Select option") {
                optionsDiv.classList.add('hidden');
            }
            document.getElementById('select-list-'+item['id']).classList.add('hidden');
        });
    });
}
 
// Function to create the description div
function createDescriptionDiv(item) {
    const descDiv = document.createElement("div");
    descDiv.classList.add("description");
    descDiv.textContent = item['description'] + " - " + item['type'] + " - " +
        item['year'] + " - " + item['make'] + " - " + item['model'];
    return descDiv;
}
 
 
// Function to create the options div
function createOptionsDiv(item) {
    console.log(item);
    const optionsDiv = document.createElement("div");
    // Add class
    optionsDiv.classList.add("vehicle-green-options");
    optionsDiv.classList.add('hidden');
    // Add id
    optionsDiv.setAttribute("id", "options-"+item['id']);
    // create a button
    const button = document.createElement("button");
    button.classList.add("vehicle-list-button");
    button.setAttribute("id", "button-"+item['id']);
    button.innerHTML = item['selectedOption'] == "" ? "Select option" : item['selectedOption'];
    optionsDiv.appendChild(button);
 
    const selectList = createOptionsList(item);
    selectList.classList.add("select-list");
    selectList.classList.add("hidden");
    optionsDiv.appendChild(selectList);
 
    // create a div that shows a down arrow in a circle
    const arrow = document.createElement("button");
    arrow.classList.add("select-arrow","white");
    a = document.createElement('i')
    a.classList.add("fas", "fa-chevron-down");
    arrow.appendChild(a);
    optionsDiv.appendChild(arrow);
   
     // add click event listener to button and optionsDiv
     const toggleOptions = () => {
        selectList.classList.toggle("hidden");
    };
    const hideOptions = () => {
        selectList.classList.add("hidden");
    }
 
    button.addEventListener("click", toggleOptions);
    optionsDiv.addEventListener('mouseout', hideOptions());
 
    selectList.addEventListener('mouse', (event) => {
        if(event.target.tagName == "LI"){
            button.innerHTML = event.target.textContent;
            selectList.classList.add('hidden');
        }
    });
 
   
    return optionsDiv;
}
 
 
 
// function to create the options list
function createOptionsList(item) {
    options = getGreenOptions(item);
    options = options.map(option => option.option);
    fleetData.filter(x => x['id'] == item['id'])['possibleOptions'] = [];
    fleetData.filter(x => x['id'] == item['id'])['possibleOptions'] = options;
    const selectList = document.createElement("div");
    selectList.id = "select-list-" + item['id'];
    selectList.classList.add("select-list");
    selectList.classList.add("hidden");
    options.forEach(option => {
        const optionElem = document.createElement("div");
        optionElem.textContent = option;
        optionElem.value = option;
        optionElem.setAttribute("onclick", `updateGreenFleetOption('${item['id']}','${option}')`);
        selectList.appendChild(optionElem);
    });
    return selectList;
}
 
function updateGreenFleetOption(item, option) {
    let i = fleetData.find(x => x['id'] == item);
    i['selectedOption'] = document.querySelector('#button-'+item).textContent = option;
    document.getElementById('select-list-'+item).classList.add('hidden');
}

function getGreenOptionById(id)
{
    var value= greenOptions.find(option => option.id === id);
    if(!value)
    {
        console.error(`Green option ${id} not found`);
        return null;
    }
    return value;
}

function getGreenOptions(vehicle) {
    const selectedGreenOptions = [];

    greenOptions.forEach(option => {
        const { id } = option;
        const { type, flexFuel, fuelType } = vehicle;

        if (
            // (type === "Car" && flexFuel === "Yes" && fuelType === "Gasoline" && (id === 1 || id === 3 || id === 16)) ||
            // (type === "Car" && flexFuel === "No" && fuelType === "Gasoline" && (id === 7 || id === 15 || id === 16)) ||
            // (type === "Light Duty Truck" && flexFuel === "No" && fuelType === "Gasoline" && (id === 8 || id === 9 || id === 10 || id === 11 || id === 16)) ||
            // (type === "Light Duty Truck" && flexFuel === "Yes" && fuelType === "Gasoline" && (id === 3 || id === 8 || id === 10 || id === 11 || id === 16)) ||
            // (type === "Light Duty Truck" && flexFuel === "No" && fuelType === "Diesel" && (id === 8 || id === 9 || id === 10 || id === 12 || id === 16)) ||
            // (type === "Light Duty Truck" && flexFuel === "Yes" && fuelType === "Diesel" && (id === 14 || id === 8 || id === 9 || id === 10 || id === 12 || id === 16))

            (type === "Car" && flexFuel === "Yes" && fuelType === "Gasoline" && (id === 1 || id === 3 || id === 7)) ||
            (type === "Car" && flexFuel === "No" && fuelType === "Gasoline" && (id === 5 || id === 1 || id === 7)) ||
            (type === "Light Duty Truck" && flexFuel === "No" && fuelType === "Gasoline" && (id === 1 || id === 6 || id === 2 || id === 2 || id === 7)) ||
            (type === "Light Duty Truck" && flexFuel === "Yes" && fuelType === "Gasoline" && (id === 3 || id === 1 || id === 2 || id === 2 || id === 7)) ||
            (type === "Light Duty Truck" && flexFuel === "No" && fuelType === "Diesel" && (id === 1 || id === 6 || id === 2 || id === 2 || id === 7)) ||
            (type === "Light Duty Truck" && flexFuel === "Yes" && fuelType === "Diesel" && (id === 4 || id === 1 || id === 6 || id === 2 || id === 2 || id === 7))
        ) {
            var value= greenOptions.find(option => option.id === id)
            selectedGreenOptions.push(value); 
        }
        
    });
    if(selectedGreenOptions.length == 0) {
        var value= greenOptions.find(option => option.id === 7)
        selectedGreenOptions.push(value); 
    }

    return selectedGreenOptions;
}

function goToActionSavings() {
    console.log(fleetData);
    if( fleetData.some(x => x['selectedOption'] == "") )
    {
        console.error("Please select all green options");
        return;
    }
    localStorage.setItem('fleetData', JSON.stringify(fleetData)); // Update the local storage data
    localStorage.setItem("next", "individualsavings.html");
    window.location.href = "loading.html";
}

function goToUserInputPage() {
    localStorage.setItem('fleetData', JSON.stringify(fleetData)); // Update the local storage data
    window.location.href = "/main.html";
}

if (typeof test === 'function'){
  
    module.exports = {
        evauateGreenOpitions,
        populateContainer,
        createDescriptionDiv,
        createOptionsDiv,
        createOptionsList,
        updateGreenFleetOption,
        getGreenOptionById,
        getGreenOptions,
        goToActionSavings
    };
}