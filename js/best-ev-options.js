var best_ev_vehicles = JSON.parse(localStorage.getItem("best_ev_vehicles")) || [];

var carTypes = ['T', 'I', 'S', 'C', 'M', 'L', 'WS', 'WM'];
var truckTypes = ['PS', 'PL', 'US', 'UL', 'V', 'VC', 'VP', 'SP']
    // list of NA manufacturer 
var NA_manufactured = ["Tesla", "Lucid", "Ford", "Chevrolet"];
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

var gradient = ctx ? ctx.createLinearGradient(0, 0, 2500, 0) : null;
if (gradient) {
    gradient.addColorStop(0, "#a7deec");
    gradient.addColorStop(1, "#26b170");
}

var gradient2 = ctx ? ctx.createLinearGradient(0, 0, 3500, 0) : null;
if (gradient2) {
    gradient2.addColorStop(0, "#2BD231");
    gradient2.addColorStop(1, "#178A53");
}

var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";

function calculateCharts() {
    if (best_ev_vehicles) {
        var labels = best_ev_vehicles.map((v) => v.MakeModel);
        var totalCurrentEmissionsData = best_ev_vehicles.map((v) => v.ev_emissions_intensity);
 
        var data = {
            labels,
            datasets: [{
                label: "Vehicles",
                data: totalCurrentEmissionsData,
                fill: true,
                backgroundColor: function(context) {
                    var index = context.dataIndex;
                    return NA_manufactured.includes(best_ev_vehicles[index].Make) ? gradient2 : gradient;
                },
                borderColor: '#07354d',
                borderWidth: 1.5,
                borderRadius: 8
            }],
        };
 
        canvas.height = best_ev_vehicles.length === 1 ? 200 : best_ev_vehicles.length * 100;
        var options = {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
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
                    display: true,
                    labels: {
                        generateLabels: function(chart) {
                            var labels = [];
                            labels.push({
                                text: "Other Vehicles",
                                fillStyle: gradient,
                                hidden: false,
                                lineCap: 'butt',
                                strokeStyle: gradient,
                                lineWidth: 1,
                                pointStyle: undefined
                            });
                            labels.push({
                                text: "NA Manufactured Vehicles",
                                fillStyle: gradient2,
                                hidden: false,
                                lineCap: 'butt',
                                strokeStyle: gradient2,
                                lineWidth: 1,
                                pointStyle: undefined
                            });
                            return labels;
                        }
                    }
                },
                title: {
                    display: true,
                    text: "Emission Intensities",
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