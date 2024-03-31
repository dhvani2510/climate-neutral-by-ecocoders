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

var vehicles = [];
var emmisionCoefficient = localStorage.getItem("emissionCoefficient") || "30";

window.onload = () => {
  vehicles = getFleetData();
  vehicles.forEach( (element) => {
     calculateEmissions(element); 
  });
  calculateCharts();
  localStorage.setItem("fleetData", JSON.stringify(vehicles));
};

function calculateCharts() {
  if (vehicles) {
    var labels = vehicles.map((v) => {
      return (
        v.description +
        " - " +
        v.type +
        " - " +
        v.year +
        " - " +
        v.make +
        " - " +
        v.model
      );
    });
    var totalCurrentEmissionsData = vehicles.map((v) => {
      return v.currentAnnualEmissionsInTons;
    }); //Getting data
    var data = {
      labels,
      datasets: [
        {
          label: "Current Emissions",
          data:totalCurrentEmissionsData,
          fill: true,
          backgroundColor:gradient,
          borderColor: '#07354d',
          borderWidth: 1.5,
          borderRadius: 8
        },
      ],
    };

    canvas.height= canvas2.height= vehicles.length===1? 200: canvas2.height =vehicles.length *100;
   var options =  {
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

  var intensityOptions =  {
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
          text: "Emissions Intensity",
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
        },
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Total Emission Intensity",
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


    var currentEmissionIntensityData = vehicles.map((v) => {
      // Check if the value is a number, if not, replace with 0
      return typeof v.currentEmissionIntensity === 'number' && !isNaN(v.currentEmissionIntensity)
          ? v.currentEmissionIntensity
          : 0;
    });
  

    var data = {
      labels,
      datasets: [
        {
          label: "Total Emission Intensity",
          data:currentEmissionIntensityData,
          fill: true,
          backgroundColor: gradient2,
          borderColor: '#07354d',
          borderWidth: 1.5,
          borderRadius: 8
        },
      ],
    };
    new Chart(ctx2, {
      type: "bar",
      data,
      options: intensityOptions
    });
  }
}

var fuel_emissions_factor = {
  'Gasoline':2299,
  "E10 Gasoline": 2071,
  'Diesel': 2730
}

function calculateEmissions(fleet) {
  current_fuel_efficiency = fleet["annualFuel"] / fleet["annualVKT"]; //L/km
  current_annual_emission = fleet["annualFuel"] * fuel_emissions_factor[fleet["fuelType"]]; //gCO2e
  current_emission_intensity = current_annual_emission / fleet["annualVKT"]; //gC02e/km
  // total_current_emissions = current_annual_emission * fleet["quantity"]; // for all vehicles gCO2e/km
  cae_in_tons = current_annual_emission / 1000000;
  
  fleet["currentFuelEfficiency"] = current_fuel_efficiency;
  fleet["currentEmissionIntensity"] = current_emission_intensity;
  // fleet["totalCurrentEmissions"] = total_current_emissions;
  fleet["currentAnnualEmissions"] = current_annual_emission;
  fleet["currentAnnualEmissionsInTons"] = cae_in_tons;
}

function goToGreenOptionsPage() {
  localStorage.setItem("next", "green-options.html");
  window.location.href = "loading.html";
}

function goToUserInputPage() {
  window.location.href = "main.html";
}
