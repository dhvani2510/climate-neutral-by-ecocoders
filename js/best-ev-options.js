var vehicles = JSON.parse(localStorage.getItem("best_ev_vehicles")) || [];
var carTypes = ['T', 'I', 'S', 'C', 'M', 'L', 'WS', 'WM'];
var truckTypes = ['PS', 'PL', 'US', 'UL', 'V', 'VC', 'VP', 'SP']
    // list of NA manufacturer 
var NA_manufactured = ["Tesla", "Lucid", "Ford", "Chevrolet"];
window.onload = function() {
    if (vehicles.length != 0) {
        let tbody = document.getElementById("fleetTable").tBodies[0];
        for (let i = 0; i < vehicles.length; i++) {
            addRowToTable(tbody, vehicles[i]);
        }
    } else {
        addEmptyRow();
    }
    calculateCharts();
}

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
    createTdFor(row, "NA Manufactured", NA_manufactured.includes(fleet.Make) ? "Yes" : "No");

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

var gradient = ctx ? ctx.createLinearGradient(0, 0, 1400, 0) : null;
if (gradient) {
    gradient.addColorStop(0, "#2cadc8");
    gradient.addColorStop(1, "#a0e5f2");
}

var gradient2 = ctx ? ctx.createLinearGradient(0, 0, 1000, 0) : null;
if (gradient2) {
    gradient2.addColorStop(0, "#8fb714");
    gradient2.addColorStop(1, "#c8eb61");
}

var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";

function calculateCharts() {
    if (vehicles) {
        var labels = vehicles.map((v) => v.MakeModel);
        var totalCurrentEmissionsData = vehicles.map((v) => v.ev_emissions_intensity);

        var data = {
            labels,
            datasets: [{
                label: "Vehicles",
                data: totalCurrentEmissionsData,
                fill: true,
                backgroundColor: function(context) {
                    var index = context.dataIndex;
                    return NA_manufactured.includes(vehicles[index].Make) ? gradient2 : gradient;
                },
                borderColor: '#07354d',
                borderWidth: 1.5,
                borderRadius: 8
            }],
        };

        canvas.height = vehicles.length === 1 ? 200 : vehicles.length * 75;
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

// Event listener for previous button if it exists
if (document.getElementById("prevButton")) {
    document.getElementById("prevButton").addEventListener("click", function() {
        window.location.href = "individual-savings.html"
    });
}

const search = document.querySelector('.input-group input');
search.addEventListener('input', searchTable);
const table_headings = document.querySelectorAll('thead th');

function searchTable() {
    const rows = document.querySelectorAll('tbody tr'),
        searchTerm = search.value.toLowerCase();

    rows.forEach((row, index) => {
        const rowText = row.textContent.toLowerCase();
        console.log(rowText);
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