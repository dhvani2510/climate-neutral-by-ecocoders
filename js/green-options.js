var vehicles = JSON.parse(localStorage.getItem("fleetData")) || [];

const greenOption = [
    { id: 1, option: "Replace with EV Vehicle" },
    { id: 2, option: "Right-size to smaller vehicle" },
    { id: 3, option: "E85 Ethanol Usage" },
    { id: 4, option: "B20 Biodiesel Usage" },
    { id: 5, option: "Replace with Biofuel car" },
    { id: 6, option: "Replace with Biofuel Truck" },
    { id: 7, option: "Nothing" }
];

window.onload = function() {
    vehicles.forEach(vehicle => {
        vehicle.possibleOptions = getPossibleGreenOption(vehicle);
    });

    populateGreenOptionsTable(vehicles);
}

function getPossibleGreenOption(vehicle) {
    const selectedGreenOptions = [];
    greenOption.forEach(option => {
        const { id } = option;
        const { type, flexFuel, fuelType } = vehicle;
        if (
            (type === "Car" && flexFuel === "Yes" && fuelType === "Gasoline" && (id === 1 || id === 3 || id === 7)) ||
            (type === "Car" && flexFuel === "No" && fuelType === "Gasoline" && (id === 5 || id === 1 || id === 7)) ||
            (type === "Light Duty Truck" && flexFuel === "No" && fuelType === "Gasoline" && (id === 1 || id === 6 || id === 2 || id === 7)) ||
            (type === "Light Duty Truck" && flexFuel === "Yes" && fuelType === "Gasoline" && (id === 3 || id === 1 || id === 2 || id === 7)) ||
            (type === "Light Duty Truck" && flexFuel === "No" && fuelType === "Diesel" && (id === 1 || id === 6 || id === 2 || id === 7)) ||
            (type === "Light Duty Truck" && flexFuel === "Yes" && fuelType === "Diesel" && (id === 4 || id === 1 || id === 6 || id === 2 || id === 7))
        ) {
            var value = greenOption.find(option => option.id === id)
            selectedGreenOptions.push(value);
        }
    });
    if (selectedGreenOptions.length == 0) {
        var value = greenOption.find(option => option.id === 7)
        selectedGreenOptions.push(value);
    }
    return selectedGreenOptions.map(option => option.option);
}

function populateGreenOptionsTable() {
    const container = document.querySelector("#green-options");
    vehicles.forEach(item => {
        // Create divs for each item
        const div = document.createElement("div");
        div.classList.add("row");
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
            if (item['selectedOption'] == "" || item['selectedOption'] == "Select option") {
                optionsDiv.classList.add('hidden');
            } else {
                optionsDiv.classList.remove('hidden');
            }
        });
    });
}

function createDescriptionDiv(vehicle) {
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "col";
    descriptionDiv.innerHTML = `${vehicle.description} (${vehicle.type}) - ${vehicle.year} ${vehicle.make} ${vehicle.model}`;
    descriptionDiv.id = vehicle.id;
    return descriptionDiv;
}

function createOptionsDiv(item) {
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("col");
    optionsDiv.classList.add("green-options");
    optionsDiv.setAttribute("id", "options-" + item.id);
    const button = document.createElement("div");
    button.classList.add("option-dropdown");
    optionsDiv.appendChild(button);

    createOptionsList(button, item);

    if (item['selectedOption'] == "" || item['selectedOption'] == "Select option") {
        optionsDiv.classList.add('hidden');
    }
    return optionsDiv;
}

function createOptionsList(optionDropdown, item) {
    const span = document.createElement("div");
    span.innerHTML = "Select option";
    span.classList.add("selected");
    span.setAttribute("id", "selected-" + item['id']);
    optionDropdown.appendChild(span);
    const selectList = document.createElement("div");
    selectList.classList.add("options");
    selectList.setAttribute("id", "select-list-" + item['id']);
    item.possibleOptions.forEach(type => {
        var option = document.createElement("li");
        option.classList.add("option");
        option.innerHTML = type;
        option.value = greenOption.find((t) => t.option === type).id;
        option.setAttribute("data-value", type);
        option.setAttribute("onclick", `updateGreenOption('${item.id}', '${type}')`); // Passing item here
        selectList.appendChild(option);
    });
    optionDropdown.appendChild(selectList);


    const arrow = document.createElement("div");
    arrow.classList.add("select-arrow");
    arrow.addEventListener("click", () => {
        selectList.style.display = "inline-block";
    });
    optionDropdown.appendChild(arrow);

    // create i 
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-chevron-down");
    arrow.appendChild(icon);


    span.addEventListener("click", () => {
        selectList.style.display = "inline-block";
    });
    optionDropdown.addEventListener("mouseleave", () => {
        document.querySelectorAll(".options").forEach((list) => {
            list.style.display = "none";
        });
    });
    selectList.addEventListener("click", (event) => {
        if (item['selectedOption'] && item['selectedOption'] != "" && item['selectedOption'] != "Select option") {
            span.innerHTML = item['selectedOption'];
            selectList.style.display = "none";
        }
    });
    if (item['selectedOption'] && item['selectedOption'] != "" && item['selectedOption'] != "Select option") {
        span.innerHTML = item['selectedOption'];
    } else {
        item['selectedOption'] = "Select option";
        span.innerHTML = "Select option";
    }
}

function updateGreenOption(id, option) {
    vehicles = vehicles.map((vehicle) => {
        if (vehicle.id == id) {
            vehicle['selectedOption'] = option;
        }
        return vehicle
    });
    localStorage.setItem("fleetData", JSON.stringify(vehicles));
}

// Event listener for previous button if it exists
if (document.getElementById("prevButton")) {
    document.getElementById("prevButton").addEventListener("click", function() {
        window.location.href = "current-emissions.html"
    });
}


// Event listener for next button
if (document.getElementById("nextButton")) {
    document.getElementById("nextButton").addEventListener("click", function() {
        if (vehicles.some(vehicle => vehicle['selectedOption'] == "" || vehicle['selectedOption'] == "Select option")) {
            enteralldata("Please select your preferences", "warning");
            return;
        }
        window.location.href = '/analyser.html';
    });
}