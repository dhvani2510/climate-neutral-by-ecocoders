var vehicles = JSON.parse(localStorage.getItem("fleetData")) || [];

window.onload = function() {
    populateVehiclesTable(vehicles);
}

function populateVehiclesTable(vehicles) {
    const table = document.getElementById("vehicle-list");
    vehicles.forEach(vehicle => {
        const div = createDescriptionDiv(vehicle);
        div.classList.add("vehicle-item");
        div.setAttribute("id", "vehicle-" + vehicle.id);
        if (vehicle === vehicles[0]) {
            div.classList.add("selected");
            showDetails(vehicle);
        }
        div.addEventListener("click", () => showDetails(vehicle));

        table.appendChild(div);
    });
}

function showDetails(item) {
    const detailsDiv = document.querySelector(".savings-info");

    detailsDiv.classList.remove("hidden");
    document.querySelector(".percentage-value").innerHTML =
        item["percent_savings"] ? item["percent_savings"] : 0;
    document.querySelector(".savings-value").innerHTML = item["savings"] ? item["savings"] : 0;
    document.querySelector(".selected-option").innerHTML = item["selectedOption"] ? item["selectedOption"] : "Nothing";
    // add see=lected class for clicked vehicle-itme and remove for all other
    const vehicleItems = document.querySelectorAll(".vehicle-item");
    vehicleItems.forEach((v) => {
        if (v.getAttribute("id") === "vehicle-" + item.id) {
            v.classList.add("selected");
        } else {
            v.classList.remove("selected");
        }
    });
}

function createDescriptionDiv(vehicle) {
    const descriptionDiv = document.createElement("div");
    descriptionDiv.innerHTML = `${vehicle.description} (${vehicle.type}) - ${vehicle.year} ${vehicle.make} ${vehicle.model}`;
    descriptionDiv.id = vehicle.id;
    return descriptionDiv;
}

// Event listener for previous button if it exists
if (document.getElementById("prevButton")) {
    document.getElementById("prevButton").addEventListener("click", function() {
        window.location.href = "/green-options.html"
    });
}


// Event listener for next button
if (document.getElementById("nextButton")) {
    document.getElementById("nextButton").addEventListener("click", function() {
        window.location.href = "/best-ev-options.html"
    });
}