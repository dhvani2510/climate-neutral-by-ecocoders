var best_ev_vehicles = JSON.parse(localStorage.getItem("best_ev_vehicles")) || [];

var carTypes = ['T', 'I', 'S', 'C', 'M', 'L', 'WS', 'WM'];
var truckTypes = ['PS', 'PL', 'US', 'UL', 'V', 'VC', 'VP', 'SP']
    // list of NA manufacturer 
var NA_manufactured = ["Tesla", "Ford", "Chevrolet"];
window.onload = function() {
    if (best_ev_vehicles.length != 0) {
        let tbody = document.getElementById("fleetTable").tBodies[0];
        for (let i = 0; i < best_ev_vehicles.length; i++) {
            addRowToTable(tbody, best_ev_vehicles[i]);
        }
    } else {
        addEmptyRow();
    }
    calculateCharts();
};


function addEmptyRow() {
    const row = document.createElement('tr'),
        cell = document.createElement('td');
    row.classList.add('emptyRow');
    cell.setAttribute('colspan', '11');
    cell.textContent = 'No vehicles data added';
    row.appendChild(cell);
    document.getElementById('fleetTable').tBodies[0].appendChild(row);
}

function addRowToTable(tbody, fleet) {
    let row = document.createElement("tr");
    row.setAttribute("data-id", fleet.id);
    createTdFor(row, "Make", fleet.Make);
    createTdFor(row, "Model", fleet.Model);
    createTdFor(row, "Year", fleet.Year);
    if (carTypes.includes(fleet.ClassId)) {
        createTdFor(row, "Class", "Car");
    } else if (truckTypes.includes(fleet.ClassId)) {
        createTdFor(row, "Class", "Truck");
    } else {
        createTdFor(row, "Class", fleet.Class);
    }
    createTdFor(row, "Consumption", fleet.CombElectricLeConsumption.toFixed(1));
    createTdFor(row, "NewAnnualEmissions", fleet.new_annual_emissions.toFixed(2));
    createTdFor(row, "EmissionsIntensity", fleet.ev_emissions_intensity.toFixed(2));
    tbody.appendChild(row);
}

function createTdFor(row, fieldName, content) {
    let td = document.createElement("td");
    td.textContent = content;
    td.setAttribute("data-field", fieldName);
    row.appendChild(td);
}


const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

var gradient = ctx ? ctx.createLinearGradient(0, 0, 800, 0) : null;
if (gradient) {
    gradient.addColorStop(0, "#26b170");
    gradient.addColorStop(1, "#a7deec");
}

var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";

function calculateCharts() {
    if (best_ev_vehicles) {
        var labels = best_ev_vehicles.map((v) => {
            return (
                v.MakeModel
            );
        });
        var totalCurrentEmissionsData = best_ev_vehicles.map((v) => {
            return v.ev_emissions_intensity;
        }); //Getting data

        // Highlight data points where manufacturer is "NA"
        var backgroundColors = best_ev_vehicles.map((v) =>
            NA_manufactured.includes(v.Make) ? "#FFC107" : gradient
        );
        var data = {
            labels,
            datasets: [{
                label: "Current Emissions",
                data: totalCurrentEmissionsData,
                fill: true,
                backgroundColor: backgroundColors,
                borderColor: '#07354d',
                borderWidth: 1.5,
                borderRadius: 8
            }, ],
        };

        canvas.height = best_ev_vehicles.length === 1 ? 200 : best_ev_vehicles.length * 100;
        var options = {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false, // This will take css or js height, canvas element height
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "Fleet Data",
                        color: "black",
                        font: {
                            size: 16
                        },
                        padding: 10,
                    },
                    ticks: {
                        color: "black"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Emissions",
                        color: "black",
                        font: {
                            size: 16
                        },
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "black"
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: "Total Emissions",
                    color: "black",
                    font: {
                        size: 20
                    },
                    padding: 20
                }
            }
        };

        new Chart(ctx, {
            type: "bar",
            data,
            options
        });
    }
}

function goToIndividualSavingsPage() {
    window.location.href = "individualsavings.html";
}