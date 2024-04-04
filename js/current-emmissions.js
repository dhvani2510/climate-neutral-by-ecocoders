const canvas = document.getElementById("myChart");
const ctx = canvas.getContext("2d");

var gradient = ctx ? ctx.createLinearGradient(0, 0, 800, 0) : null;
if (gradient) {
    gradient.addColorStop(0, "#26b170");
    gradient.addColorStop(1, "#a7deec");
}

const canvas2 = document.getElementById("myChart2");
const ctx2 = canvas2.getContext("2d");
var gradient2 = ctx2 ? ctx2.createLinearGradient(0, 0, 2500, 0) : null;
if (gradient2) {
    gradient2.addColorStop(0, "#a7deec");
    gradient2.addColorStop(1, "#26b170");
}


var vehicles = JSON.parse(localStorage.getItem("fleetData")) || "[]";
var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";
var fuel_emissions_factor = {
    'Gasoline': 2299,
    "E10 Gasoline": 2071,
    'Diesel': 2730
}

window.onload = function() {
    console.log(vehicles);
    vehicles.forEach(vehicle => {
        calculateEmissions(vehicle);
    });
    renderCharts(vehicles);
    localStorage.setItem("fleetData", JSON.stringify(vehicles));
}


function calculateEmissions(vehicle) {
    console.log(vehicle);
    vehicle.current_fuel_efficiency = vehicle.annualFuel / vehicle.annualVKT;
    vehicle.current_annual_emission = vehicle.annualFuel * fuel_emissions_factor[vehicle.fuelType]; //gCO2e
    vehicle.current_emission_intensity = vehicle.current_annual_emission / vehicle.annualVKT; //gC02e/km
    vehicle.current_emission_in_tons = vehicle.current_annual_emission / 1000000;
}

function renderCharts(vehicles) {
    const labels = vehicles.map(vehicle => `${vehicle.description} - ${vehicle.type} - ${vehicle.year} - ${vehicle.make} - ${vehicle.model}`);

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Current Annual Emissions',
            data: vehicles.map(vehicle => vehicle.current_emission_in_tons),
            backgroundColor: gradient,
            borderColor: '#000000',
            borderWidth: 1.5,
            borderRadius: 8
                //barPercentage: 0.5,
        }]
    };

    const chartData2 = {
        labels: labels,
        datasets: [{
            label: 'Current Emission Intensity',
            data: vehicles.map(vehicle => vehicle.current_emission_intensity),
            backgroundColor: gradient2,
            borderColor: '#000000',
            borderWidth: 1.5,
            borderRadius: 8,
        }]
    };

    canvas.height = canvas2.height = vehicles.length === 1 ? 100 : vehicles.length * 75;

    createChart(ctx, chartData, "Fleet Data", "Emissions", "Total Emissions");
    createChart(ctx2, chartData2, "Fleet Data", "Emissions Intensity", "Total Emission Intensity");
}

// Event listener for previous button if it exists
if (document.getElementById("prevButton")) {
    document.getElementById("prevButton").addEventListener("click", function() {
        window.location.href = "main.html"
    });
}


// Event listener for next button
if (document.getElementById("nextButton")) {
    document.getElementById("nextButton").addEventListener("click", function() {
        window.location.href = "green-options.html"
    });
}

function createChart(ctx, chartData, yTitle, xTitle, legendTitle) {
    return new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false, // This will take css or js height, canvas element height
            scales: {
                y: {
                    title: {
                        display: true,
                        text: yTitle,
                        font: { size: 16 },
                        color: "#000000",
                    },
                    ticks: {
                        color: "#000000"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: xTitle,
                        font: { size: 16 },
                        color: "#000000",
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: "#000000"
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: legendTitle,
                    font: { size: 20 },
                    color: "#000000",
                }
            }
        }
    });
}